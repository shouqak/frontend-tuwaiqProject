import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Home from "../student/pages/Home";

function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/student/",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "teacher/",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "principle/",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "admin/",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
