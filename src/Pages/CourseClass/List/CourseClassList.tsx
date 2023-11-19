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
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as ReactRouterLink } from 'react-router-dom';
import MainData from '../../../Layout/MainData/MainData';
import {
  Course,
  CourseClass,
  UMApplicationCourseQueriesGetAllGetAllDto,
  UMDomainDtosCourseClassICourseClass,
  UMDomainEnumsCourseClassECourseClassStatus,
} from '../../../shared/api';
import { ValidationMessage } from '../../../shared/constants';
import { setStateWithApiFallback } from '../../../shared/functions';
import { useWaitUserInfo } from '../../../shared/hooks';

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

const AddButton = () => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateFormData>({
    defaultValues: {
      startAt: new Date(),
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const watchStartAt = watch('startAt');
  const user = useWaitUserInfo();
  const [course, setCourses] =
    useState<UMApplicationCourseQueriesGetAllGetAllDto[]>();

    // (await new Course().getCourse()).data.data

  useEffect(() => {
    if (user) {
      setStateWithApiFallback(new Course().getCourse(), setCourses, []);
    }
  }, [user]);

  const onSubmit = () => {};

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

const Actions = () => {
  return (
    <Flex justify='end'>
      <AddButton></AddButton>
    </Flex>
  );
};

const List = () => {
  const user = useWaitUserInfo();
  const [courseClasses, setCourseClasses] = useState<CourseClassType[]>();

  useEffect(() => {
    if (user) {
      setStateWithApiFallback(
        new CourseClass().getCourseClass({}) as Promise<AxiosResponse<any>>,
        setCourseClasses,
        []
      );
    }
  }, [user]);

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
  return (
    <Grid rowGap='3'>
      <GridItem>
        <Actions></Actions>
      </GridItem>
      <GridItem>
        <List></List>
      </GridItem>
    </Grid>
  );
};

export default CourseClassList;
