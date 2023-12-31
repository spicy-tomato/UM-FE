import {
  Program,
  UMApplicationProgramCommandsCreateCreateCommand,
  UMApplicationProgramQueriesGetAllGetAllDto,
} from '@api';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
import { setStateWithApiFallback } from '@functions';
import { MainData } from '@layout';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link as ReactRouterLink } from 'react-router-dom';

type AddButtonProps = {
  reload: () => void;
};

const AddButton = ({ reload }: AddButtonProps) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UMApplicationProgramCommandsCreateCreateCommand>();
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<
    UMApplicationProgramCommandsCreateCreateCommand
  > = async (data: UMApplicationProgramCommandsCreateCreateCommand) => {
    setIsSubmitting(true);
    try {
      await new Program().postProgram(data);
      toast({
        title: `Created ${data.name} program`,
        status: 'success',
        isClosable: true,
      });
      onCloseModal();
      reload();
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCloseModal = () => {
    reset();
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme='green'>
        Add Program
      </Button>

      <Modal isOpen={isOpen} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Program</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Program ID:</FormLabel>
              <Input
                type='text'
                id='programId'
                name='programId'
                placeholder='IT'
                onChange={(e) => setValue('programId', e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Program Name:</FormLabel>
              <Input
                type='text'
                id='programName'
                name='name'
                placeholder='Information Technology'
                onChange={(e) => setValue('name', e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseModal}>Cancel</Button>
            <Button
              colorScheme='green'
              ml={3}
              onClick={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
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

type ProgramType = {
  id: string;
  programId: string;
  name: string;
};

const ListProgram = ({ programs }: { programs: ProgramType[] }) => {
  return (
    <MainData data={programs}>
      <TableContainer>
        <Table variant={'striped'} size={'sm'} className='teacher-table'>
          <Thead>
            <Tr>
              <Th>STT</Th>
              <Th>ID</Th>
              <Th>Program Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {programs?.map((program, idx) => (
              <Tr key={program.id}>
                <Td>{idx + 1}</Td>
                <Td>
                  <Link as={ReactRouterLink} to={program.id}>
                    {program?.programId}
                  </Link>
                </Td>
                <Td>{program.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </MainData>
  );
};

function ProgramComponent() {
  const [programs, setPrograms] = useState<ProgramType[] | undefined>();

  const getPrograms = async () => {
    setStateWithApiFallback(
      new Program().getProgram({}) as Promise<AxiosResponse<any>>,
      setPrograms,
      []
    );
  };

  useEffect(() => {
    getPrograms();
    console.log(programs);
  }, []);

  return (
    <div className='App'>
      <Grid rowGap={3}>
        <GridItem>
          <Actions reload={getPrograms}></Actions>
        </GridItem>
        <GridItem>
          {programs && <ListProgram programs={programs}></ListProgram>}
        </GridItem>
      </Grid>
    </div>
  );
}

export { ProgramComponent };
