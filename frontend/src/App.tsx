import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router";
import { AuthenticationWrapper } from "./components";
import { AddUser, Dashboard, EditUser, Login, Register } from "./pages";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <AuthenticationWrapper>
        <ScrollRestoration />
        <Outlet />
      </AuthenticationWrapper>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "users/add",
        element: <AddUser />,
      },
      {
        path: "users/:id",
        element: <EditUser />,
      },
    ],
  },
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
