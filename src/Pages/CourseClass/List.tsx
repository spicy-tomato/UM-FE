import {
  Course,
  CourseClass,
  UMApplicationCourseClassCommandsBulkCreateBulkCreateCommand,
  UMApplicationCourseQueriesGetAllGetAllDto,
  UMDomainDtosCourseClassICourseClass,
  UMDomainEnumsCourseClassECourseClassStatus,
} from '@api';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Link,
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
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ValidationMessage } from '@constants';
import { setStateWithApiFallback } from '@functions';
import { useWaitUserInfo } from '@hooks';
import { MainData, ProtectedComponent } from '@layout';
import { User } from '@redux';
import { AxiosResponse } from 'axios';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as ReactRouterLink } from 'react-router-dom';

type CourseClassType = UMDomainDtosCourseClassICourseClass & {
  teacher: {
    id: string;
    teacherId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    isMale: boolean;
  };
  course: {
    id: string;
    name: string;
    courseId: string;
  };
};

type CreateFormData = {
  courseId: string;
  numberOfClasses: number;
  startAt: Date;
  sessionsCount: number;
};

type AddButtonProps = {
  reload: () => void;
};

const AddButton = ({ reload }: AddButtonProps) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateFormData>();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const watchStartAt = watch('startAt');
  const user = useWaitUserInfo();
  const [courses, setCourses] = useState<
    UMApplicationCourseQueriesGetAllGetAllDto[] | undefined
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setStateWithApiFallback(new Course().getCourse(), setCourses, []);
    }
  }, [user]);

  const onSubmit: SubmitHandler<CreateFormData> = async (data) => {
    setIsSubmitting(true);

    const body: UMApplicationCourseClassCommandsBulkCreateBulkCreateCommand = {
      ...data,
      startAt: data.startAt.toISOString(),
    };

    try {
      await new CourseClass().postCourseClass(body);

      toast({
        title: `Created ${data.numberOfClasses} classes`,
        status: 'success',
        isClosable: true,
      });
      onClickClose();
      reload();
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
        Add
      </Button>

      <Modal isOpen={isOpen} onClose={onClickClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add multiple course classes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction='column' rowGap='3'>
              <FormControl isInvalid={!!errors.courseId}>
                <FormLabel>Course</FormLabel>
                <Select
                  placeholder='Select course'
                  {...register('courseId', {
                    required: ValidationMessage.required,
                  })}
                >
                  {courses?.map((course) => (
                    <option value={course.id} key={course.id}>
                      {course.name} ({course.courseId})
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.courseId && errors.courseId.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.numberOfClasses}>
                <FormLabel>Number of classes</FormLabel>
                <NumberInput min={1}>
                  <NumberInputField
                    {...register('numberOfClasses', {
                      required: ValidationMessage.required,
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>
                  {errors.numberOfClasses && errors.numberOfClasses.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.startAt}>
                <FormLabel>Start date</FormLabel>
                <SingleDatepicker
                  name='startAt'
                  date={watchStartAt}
                  onDateChange={(date) => setValue('startAt', date)}
                />
              </FormControl>

              <FormControl isInvalid={!!errors.sessionsCount}>
                <FormLabel>Number of sessions</FormLabel>
                <NumberInput min={1}>
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
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClickClose}>Cancel</Button>
            <Button
              colorScheme='green'
              ml={3}
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

type ActionsProps = {
  reload: () => void;
};

const Actions = ({ reload }: ActionsProps) => {
  return (
    <Flex justify='end'>
      <AddButton reload={reload}></AddButton>
    </Flex>
  );
};

type ListProps = {
  courseClasses: CourseClassType[];
  user: User;
};

const List = ({ courseClasses, user }: ListProps) => {
  return (
    <MainData data={courseClasses}>
      <TableContainer>
        <Table variant='striped' size='sm'>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Class name</Th>
              <Th>Course code</Th>
              <Th>Course name</Th>
              <Th textAlign='center'>Sessions</Th>
              <Th textAlign='center'>Status</Th>
              {user?.role !== 'Teacher' && <Th>Teacher</Th>}
            </Tr>
          </Thead>

          <Tbody>
            {courseClasses?.map((courseClass, idx) => {
              const status = courseClass.status
                ? UMDomainEnumsCourseClassECourseClassStatus[courseClass.status]
                : null;

              return (
                <Tr key={idx}>
                  <Td>{idx + 1}</Td>
                  <Td>
                    <Link as={ReactRouterLink} to={courseClass.id}>
                      {courseClass?.name}
                    </Link>
                  </Td>
                  <Td>{courseClass.course?.courseId}</Td>
                  <Td>{courseClass.course?.name}</Td>
                  <Td textAlign='center'>{courseClass?.sessionsCount}</Td>
                  <Td textAlign='center'>{status}</Td>
                  {user?.role !== 'Teacher' && (
                    <Td>
                      {courseClass?.teacher?.firstName}{' '}
                      {courseClass?.teacher?.lastName}
                    </Td>
                  )}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </MainData>
  );
};

const CourseClassList = () => {
  const user = useWaitUserInfo();
  const [courseClasses, setCourseClasses] = useState<
    CourseClassType[] | undefined
  >();

  const getCourseClasses = () => {
    setStateWithApiFallback(
      new CourseClass().getCourseClass({}) as Promise<AxiosResponse<any>>,
      setCourseClasses,
      []
    );
  };

  useEffect(() => {
    if (user) {
      getCourseClasses();
    }
  }, [user]);

  return (
    <Grid rowGap='3'>
      <GridItem>
        <ProtectedComponent role='Admin' hideFallback>
          <Actions reload={getCourseClasses}></Actions>
        </ProtectedComponent>
      </GridItem>
      <GridItem>
        {user && courseClasses && (
          <List user={user} courseClasses={courseClasses}></List>
        )}
      </GridItem>
    </Grid>
  );
};

export { CourseClassList };
