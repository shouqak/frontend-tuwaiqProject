import { createBrowserRouter, Outlet, RouterProvider } from "react-router";

// ---------- Admin
import Home from "../student/pages/Home";
/* import CreateNewAdmin from ".././admin/components/adminSetting/CreateNewAdmin";
 */import AdminHome from "../admin/pages/AdminHome";
//  admin => student setting
import CreateNewStudent from ".././admin/components/studentSetting/CreateNewStudent";
import ReadAllStudent from ".././admin/components/studentSetting/ReadAllStudent";
import StudentDetails from ".././admin/components/studentSetting/StudentDetails";
//  admin => Teacher setting
import CreateNewTeacher from ".././admin/components/teacherSetting/CreateNewTeacher";
import ReadAllTeacher from ".././admin/components/teacherSetting/ReadAllTeacher";
import TeacherDetails from ".././admin/components/teacherSetting/TeacherDetails";
//  admin => Principle setting
import CreateNewPrinciple from ".././admin/components/principleSetting/CreateNewPrinciple";
import ReadAllPrinciple from ".././admin/components/principleSetting/ReadAllPrinciple";
import PrincipleDetails from ".././admin/components/principleSetting/principleDetails";
import HomePage from "../Pages/HomePage";
import Footer from "../Component/Footer";
import Signin from "../Pages/Signin";
import CreateNewClass from "../admin/components/classSetting/CreateClass";
import ReadAllClasses from "../admin/components/classSetting/ReadAllClasses";
import ClassDetails from "../admin/components/classSetting/ClassDetails";
import NavbarAdmin from "../admin/components/adminSetting/NavbarAdmin";
import AttendanceActionsPage from "../admin/components/Attendance/AttendanceActionsPage";


// layout
function Layout() {
  return (
    <>
      <Outlet />
      <Footer/>
    </>
  );
}

function AdminLayout() {
  return (
    <>
    <NavbarAdmin/>
      <Outlet />
      <Footer/>
    </>
  );
}

const router = createBrowserRouter([
    {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> },
      { path: "/auth/signin", element: <Signin /> }
    ],
  },
  {
    path: "/admin",
    element:<AdminLayout/>,
    children: [
      { index: true, element: <AdminHome /> },
     /*  { path: "createAdmin", element: <CreateNewAdmin /> }, */
      /* { path: "adminHome", element: <AdminHome /> }, */
      // Student setting
      { path: "createStudent", element: <CreateNewStudent /> },
      { path: "readStudent", element: <ReadAllStudent /> },
      { path: "studentDetails/:id", element: <StudentDetails /> },
      // Teacher setting
      { path: "createTeacher", element: <CreateNewTeacher /> },
      { path: "readTeacher", element: <ReadAllTeacher /> },
      { path: "teacherDetails/:id", element: <TeacherDetails /> },
      // Principle setting
      { path: "createPrinciple", element: <CreateNewPrinciple /> },
      { path: "readPrinciple", element: <ReadAllPrinciple /> },
      { path: "principleDetails/:id", element: <PrincipleDetails /> },
      //Class Setting
       { path: "createClass", element: <CreateNewClass /> },
      { path: "readClasses", element: <ReadAllClasses /> },
      { path: "classDetails/:id", element: <ClassDetails/> },
      { path: "Attendance", element: <AttendanceActionsPage/> },

    ],
  },
  {
    path: "/teacher/:id/",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/principle/:id/",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },

    {
    path: "/student/:id",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
