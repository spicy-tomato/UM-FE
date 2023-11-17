import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../Components/Header/Header';
import SideBar from '../Components/SideBar/SideBar';
import { updateToken, updateUser } from '../redux/feature/authSlice';
import { RootState } from '../redux/store';
import { Auth } from '../shared/api';
import './Layout.css';
import { Divider, Flex, Grid, GridItem } from '@chakra-ui/react';

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((store: RootState) => store.auth.token);
  const first = useRef(true);

  const getDataUser = async () => {
    if (first.current && !token) {
      first.current = false;
      return;
    }

    if (!token) {
      dispatch(updateToken(null));
      navigate('/login');
      return;
    }

    try {
      const response = await new Auth().getMySummaryInfo();
      dispatch(updateUser(response.data.data));
    } catch (e) {
      dispatch(updateToken(null));
      navigate('/login');
    }
  };

  useEffect(() => {
    getDataUser();
  }, [token]);

  return (
    <Grid gridTemplateRows='60px 1fr' gridTemplateColumns='250px 1fr' h='100vh'>
      <GridItem colSpan={2}>
        <Header />
      </GridItem>
      <GridItem>
        <SideBar />
      </GridItem>
      <GridItem overflow='auto'>
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default Layout;
