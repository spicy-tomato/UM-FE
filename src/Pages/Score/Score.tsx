import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  Account,
  UMApplicationStudentQueriesGetScoresGetScoresDto,
  UMDomainEnumsCourseClassECourseClassStatus,
} from '../../shared/api';

const Score = () => {
  const user = useSelector((store: RootState) => store.auth.user);
  const [scores, setScores] = useState<
    UMApplicationStudentQueriesGetScoresGetScoresDto[]
  >([]);

  const getSessions = async () => {
    const res = await new Account().getMyScores();
    if (res.data.data) {
      setScores(res.data.data);
    }
  };

  useEffect(() => {
    if (user) getSessions();
  }, [user]);

  return (
    <TableContainer>
      <Table variant='striped' colorScheme='cyan' size='sm'>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Course code</Th>
            <Th>Course name</Th>
            <Th>Class name</Th>
            <Th textAlign='center'>Sessions</Th>
            <Th textAlign='center'>Status</Th>
            <Th textAlign='center'>Number score</Th>
            <Th textAlign='center'>Letter score</Th>
            <Th>Giảng viên</Th>
          </Tr>
        </Thead>

        <Tbody>
          {scores.map((score, idx) => {
            const courseClass = score.courseClass;
            const course = score.courseClass?.course;
            const status = courseClass?.status
              ? UMDomainEnumsCourseClassECourseClassStatus[courseClass.status]
              : null;

            return (
              <Tr key={idx}>
                <Td>{idx + 1}</Td>
                <Td>{course?.courseId}</Td>
                <Td>{course?.name}</Td>
                <Td>{courseClass?.name}</Td>
                <Td textAlign='center'>{courseClass?.sessionsCount}</Td>
                <Td textAlign='center'>{status}</Td>
                <Td textAlign='center'>{score.score}</Td>
                <Td textAlign='center'>{score.letterScore}</Td>
                <Td>
                  {courseClass?.teacher?.firstName}{' '}
                  {courseClass?.teacher?.lastName}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Score;
