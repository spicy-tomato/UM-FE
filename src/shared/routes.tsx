import { ChakraProvider } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import {
  AiFillBook,
  AiFillCalendar,
  AiFillGold,
  AiFillHome,
} from 'react-icons/ai';
import { SiGoogleclassroom } from 'react-icons/si';
import { Navigate, RouteObject } from 'react-router-dom';
import Layout from '../Layout/Layout';
import ProtectedRoute from '../Layout/ProtectedRoute/ProtectedRoute';
import Calendar from '../Pages/Calendar/Calendar';
import Course from '../Pages/Course/Course';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import ManagementClassComponent from '../Pages/ManagementClass/ManagementClass';
import PersonalInformation from '../Pages/PersonalInformation/PersonalInformation';
import ProgramComponent from '../Pages/Program/Program';
import { RoleConstant, RoleConstantValue, ValidRoutes } from './constants';
import { SideBarItem } from './models';

export const routes: RouteObject[] = [
  {
    path: '',
    element: <Navigate to='login' />,
  },
  {
    path: 'login',
    element: (
      <ChakraProvider>
        <Login />
      </ChakraProvider>
    ),
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'calendar',
        element: <Calendar />,
      },
      {
        path: 'course',
        element: <Course />,
      },
      {
        path: 'program',
        element: (
          <ProtectedRoute role='Admin'>
            <ProgramComponent />
          </ProtectedRoute>
        ),
      },
      {
        path: 'management-class',
        element: <ManagementClassComponent />,
      },
      {
        path: 'me',
        element: <PersonalInformation />,
      },
    ],
  },
];

export const routesByRole: Record<RoleConstantValue, SideBarItem[]> = {
  [RoleConstant.admin]: [
    { name: 'Home', url: '/home' },
    { name: 'Calendar', url: '/calendar' },
    { name: 'Program', url: '/program' },
    { name: 'Course', url: '/course' },
    // { name: 'Course class', url: '/course-class' },
    { name: 'Management class', url: '/management-class' },
  ],
  [RoleConstant.student]: [
    { name: 'Home', url: '/home' },
    { name: 'Calendar', url: '/calendar' },
    // { name: 'Course class', url: '/course-class' },
    { name: 'Management class', url: '/management-class' },
  ],
  [RoleConstant.teacher]: [
    { name: 'Home', url: '/home' },
    { name: 'Calendar', url: '/calendar' },
    // { name: 'Course class', url: '/course-class' },
    { name: 'Management class', url: '/management-class' },
  ],
};

export const routeIcon: Record<ValidRoutes, IconType> = {
  '/home': AiFillHome,
  '/calendar': AiFillCalendar,
  '/course': AiFillGold,
  '/program': AiFillBook,
  '/management-class': SiGoogleclassroom,
  '/course-class': SiGoogleclassroom,
};
