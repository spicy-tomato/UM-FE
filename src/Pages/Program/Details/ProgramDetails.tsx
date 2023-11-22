import {
  Box,
  Button,
  Button as ChakraButton,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Stack,
  Text,
  StackDivider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
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
        <Heading>{program?.name}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Program
            </Heading>
            <Text>{program?.name}</Text>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Program Details</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Program ID:</FormLabel>
              <Input
                type="text"
                id="programId"
                name="programId"
                value={program?.programId ?? undefined}
                onChange={(e) =>
                  setProgram({
                    ...program,
                    programId: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Program Name:</FormLabel>
              <Input
                type="text"
                id="programName"
                name="programName"
                value={program?.name ?? undefined}
                onChange={(e) =>
                  setProgram({
                    ...program,
                    name: e.target.value,
                  })
                }
              />
            </FormControl>
            <ModalFooter>
              <ChakraButton
                colorScheme="blue"
                mr={3}
                onClick={handleOpenDetail}
              >
                Save
              </ChakraButton>
              <ChakraButton onClick={handleOpenDetail}>Cancel</ChakraButton>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
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
