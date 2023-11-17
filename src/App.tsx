import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { updateToken } from './redux/feature/authSlice';
import { LocalStorageConstant } from './shared/constants';
import { routes } from './shared/routes';

const router = createBrowserRouter(routes);

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
