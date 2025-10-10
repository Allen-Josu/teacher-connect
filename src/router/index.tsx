import { createBrowserRouter } from "react-router-dom";
import { getRoutePath } from "../utils";
import { APPS } from "../constant/app";
import DemoPage from "../pages/demo";
import Login from "../pages/login";

export const router = createBrowserRouter([
  {
    path: getRoutePath(APPS.USERS, "demo"),
    element: <DemoPage />,
  },
  {
    path: getRoutePath(APPS.USERS, "login"),
    element: <Login />,
  },
]);
