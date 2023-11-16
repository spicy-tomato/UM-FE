import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../Components/Header/Header';
import SideBar from '../Components/SideBar/SideBar';
import { updateToken } from '../redux/feature/tokenSlice';
import { updateUser } from '../redux/feature/userSlice';
import { RootState } from '../redux/store';
import { Auth } from '../shared/api';
import './Layout.css';

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((store: RootState) => store.token);

  const getDataUser = async () => {
    if (!token.token) {
      dispatch(updateToken(''));
      navigate('/login');
      return;
    }

    try {
      const response = await new Auth().getMySummaryInfo();
      dispatch(updateUser(response.data.data));
    } catch (e) {
      dispatch(updateToken(''));
      navigate('/login');
    }
  };

  useEffect(() => {
    getDataUser();
  }, [token]);

  return (
    <div className='portal-homepage'>
      <div className='wrap'>
        <div className='header'>
          <Header />
        </div>
        <div className='main-content'>
          <div className='sidebar'>
            <SideBar />
          </div>
          <div className='content'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
