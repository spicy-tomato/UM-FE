import {
  Box,
  Drawer,
  DrawerContent,
  Flex,
  Icon,
  IconButton,
  Spinner,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link as ReactRouterLink } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { SideBarItem } from '../../shared/models';
import { routeIcon, routesByRole } from '../../shared/routes';
import './SideBar.css';

function SideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
    </>
  );
}
const SidebarContent = ({ onClose, ...rest }: any) => {
  const role = useSelector((store: RootState) => store.auth.user?.role);
  const [items, setItems] = useState<SideBarItem[]>([]);

  useEffect(() => {
    if (role) {
      setItems(routesByRole[role] ?? []);
    }
  }, [role]);

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full' }}
      h='full'
      {...rest}
    >
      {items.length ? (
        items.map((item) => (
          <NavItem
            key={item.name}
            icon={routeIcon[item.url]}
            as={ReactRouterLink}
            to={item.url}
          >
            {item.name}
          </NavItem>
        ))
      ) : (
        <Flex justify='center' py='2'>
          <Spinner></Spinner>
        </Flex>
      )}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }: any) => {
  return (
    <Box style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: any) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent='flex-start'
      {...rest}
    >
      <IconButton
        variant='outline'
        onClick={onOpen}
        aria-label='open menu'
        icon={<AiFillHome />}
      />

      <Text fontSize='2xl' ml='8' fontFamily='monospace' fontWeight='bold'>
        Logo
      </Text>
    </Flex>
  );
};

export default SideBar;
