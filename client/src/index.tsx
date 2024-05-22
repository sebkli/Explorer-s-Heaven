import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import AuthProvider from './context/AuthContext';
import ErrorPage from './pages/errorPage/ErrorPage';
import HomePage from './pages/homePage/HomePage';
import LogInPage from './pages/logInPage/LogInPage';
import PostFormPage from './pages/postFormPage/PostFormPage';
import PostsPage from './pages/postsPage/PostsPage';
import SignUpPage from './pages/signUpPage/SignUpPage';
import UpdatePostPage from './pages/updatePostPage/UpdatePostPage';
import theme from './theme/theme';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: (
      <Layout>
        <ErrorPage />
      </Layout>
    ),
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: '/post/new',
        element: (
          <ProtectedRoute>
            <PostFormPage />
          </ProtectedRoute>
        ),
      },
      { path: '/:userId/posts', element: <PostsPage /> },
      {
        path: '/post/:postId',
        element: (
          <ProtectedRoute>
            <UpdatePostPage />
          </ProtectedRoute>
        ),
      },
      { path: '/login', element: <LogInPage /> },
      { path: '/register', element: <SignUpPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
