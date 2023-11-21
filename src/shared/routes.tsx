import { ChakraProvider } from '@chakra-ui/react';
import { RoleConstant, RoleConstantValue, ValidRoutes } from '@constants';
import { Layout, ProtectedRoute } from '@layout';
import { SideBarItem } from '@models';
import { IconType } from 'react-icons';
import {
  AiFillBook,
  AiFillCalendar,
  AiFillGold,
  AiFillHome,
} from 'react-icons/ai';
import { PiExamFill } from 'react-icons/pi';
import { SiGoogleclassroom } from 'react-icons/si';
import { Navigate, RouteObject } from 'react-router-dom';
import { Calendar } from 'src/Pages/Calendar/Calendar';
import { CourseComponent } from 'src/Pages/Course/Course';
import { CourseClassDetails } from 'src/Pages/CourseClass/CourseClassDetails';
import { CourseClassList } from 'src/Pages/CourseClass/CourseClassList';
import { Home } from 'src/Pages/Home/Home';
import { Login } from 'src/Pages/Login/Login';
import { ManagementClassComponent } from 'src/Pages/ManagementClass/ManagementClass';
import { PersonalInformation } from 'src/Pages/PersonalInformation/PersonalInformation';
import { ProgramComponent } from 'src/Pages/Program/Program';
import { Score } from 'src/Pages/Score/Score';

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
        element: <CourseComponent />,
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
        path: 'course-class',
        children: [
          {
            path: '',
            element: <CourseClassList />,
          },
          {
            path: ':courseClassId',
            element: <CourseClassDetails />,
          },
        ],
      },
      {
        path: 'me',
        element: <PersonalInformation />,
      },
      {
        path: 'score',
        element: (
          <ProtectedRoute role='Student'>
            <Score />
          </ProtectedRoute>
        ),
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
    { name: 'Course class', url: '/course-class' },
    { name: 'Management class', url: '/management-class' },
  ],
  [RoleConstant.student]: [
    { name: 'Home', url: '/home' },
    { name: 'Calendar', url: '/calendar' },
    { name: 'Course class', url: '/course-class' },
    { name: 'Management class', url: '/management-class' },
    { name: 'Score', url: '/score' },
  ],
  [RoleConstant.teacher]: [
    { name: 'Home', url: '/home' },
    { name: 'Calendar', url: '/calendar' },
    { name: 'Course class', url: '/course-class' },
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
  '/score': PiExamFill,
};
