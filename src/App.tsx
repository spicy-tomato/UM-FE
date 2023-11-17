import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import './App.css';
import Layout from './Layout/Layout';
import ClassManage from './Pages/ClassManage/ClassManage';
import Course from './Pages/Course/Course';
import CourseManage from './Pages/CourseManage/CourseManage';
import Education from './Pages/Education/Education';
import Event from './Pages/Event/Event';
import Login from './Pages/Login/Login';
import Professor from './Pages/Professor/Professor';
import ProgramManage from './Pages/ProgramManage/ProgramManage';
import Student from './Pages/Student/Student';
import StudentManage from './Pages/StudentManage/StudentManage';
import Teacher from './Pages/Teacher/Teacher';
import TeacherManage from './Pages/TeacherManage/TeacherManage';
import { updateToken } from './redux/feature/authSlice';
import { LocalStorageConstant } from './shared/constants';
import PersonalInformation from './Pages/PersonalInformation/PersonalInformation';

const router = createBrowserRouter([
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
        path: 'education',
        element: <Education />,
      },
      {
        path: 'event',
        element: <Event />,
      },
      {
        path: 'student',
        element: <Student />,
      },
      {
        path: 'professor',
        element: <Professor />,
      },
      {
        path: 'course',
        element: <Course />,
      },
      {
        path: 'student-manage',
        element: <StudentManage />,
      },
      {
        path: 'teacher-manage',
        element: <TeacherManage />,
      },
      {
        path: 'course-manage',
        element: <CourseManage />,
      },
      {
        path: 'program-manage',
        element: <ProgramManage />,
      },
      {
        path: 'class-manage',
        element: <ClassManage />,
      },
      {
        path: 'teacher',
        element: <Teacher />,
      },
      {
        path: 'me',
        element: <PersonalInformation />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedToken = localStorage.getItem(LocalStorageConstant.token);
    if (savedToken) dispatch(updateToken(savedToken));
  }, []);

  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
