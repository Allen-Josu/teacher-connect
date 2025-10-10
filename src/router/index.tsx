import { createBrowserRouter } from "react-router-dom";
import { getRoutePath } from "../utils";
import { APPS } from "../constant/app";
import DemoPage from "../pages/demo";

export const router = createBrowserRouter([
  {
    path: getRoutePath(APPS.USERS, "demo"),
    element: <DemoPage />,
  },
]);
