import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import Logout from "../pages/Logout";

const Routes = () => {
    const { token } = useAuth();
    // 路由配置
    const routesForPublic = [
        {
          path: "/service",
          element: <div>Service Page</div>,
        },
        {
          path: "/about-us",
          element: <div>About Us</div>,
        },
    ];
    const routesForAuthenticatedOnly = [
        {
          path: "/",
          element: <ProtectedRoute />,
          children: [
            {
              path: "/",
              element: <div>User Home Page</div>,
            },
            {
              path: "/profile",
              element: <div>User Profile</div>,
            },
            {
              path: "/logout",
              element: <Logout />,
            },
          ],
        },
      ];
      const routesForNotAuthenticatedOnly = [
        {
          path: "/",
          element: <div>Home Page</div>,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ];
      
      const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
      ]);

      return <RouterProvider router={router} />;
      
};


export default Routes;

  