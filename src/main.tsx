import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import ErrorPage from './pages/Error/Error';
import Root from './pages/Main';
import TestChildrenPage from './pages/TestChildren';
import TextEditor from './pages/TextEditor';

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
    path: 'editor',
    element: <TextEditor />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);
