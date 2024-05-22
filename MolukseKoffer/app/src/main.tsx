import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import About from "./pages/About";
import HomePage from "./pages/HomePage";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import FamilyLine from "./pages/FamilyLine";
import FamilySuitCase from "./pages/FamilySuitCase";
import FamilyMap from "./pages/FamilyMap";

// Create variable with an array of 'Routes'.
// This is the recommended way to do it.

const router = createBrowserRouter([{
    path: '/', // Start or Index
    element: <HomePage />,              //'/' path is set to HomePage
    errorElement: <NotFoundPage />,      // Custom error message, could make a custom error page for each route.,
},
    {
        path: '/about',
        element: <About />,
        errorElement: <NotFoundPage />
    },
    {
        path: '/familyline',
        element: <FamilyLine />,
        errorElement: <NotFoundPage />
    },
    {
        path: '/familymap',
        element: <FamilyMap />,
        errorElement: <NotFoundPage />
    },
    {
        path: '/familysuitcase',
        element: <FamilySuitCase />,
        errorElement: <NotFoundPage />
    }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
