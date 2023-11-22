import {
  ManagementClass,
  Teacher,
  UMApplicationManagementClassCommandsUpdateUpdateCommandData,
  UMApplicationManagementClassQueriesGetByIdGetByIdDto,
} from '@api';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  StackDivider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  ThemeTypings,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { SlotsName, ValidationMessage } from '@constants';
import { setStateWithApiFallback } from '@functions';
import { StringHelper } from '@helpers';
import { useWaitUserInfo } from '@hooks';
import { BackToPage, MainData } from '@layout';
import { SelectItemType } from '@models';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { Select } from 'chakra-react-select';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

type ContentProps = {
  managementClass: UMApplicationManagementClassQueriesGetByIdGetByIdDto;
};

type AssignFormData = {
  teacher: SelectItemType | null;
};

type EditFormData = {
  name: string;
  startAt: Date;
  sessionsCount: number;
  slots: readonly SelectItemType[];
};

type ButtonProps = {
  reload?: () => void;
  managementClass: UMApplicationManagementClassQueriesGetByIdGetByIdDto;
};

const slotOptions: SelectItemType[] = Object.entries(SlotsName).map(
  ([key, value]) => ({ value: key, label: value })
);

const assignFormDataDefaultValues = (
  managementClass: UMApplicationManagementClassQueriesGetByIdGetByIdDto
): AssignFormData => {
  return {
    teacher: managementClass.teacher
      ? {
          value: managementClass.teacher.id!,
          label: StringHelper.shortName(managementClass.teacher),
        }
      : null,
  };
};

const editFormDataDefaultValues = (
  managementClass: UMApplicationManagementClassQueriesGetByIdGetByIdDto
): EditFormData => {
  return {
    slots:
      managementClass.slots?.map((s) => ({
        value: `${s.weekDay}${s.daySlot}`,
        label: SlotsName[`${s.weekDay}${s.daySlot}`],
      })) ?? [],
    name: managementClass.name!,
    sessionsCount: managementClass.sessionsCount!,
    startAt: new Date(managementClass.startAt!),
  };
};

