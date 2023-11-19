import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MainData from '../../../Layout/MainData/MainData';
import {
  CourseClass,
  UMApplicationCourseClassQueriesGetByIdGetByIdDto,
  UMDomainEnumsCourseClassECourseClassStatus,
} from '../../../shared/api';
import { useWaitUserInfo } from '../../../shared/hooks';
import { setStateWithApiFallback } from '../../../shared/functions';
import moment from 'moment';

type ContentProps = {
  courseClass: UMApplicationCourseClassQueriesGetByIdGetByIdDto;
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

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Class {courseClass.name}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Course
            </Heading>
            <Text mt='2' fontSize='sm'>
              {course.name} ({course.courseId})
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Status
            </Heading>
            <Badge colorScheme={statusBadgeMap[status]}>{status}</Badge>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Academic year
            </Heading>
            <Text mt='2' fontSize='sm'>
              {courseClass.academicYear}
            </Text>
          </Box>
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

  useEffect(() => {
    const id = params.courseClassId;

    if (user && id) {
      setStateWithApiFallback(
        new CourseClass().getCourseClassById(id),
        setCourseClass
      );
    }
  }, [user, params]);

  return (
    <MainData data={courseClass}>
      <Content courseClass={courseClass!} />
    </MainData>
  );
};

export default CourseClassDetails;
