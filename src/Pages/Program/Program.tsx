import {
  Button,
  Button as ChakraButton,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  Program,
  UMApplicationProgramQueriesGetAllGetAllDto,
} from "../../shared/api";
import { Link as ReactRouterLink } from "react-router-dom";

function ProgramComponent() {
  const initialRef = React.useRef(null);
  const [programs, setPrograms] = useState<
    UMApplicationProgramQueriesGetAllGetAllDto[]
  >([]);
  const [programId, setProgramId] = useState("");
  const [programName, setProgramName] = useState("");
  const [selectedProgram, setSelectedProgram] =
    useState<UMApplicationProgramQueriesGetAllGetAllDto | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getPrograms = async () => {
    try {
      const response = await new Program().getProgram();
      if (response.data.data) {
        setPrograms(response.data.data);
      }
    } catch (e) {
      console.error("Error getting programs:", e);
    }
  };

  useEffect(() => {
    getPrograms();
  }, []);

  useEffect(() => {
    console.log(selectedProgram);
    // console.log();
  }, [isOpen]);

  const handleAddProgram = async () => {
    try {
      const response = await new Program().postProgram({
        programId,
        name: programName,
      });

      if (response.status === 200) {
        getPrograms();
        setProgramId("");
        setProgramName("");
        handleCloseModal();
        //TODO: toast successed
      }
    } catch (error) {
      console.error("Error adding program:", error);
    }
  };

  const handleSaveProgram = () => {
    if (selectedProgram) {
      handleEdit();
    } else {
      handleAddProgram();
    }
  };

  const handleEdit = async () => {
    if (!selectedProgram || !selectedProgram.id) return;

    try {
      const response = await new Program().putProgram(selectedProgram.id, {
        programId: selectedProgram.programId,
        name: selectedProgram.name,
      });

      if (response.status === 200) {
        getPrograms();
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error editing program:", error);
    }
  };

  const handleDelete = async (id: any) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      try {
        const response = await new Program().deleteProgram(id);

        if (response.status === 200) {
          getPrograms();
          handleCloseModal();
          //TODO: add toast
        }
      } catch (error) {
        console.error("Error deleting program:", error);
      }
    }
  };

  const handleOpenDetail = (program: any) => {
    setSelectedProgram(program);
    onOpen();
  };

  const handleCloseModal = () => {
    onClose();
    setSelectedProgram(null);
  };

  return (
    <div className="App">
      <Grid>
        <GridItem>
          <div className="search-bar-1">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
              />
              <i>
                <AiOutlineSearch />
              </i>
            </div>
            <div className="add-btn">
              <ChakraButton onClick={onOpen} colorScheme="blue">
                Add Program
              </ChakraButton>
            </div>
          </div>
          <Modal
            initialFocusRef={initialRef}
            isOpen={isOpen}
            onClose={handleCloseModal}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {selectedProgram ? "Program Details" : "Create Program"}
              </ModalHeader>
              <ModalCloseButton />
              {selectedProgram ? (
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Program ID:</FormLabel>
                    <Input
                      type="text"
                      id="programId"
                      name="programId"
                      value={selectedProgram.programId ?? undefined}
                      onChange={(e) =>
                        setSelectedProgram({
                          ...selectedProgram,
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
                      value={selectedProgram.name ?? undefined}
                      onChange={(e) =>
                        setSelectedProgram({
                          ...selectedProgram,
                          name: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <ModalFooter>
                    <ChakraButton
                      colorScheme="blue"
                      mr={3}
                      onClick={handleEdit}
                    >
                      Save
                    </ChakraButton>
                    <ChakraButton onClick={handleCloseModal}>
                      Cancel
                    </ChakraButton>
                  </ModalFooter>
                </ModalBody>
              ) : (
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Program ID:</FormLabel>
                    <Input
                      ref={initialRef}
                      type="text"
                      id="programId"
                      name="programId"
                      value={programId}
                      placeholder="IT"
                      onChange={(e) => setProgramId(e.target.value)}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Program Name:</FormLabel>
                    <Input
                      type="text"
                      id="programName"
                      name="programName"
                      value={programName}
                      placeholder="Information Technology"
                      onChange={(e) => setProgramName(e.target.value)}
                    />
                  </FormControl>
                  <ModalFooter>
                    <ChakraButton
                      colorScheme="blue"
                      mr={3}
                      onClick={handleSaveProgram}
                    >
                      Save
                    </ChakraButton>
                    <ChakraButton onClick={handleCloseModal}>
                      Cancel
                    </ChakraButton>
                  </ModalFooter>
                </ModalBody>
              )}
            </ModalContent>
          </Modal>
        </GridItem>
        <GridItem>
          <TableContainer>
            <Table variant={"striped"} size={"sm"} className="teacher-table">
              <Thead>
                <Tr>
                  <Th>STT</Th>
                  <Th>ID</Th>
                  <Th>Program Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {programs.map((program, idx) => (
                  <Tr key={program.id}>
                    {/* Thay đổi key thành program.id */}
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
        </GridItem>
      </Grid>
    </div>
  );
}

export default ProgramComponent;
