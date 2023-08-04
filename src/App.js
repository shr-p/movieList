import React from 'react';
import Dashboard from './features/Dashboard/Dashboard';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Actors from './features/Actors';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Dashboard></Dashboard>
    ),
  },
  {
    path: "/:id",
    element: (
      <Actors></Actors>
    ),
  },
]);


function App() {
  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
    </div>
    </>
  );
}

export default App;
