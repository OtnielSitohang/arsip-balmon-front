import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import LoginPages from "../pages/LoginPages";
import ArsipBalom from "../pages/ArsipBalom";

// membuat router
const router = createBrowserRouter([
  {
    path: "*",
    element: <div>Routes Not Found!</div>,
  },
  {
    // mengatur layout dan children
    children: [
      {
        path: "/",
        element: <LoginPages />,
      },
      {
        path: "/login",
        element: <ArsipBalom />,
      },
    ],
  },
]);

const AppRouter = () => {
  return (
    <>
      <Toaster position="top-center" richColors />
      {/* Use RouterProvider to provide the router to your components */}
      <RouterProvider router={router} />
    </>
  );
};

export default AppRouter;
