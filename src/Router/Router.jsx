import { createBrowserRouter, Outlet, RouterProvider } from "react-router"
import Home from "../Pages/Home"



function Layout() {
  return (
    <>

      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <Home/> },

    ],
  },
])

function Router() {
  return <RouterProvider router={router} />
}

export default Router