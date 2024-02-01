import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import LoginPages from "../pages/LoginPages";
import ArsipBalom from "../Pages/ArsipBalom";
import DataPage from "../pages/DataPage";

// membuat router
const router = createBrowserRouter([
  {
    path: "*",
    element: <div>Routes Not Found!</div>,
  },
  {
    children: [
      {
        path: "/",
        element: <LoginPages />,
      },
      {
        path: "/Input",
        element: <ArsipBalom />,
      },
      {
        path: "/ShowData",
        element: <DataPage />,
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
