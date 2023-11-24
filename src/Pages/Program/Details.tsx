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
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import {
  Program,
  UMApplicationProgramQueriesGetByIdGetByIdDto,
  UMApplicationProgramQueriesGetByIdGetByIdDtoCourse,
} from '../../shared/api';
import { useNavigate, useParams } from 'react-router-dom';
import { setStateWithApiFallback } from '../../shared/functions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BackToPage, MainData } from '@layout';

type ContentProps = {
  program: UMApplicationProgramQueriesGetByIdGetByIdDto;
};

type EditFormData = {
  name: string;
  programId: string;
};

type ButtonProps = {
  reload?: () => void;
  program: UMApplicationProgramQueriesGetByIdGetByIdDto;
};

const editFormDataDefaultValues = (
  program: UMApplicationProgramQueriesGetByIdGetByIdDto
): EditFormData => {
  return { name: program.name!, programId: program.programId! };
};

const EditButton = ({ reload, program }: ButtonProps) => {
  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EditFormData>({
    defaultValues: editFormDataDefaultValues(program),
  });
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    reset(editFormDataDefaultValues(program));
  }, [program]);

  const onSubmit: SubmitHandler<EditFormData> = async (data) => {
    setIsSubmitting(true);

    try {
      await new Program().putProgram(program.id!, data);

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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Program Details</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Program ID:</FormLabel>
              <Input
                type='text'
                name='programId'
                defaultValue={program?.programId ?? undefined}
                onChange={(e) => setValue('programId', e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Program Name:</FormLabel>
              <Input
                type='text'
                name='name'
                defaultValue={program?.name ?? undefined}
                onChange={(e) => setValue('name', e.target.value)}
              />
            </FormControl>
            <ModalFooter>
              <ChakraButton onClick={onClickClose}>Cancel</ChakraButton>
              <ChakraButton
                colorScheme='blue'
                ml={3}
                onClick={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
              >
                Save
              </ChakraButton>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const DeleteButton = ({ program }: ButtonProps) => {
  const toast = useToast();
  const navigate = useNavigate();
  const cancelRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClickDelete = async () => {
    setIsSubmitting(true);

    try {
      await new Program().deleteProgram(program.id!);

      toast({
        title: 'Deleted program successfully!',
        status: 'success',
        isClosable: true,
      });
      onClose();
      navigate('/program');
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
              Delete program
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
  program: UMApplicationProgramQueriesGetByIdGetByIdDto;
};

const Actions = ({ reload, program }: ActionsProps) => {
  return (
    <Flex justify='end' columnGap={2}>
      <EditButton reload={reload} program={program} />
      <DeleteButton reload={reload} program={program} />
    </Flex>
  );
};

const InfoCard = ({ program }: ContentProps) => {
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

const Content = ({ program }: ContentProps) => {
  return (
    <Grid rowGap={3}>
      <GridItem>
        <InfoCard program={program} />
      </GridItem>
    </Grid>
  );
};

const ProgramDetails = () => {
  const params = useParams();
  const [program, setProgram] = useState<
    UMApplicationProgramQueriesGetByIdGetByIdDto | null | undefined
  >();

  const getProgram = () => {
    const id = params.programId;
    if (id) {
      setStateWithApiFallback(new Program().getProgramById(id), setProgram);
    }
  };
  useEffect(() => {
    getProgram();
  }, [params]);

  return (
    <MainData data={program}>
      <BackToPage
        url='/program'
        text='Back to program list'
        rightContent={<Actions reload={getProgram} program={program!} />}
      >
        <Content program={program!} />
      </BackToPage>
    </MainData>
  );
};

export default ProgramDetails;
