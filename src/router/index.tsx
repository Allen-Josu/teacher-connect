import { createBrowserRouter } from "react-router-dom";
import { getRoutePath } from "../utils";
import { APPS } from "../constant/app";
import DemoPage from "../pages/demo";
import HomePage from "../pages/home";
import ResourceLibrary from "../pages/resource-library";
import AIAssistant from "../pages/ai-assistant";
import TeacherInteractive from "../pages/teacher-interactive";

export const router = createBrowserRouter([
  // Users
  {
    path: getRoutePath(APPS.USERS, "demo"),
    element: <DemoPage />,
  },
  {
    path: getRoutePath(APPS.USERS, "home"),
    element: <HomePage />,
  },
  {
    path: getRoutePath(APPS.USERS, "resource-library"),
    element: <ResourceLibrary />,
  },
  {
    path: getRoutePath(APPS.USERS, "ai-assistant"),
    element: <AIAssistant />,
  },
   {
    path: getRoutePath(APPS.USERS, "teacher-interactive"),
    element: <TeacherInteractive />,
  },
]);
