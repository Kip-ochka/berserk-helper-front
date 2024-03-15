import { RouterProvider } from "react-router-dom";

import { router } from "@/app/router.tsx";

import "./styles/index.css";

export const App = () => {
  return <RouterProvider router={router} />;
};
