import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Synapse from './pages/Synapse';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Authprovider from './components/Auth/authProvider';

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => {
      return redirect('/synapse');
    },
  },
  {
      path: "/login",
      element: <LoginPage />,
  },
  {
      path: "/register",
      element: <RegisterPage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
  {
    path: '/synapse',
    element: <Synapse />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Authprovider>
      <RouterProvider router={router} />
    </Authprovider>
  </StrictMode>
);
