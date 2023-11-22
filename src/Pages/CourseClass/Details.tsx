import {
  CourseClass,
  Teacher,
  UMApplicationCourseClassCommandsUpdateUpdateCommandData,
  UMApplicationCourseClassQueriesGetByIdGetByIdDto,
  UMDomainEnumsCourseClassECourseClassStatus,
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
  courseClass: UMApplicationCourseClassQueriesGetByIdGetByIdDto;
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
  courseClass: UMApplicationCourseClassQueriesGetByIdGetByIdDto;
};

const slotOptions: SelectItemType[] = Object.entries(SlotsName).map(
  ([key, value]) => ({ value: key, label: value })
);

const assignFormDataDefaultValues = (
  courseClass: UMApplicationCourseClassQueriesGetByIdGetByIdDto
): AssignFormData => {
  return {
    teacher: courseClass.teacher
      ? {
          value: courseClass.teacher.id!,
          label: StringHelper.shortName(courseClass.teacher),
        }
      : null,
  };
};

const editFormDataDefaultValues = (
  courseClass: UMApplicationCourseClassQueriesGetByIdGetByIdDto
): EditFormData => {
  return {
    slots:
      courseClass.slots?.map((s) => ({
        value: `${s.weekDay}${s.daySlot}`,
        label: SlotsName[`${s.weekDay}${s.daySlot}`],
      })) ?? [],
    name: courseClass.name!,
    sessionsCount: courseClass.sessionsCount!,
    startAt: new Date(courseClass.startAt!),
  };
};

const AssignButton = ({ reload, courseClass }: ButtonProps) => {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<AssignFormData>({
    defaultValues: assignFormDataDefaultValues(courseClass),
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
    reset(assignFormDataDefaultValues(courseClass));
  }, [courseClass]);

  const onSubmit: SubmitHandler<AssignFormData> = async (data) => {
    setIsSubmitting(true);

    try {
      await new CourseClass().assignToTeacher(
        courseClass.id!,
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

const EditButton = ({ reload, courseClass }: ButtonProps) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditFormData>({
    defaultValues: editFormDataDefaultValues(courseClass),
  });
  const toast = useToast();
  const watchSlots = watch('slots');
  const watchStartAt = watch('startAt');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasSessions, setHasSessions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    reset(editFormDataDefaultValues(courseClass));
    setHasSessions(!!courseClass.sessions?.length);
  }, [courseClass]);

  const onSubmit: SubmitHandler<EditFormData> = async (data) => {
    setIsSubmitting(true);

    const body: UMApplicationCourseClassCommandsUpdateUpdateCommandData = {
      ...data,
      startAt: moment(data.startAt).format('YYYY-MM-DDTHH:mm:ss.SSS'),
      slots: data.slots.map((s) => s.value).join(','),
    };

    try {
      await new CourseClass().putCourseClass(courseClass.id!, body);

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
                <FormLabel>Name</FormLabel>
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

const DeleteButton = ({ courseClass }: ButtonProps) => {
  const toast = useToast();
  const navigate = useNavigate();
  const cancelRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClickDelete = async () => {
    setIsSubmitting(true);

    try {
      await new CourseClass().deleteCourseClass(courseClass.id!);

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
  courseClass: UMApplicationCourseClassQueriesGetByIdGetByIdDto;
};

const Actions = ({ reload, courseClass }: ActionsProps) => {
  return (
    <Flex justify='end' columnGap='2'>
      <AssignButton reload={reload} courseClass={courseClass} />
      <EditButton reload={reload} courseClass={courseClass} />
      <DeleteButton courseClass={courseClass} />
    </Flex>
  );
};

const InfoCard = ({ courseClass }: ContentProps) => {
  const course = courseClass.course!;
  const status = UMDomainEnumsCourseClassECourseClassStatus[
    courseClass.status!
  ] as keyof typeof UMDomainEnumsCourseClassECourseClassStatus;
  const statusBadgeMap: Record<typeof status, ThemeTypings['colorSchemes']> = {
    Active: 'green',
    Draft: 'gray',
    Finished: 'blackAlpha',
  };

  const info: { header: string; label: string | JSX.Element }[] = [
    {
      header: 'Course',
      label: `${course.name} (${course.courseId})`,
    },
    {
      header: 'Status',
      label: <Badge colorScheme={statusBadgeMap[status]}>{status}</Badge>,
    },
    {
      header: 'Academic year',
      label: courseClass.academicYear ?? '',
    },
    {
      header: 'Teacher',
      label: courseClass.teacher
        ? StringHelper.shortNameWithMiddle(courseClass.teacher)
        : 'Not assigned',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Class {courseClass.name}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          {info.map((row, idx) => (
            <Box key={idx}>
              <Heading size='xs' textTransform='uppercase'>
                {row.header}
              </Heading>
              {typeof row.label === 'string' ? (
                <Text mt='2' fontSize='sm'>
                  {row.label}
                </Text>
              ) : (
                row.label
              )}
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};

const Sessions = ({ courseClass }: ContentProps) => {
  if (!courseClass.sessions || courseClass.sessions.length === 0) {
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
          {courseClass.sessions.map((session, idx) => {
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

const Content = ({ courseClass }: ContentProps) => {
  return (
    <Grid rowGap='3'>
      <GridItem>
        <InfoCard courseClass={courseClass} />
      </GridItem>
      <GridItem>
        <Sessions courseClass={courseClass} />
      </GridItem>
    </Grid>
  );
};

const CourseClassDetails = () => {
  const params = useParams();
  const user = useWaitUserInfo();
  const [courseClass, setCourseClass] = useState<
    UMApplicationCourseClassQueriesGetByIdGetByIdDto | null | undefined
  >();

  const getCourseClass = () => {
    const id = params.courseClassId;

    if (user && id) {
      setStateWithApiFallback(
        new CourseClass().getCourseClassById(id),
        setCourseClass
      );
    }
  };

  useEffect(() => {
    getCourseClass();
  }, [user, params]);

  return (
    <MainData data={courseClass}>
      <BackToPage
        url='/course-class'
        text='Back to course classes list'
        rightContent={
          <Actions courseClass={courseClass!} reload={getCourseClass} />
        }
      >
        <Content courseClass={courseClass!} />
      </BackToPage>
    </MainData>
  );
};

export { CourseClassDetails };
