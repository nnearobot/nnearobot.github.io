import React from 'react';

import type { RouteObject } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BodyHealthPage from './pages/BodyHealthPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  let routes: RouteObject[] = [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/body-health", element: <BodyHealthPage /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ];

  let element = useRoutes(routes);

  return (
    <>
      {element}
    </>
  );
}


export default App;
