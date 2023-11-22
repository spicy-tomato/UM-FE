import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Stack,
  Text,
  StackDivider,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  Program,
  UMApplicationProgramQueriesGetByIdGetByIdDtoCourse,
} from "../../../shared/api";
import { useParams } from "react-router-dom";
import { setStateWithApiFallback } from "../../../shared/functions";

type ContentProps = {
  program: UMApplicationProgramQueriesGetByIdGetByIdDtoCourse;
};

const InfoCard = ({ program }: ContentProps) => {
  return (
    <Card>
      <CardHeader>
        <Heading>Program: {program?.name}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Program
            </Heading>
            <Text>{program?.name}</Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              ID
            </Heading>
            <Text>{program?.programId}</Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

const ProgramDetails = () => {
  const params = useParams();
  const [program, setProgram] = useState<
    UMApplicationProgramQueriesGetByIdGetByIdDtoCourse | null | undefined
  >();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const id = params.programId;
    if (id) {
      setStateWithApiFallback(new Program().getProgramById(id), setProgram);
    }
  }, [params]);

  const handleOpenDetail = (program: any) => {
    return;
  };

  const handleDelete = (id: string | undefined) => {
    return;
  };

  return (
    <div className="App">
      <InfoCard program={program!} />
      <HStack sx={{ mt: 5 }} spacing="15px" justify="center">
        <Button onClick={() => handleOpenDetail(program)} colorScheme="cyan">
          Edit
        </Button>
        <Button
          onClick={() => handleDelete(program?.programId)}
          colorScheme="red"
        >
          Delete
        </Button>
      </HStack>
    </div>
  );
};

export default ProgramDetails;
