import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import ErrorPage from './pages/Error/Error';
import Root from './pages/Main';
import TestChildrenPage from './pages/TestChildren';
import TextEditor from './pages/TextEditor';
import InfiniteScroll from './pages/InfiniteScroll';
import ProfileEdit from './components/ProfileEdit/ProfileEdit';
import { RecoilRoot } from 'recoil';
import Home from './pages/Home';

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
  {
    path: 'infinite',
    element: <InfiniteScroll />,
  },
  {
    path: 'profile',
    element: <Profile />,
  },
  {
    path: 'ProfileEdit',
    element: <ProfileEdit />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>,
);
