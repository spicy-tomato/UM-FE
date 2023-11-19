import {
  Button,
  Button as ChakraButton,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { ManagementClass } from '../../shared/api';
import './ManagementClass.css';

function ManagementClassComponent() {
  const [managementClass, setManagementClass] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);

  const [newMClass, setNewMClass] = useState<any>({
    mclassId: '',
    mclassName: '',
  });

  const getManagementClass = async () => {
    try {
      const response = await new ManagementClass().getManagementClass({});
      if (response.data.data) setManagementClass(response.data.data);
    } catch (e) {
      console.error('Error getting Classes:', e);
    }
  };

  useEffect(() => {
    getManagementClass();
  }, []);

  const handleAddMClass = () => {
    setNewMClass({
      mclassId: '',
      mclassName: '',
    });
    setSelectedMClass(null);
    onOpen();
  };

  const handleSaveMClass = () => {
    if (selectedMClass) {
      handleEdit();
    } else {
      handleAddMClass();
    }
  };

  const handleFormSubmit = async () => {
    try {
      const response = await new ManagementClass().postManagementClass(
        newMClass
      );

      setManagementClass([...managementClass, response.data.data]);
      onClose();
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  const handleDelete = async (mclassId: any) => {
    try {
      await new ManagementClass().deleteManagementClass(mclassId);
      getManagementClass();
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const [selectedMClass, setSelectedMClass] = useState<any>(null);

  const handleOpenDetail = (mclass: any) => {
    setSelectedMClass(mclass);
    onOpen();
  };

  const handleEdit = async () => {
    try {
      await new ManagementClass().putManagementClass(selectedMClass.id, {
        name: selectedMClass.name,
      });

      getManagementClass();
      onClose();
    } catch (error) {
      console.error('Error editing class:', error);
    }
  };

  return (
    <div className='App'>
      <div className='search-bar-1'>
        <div className='search-container'>
          <input type='text' className='search-input' placeholder='Search...' />
          <i>
            <AiOutlineSearch />
          </i>
        </div>
        <div className='add-btn'>
          <ChakraButton onClick={handleAddMClass} colorScheme='blue'>
            Add Class
          </ChakraButton>
        </div>
      </div>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedMClass ? 'Class Details' : 'Create Class'}
          </ModalHeader>
          <ModalCloseButton />
          {selectedMClass ? (
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Class ID:</FormLabel>
                <Input
                  type='text'
                  id='mclassId'
                  name='mclassId'
                  value={selectedMClass.mclassId}
                  onChange={(e) =>
                    setSelectedMClass({
                      ...selectedMClass,
                      mclassId: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Class Name:</FormLabel>
                <Input
                  type='text'
                  id='mclassName'
                  name='mclassName'
                  value={selectedMClass.name}
                  onChange={(e) =>
                    setSelectedMClass({
                      ...selectedMClass,
                      name: e.target.value,
                    })
                  }
                />
              </FormControl>
              <ModalFooter>
                <ChakraButton colorScheme='blue' mr={3} onClick={handleEdit}>
                  Save
                </ChakraButton>
                <ChakraButton onClick={onClose}>Cancel</ChakraButton>
              </ModalFooter>
            </ModalBody>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Class ID:</FormLabel>
                  <Input
                    ref={initialRef}
                    type='text'
                    id='mclassId'
                    name='mclassId'
                    value={newMClass.mclassId}
                    placeholder='IT'
                    onChange={(e) =>
                      setNewMClass({ ...newMClass, mclassId: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Class Name:</FormLabel>
                  <Input
                    type='text'
                    id='mclassName'
                    name='mclassName'
                    value={newMClass.mclassName}
                    placeholder='Information Technology'
                    onChange={(e) =>
                      setNewMClass({
                        ...newMClass,
                        mclassName: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <ChakraButton
                  colorScheme='blue'
                  mr={3}
                  onClick={handleSaveMClass}
                >
                  Save
                </ChakraButton>
                <ChakraButton onClick={onClose}>Cancel</ChakraButton>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
      <table className='teacher-table'>
        <thead>
          <tr>
            <th>STT</th>
            <th>ID</th>
            <th>Class Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {managementClass.map((mclass: any, idx) => (
            <tr key={mclass.mclassId}>
              <td>{idx + 1}</td>
              <td>{mclass.mclassId}</td>
              <td>{mclass.name}</td>
              <td>
                <HStack spacing='15px' justify='center'>
                  <Button
                    onClick={() => handleOpenDetail(mclass)}
                    colorScheme='cyan'
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(mclass.mclassId)}
                    colorScheme='red'
                  >
                    Delete
                  </Button>
                </HStack>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagementClassComponent;
