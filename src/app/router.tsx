import { createBrowserRouter } from "react-router-dom";

import { AppLoader } from "@/app/AppLoader.tsx";
import { AppProvider } from "@/app/AppProvider.tsx";

import { Main } from "@/pages/Main.tsx";

import { ROUTES_PATHS } from "@/shared/constants/routes.ts";
import { MainLayout } from "@/shared/layout/main-layout";

export const router = createBrowserRouter([
  {
    element: (
      <AppLoader>
        <AppProvider>
          <MainLayout />
        </AppProvider>
      </AppLoader>
    ),
    children: [{ path: ROUTES_PATHS.MAIN, element: <Main /> }],
  },
]);
