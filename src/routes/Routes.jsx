import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from '../App';
import Vault from '../components/Vault/Vault';
import Manager from '../components/Manager/Manager';

const Routes = () => {

  const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Manager/>},
      { path: 'about', element: <div>about</div>},
      {
        path: "vault-pass", element: <Vault />
      }
      
    ]
  }
]);

  return (
    <RouterProvider router={router} />
  )
}

export default Routes