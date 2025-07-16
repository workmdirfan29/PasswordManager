import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from '../App';
import Service from '../components/Service/Service'
import Vault from '../components/Vault/Vault';
import Manager from '../components/Manager/Manager';

const Routes = () => {

  const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Manager/>},
      {
        path: "vault-pass", element: <Vault />
      },
      {
        path: "service", element: <Service />
      }
      
    ]
  }
]);

  return (
    <RouterProvider router={router} />
  )
}

export default Routes