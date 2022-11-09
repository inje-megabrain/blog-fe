import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import ErrorPage from './pages/Error/Error';
import Root from './pages/Main/Main';
import TestChildrenPage from './pages/TestChildren/TestChildren';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'children',
    element: <TestChildrenPage />,
  },
  {
    path: 'profile',
    element: <Profile />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
