import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import LoginPages from "../pages/LoginPages";
import ArsipBalom from "../Pages/ArsipBalom";
import DataPage from "../pages/DataPage";
import EditPage from "../component/EditPage";

// membuat router
const router = createBrowserRouter([
  {
    path: "*",
    element: <div>Routes Not Found!</div>,
  },
  {
    path: "/Input",
    element: <ArsipBalom />,
  },
  {
    children: [
      {
        path: "/",
        element: <LoginPages />,
      },
      {
        path: "/ShowData",
        element: <DataPage />,
      },
      {
        path: "/EditPage",
        element: <EditPage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return (
    <>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />
    </>
  );
};

export default AppRouter;
