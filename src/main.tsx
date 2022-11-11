import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/Error/Error';
import Root from './pages/Main';
import TestChildrenPage from './pages/TestChildren';
import TextEditor from './pages/TextEditor';
import InfiniteScroll from './pages/InfiniteScroll';
import { RecoilRoot } from 'recoil';
import Findpassword from './pages/Member/Findpassword';
import Signin from './pages/Member/Signin';
import Signup from './pages/Member/Signup';

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
    path: 'signin',
    element: <Signin />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
  {
    path: 'findpw',
    element: <Findpassword />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>,
);