const AssignButton = ({ reload, managementClass }: ButtonProps) => {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<AssignFormData>({
    defaultValues: assignFormDataDefaultValues(managementClass),
  });
  const toast = useToast();
  const user = useWaitUserInfo();
  const watchTeacher = watch('teacher');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teacherOptions, setTeacherOptions] = useState<
    SelectItemType[] | undefined
  >([]);

  const getTeacherOptions = async () => {
    if (!user) return;
    try {
      const res = await new Teacher().getTeacher({});
      setTeacherOptions(
        (res.data.data ?? []).map((t) => ({
          value: t.id!,
          label: StringHelper.shortName(t),
        }))
      );
    } catch {
      if (true) {
        setTeacherOptions([]);
      }
    }
  };

  useEffect(() => {
    getTeacherOptions();
  }, [user]);

  useEffect(() => {
    reset(assignFormDataDefaultValues(managementClass));
  }, [managementClass]);

  const onSubmit: SubmitHandler<AssignFormData> = async (data) => {
    setIsSubmitting(true);

    try {
      await new ManagementClass().assignToTeacher(
        managementClass.id!,
        data.teacher!.value
      );

      toast({
        title: 'Modified successfully',
        status: 'success',
        isClosable: true,
      });

      onClose();
      reload?.();
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button colorScheme='blue' onClick={onOpen}>
        Assign
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Assign course class to teacher</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction='column' rowGap='3'>
              <FormControl isInvalid={!!errors.teacher}>
                <FormLabel>Teacher</FormLabel>
                <Select
                  {...register('teacher', {
                    required: ValidationMessage.required,
                  })}
                  options={teacherOptions}
                  value={watchTeacher}
                  onChange={(option) => setValue('teacher', option)}
                />
                <FormErrorMessage>
                  {errors.teacher && errors.teacher.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              colorScheme='green'
              ml='3'
              isLoading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const EditButton = ({ reload, managementClass }: ButtonProps) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditFormData>({
    defaultValues: editFormDataDefaultValues(managementClass),
  });
  const toast = useToast();
  const watchSlots = watch('slots');
  const watchStartAt = watch('startAt');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasSessions, setHasSessions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    reset(editFormDataDefaultValues(managementClass));
    setHasSessions(!!managementClass.sessions?.length);
  }, [managementClass]);

  const onSubmit: SubmitHandler<EditFormData> = async (data) => {
    setIsSubmitting(true);

    const body: UMApplicationManagementClassCommandsUpdateUpdateCommandData = {
      ...data,
      startAt: moment(data.startAt).format('YYYY-MM-DDTHH:mm:ss.SSS'),
      slots: data.slots.map((s) => s.value).join(','),
    };

    try {
      await new ManagementClass().putManagementClass(managementClass.id!, body);

      toast({
        title: 'Modified successfully',
        status: 'success',
        isClosable: true,
      });
      onClickClose();
      reload?.();
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  const onClickClose = () => {
    reset();
    onClose();
  };

  return (
    <>
      <Button colorScheme='green' onClick={onOpen}>
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClickClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit course class</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction='column' rowGap='3'>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>Course</FormLabel>
                <Input
                  {...register('name', {
                    required: ValidationMessage.required,
                  })}
                ></Input>
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.startAt}>
                <FormLabel>Start date</FormLabel>
                <SingleDatepicker
                  name='startAt'
                  date={watchStartAt}
                  onDateChange={(date) => setValue('startAt', date)}
                  propsConfigs={{ inputProps: { isReadOnly: hasSessions } }}
                />
              </FormControl>

              <FormControl isInvalid={!!errors.sessionsCount}>
                <FormLabel>Number of sessions</FormLabel>
                <NumberInput min={1} isReadOnly={hasSessions}>
                  <NumberInputField
                    {...register('sessionsCount', {
                      required: ValidationMessage.required,
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>
                  {errors.sessionsCount && errors.sessionsCount.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.slots}>
                <FormLabel>Slots</FormLabel>
                <Select
                  {...register('slots', {
                    required: ValidationMessage.required,
                  })}
                  isMulti
                  options={slotOptions}
                  closeMenuOnSelect={false}
                  value={watchSlots}
                  onChange={(options) => setValue('slots', options)}
                  isDisabled={hasSessions}
                />
                <FormErrorMessage>
                  {errors.slots && errors.slots.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClickClose}>Cancel</Button>
            <Button
              colorScheme='green'
              ml='3'
              isLoading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const DeleteButton = ({ managementClass }: ButtonProps) => {
  const toast = useToast();
  const navigate = useNavigate();
  const cancelRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClickDelete = async () => {
    setIsSubmitting(true);

    try {
      await new ManagementClass().deleteManagementClass(managementClass.id!);

      toast({
        title: 'Deleted class successfully',
        status: 'success',
        isClosable: true,
      });

      onClose();
      navigate('/course-class');
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>
        Delete
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete course class
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={onClickDelete}
                isLoading={isSubmitting}
                colorScheme='red'
                ml='3'
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

type ActionsProps = {
  reload: () => void;
  managementClass: UMApplicationManagementClassQueriesGetByIdGetByIdDto;
};

const Actions = ({ reload, managementClass }: ActionsProps) => {
  return (
    <Flex justify='end' columnGap='2'>
      <AssignButton reload={reload} managementClass={managementClass} />
      <EditButton reload={reload} managementClass={managementClass} />
      <DeleteButton managementClass={managementClass} />
    </Flex>
  );
};

const InfoCard = ({ managementClass }: ContentProps) => {
  const info: { header: string; label?: string }[] = [
    // {
    //   header: 'Program',
    //   label: `${course.name} (${course.courseId})`,
    // },
    {
      header: 'Academic year',
      label: managementClass.academicYear,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Class {managementClass.name}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          {info.map((row, idx) => (
            <Box key={idx}>
              <Heading size='xs' textTransform='uppercase'>
                {row.header}
              </Heading>
              <Text mt='2' fontSize='sm'>
                {row.label}
              </Text>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};

const Students = ({ managementClass }: ContentProps) => {
  if (!managementClass.sessions || managementClass.sessions.length === 0) {
    return <></>;
  }

  return (
    <TableContainer>
      <Table variant='striped' size='sm'>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Date</Th>
            <Th textAlign='center'>Slot</Th>
            <Th textAlign='center'>Start</Th>
            <Th textAlign='center'>End</Th>
          </Tr>
        </Thead>

        <Tbody>
          {managementClass.sessions.map((session, idx) => {
            return (
              <Tr key={idx}>
                <Td>{idx + 1}</Td>
                <Td>{moment(session.startAt).format('DD-MM-YYYY')}</Td>
                <Td textAlign='center'>{session?.slot}</Td>
                <Td textAlign='center'>
                  {moment(session.startAt).format('HH:mm')}
                </Td>
                <Td textAlign='center'>
                  {moment(session.endAt).format('HH:mm')}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const Content = ({ managementClass }: ContentProps) => {
  return (
    <Grid rowGap='3'>
      <GridItem>
        <InfoCard managementClass={managementClass} />
      </GridItem>
      <GridItem>
        {/* <Students managementClass={managementClass} /> */}
      </GridItem>
    </Grid>
  );
};

const ManagementClassDetails = () => {
  const params = useParams();
  const user = useWaitUserInfo();
  const [managementClass, setManagementClass] = useState<
    UMApplicationManagementClassQueriesGetByIdGetByIdDto | null | undefined
  >();

  const getManagementClass = () => {
    const id = params.courseClassId;

    if (user && id) {
      setStateWithApiFallback(
        new ManagementClass().getManagementClassById(id),
        setManagementClass
      );
    }
  };

  useEffect(() => {
    getManagementClass();
  }, [user, params]);

  return (
    <MainData data={managementClass}>
      <BackToPage
        url='/course-class'
        text='Back to course classes list'
        // rightContent={
        //   <Actions managementClass={managementClass!} reload={getManagementClass} />
        // }
      >
        <Content managementClass={managementClass!} />
      </BackToPage>
    </MainData>
  );
};

export { ManagementClassDetails };
