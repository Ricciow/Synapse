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
import ChatPage, { chatPageLoader } from './pages/ChatPage';
import ChatLayout, { chatLayoutLoader } from './pages/ChatLayout';

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => {
      return redirect('/synapse');
    },
  },
  {
    path: '/chat',
    element: <ChatLayout />,
    loader: chatLayoutLoader,
    children: [
      {
        path: ':id',
        element: <ChatPage />,
        loader: chatPageLoader
      }
    ]
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
    <RouterProvider router={router} />
  </StrictMode>
);
