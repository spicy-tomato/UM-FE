import { UMApplicationProgramQueriesGetByIdGetByIdDto } from '@api';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';

const InfoCard = ({
  program,
}: {
  program: UMApplicationProgramQueriesGetByIdGetByIdDto;
}) => {
  return (
    <Card>
      <CardHeader>
        <Heading>{program?.name}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Program
            </Heading>
            <Text>
              {program?.name} ({program.programId})
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export { InfoCard };
