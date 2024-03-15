import { createBrowserRouter } from "react-router-dom";

import { AppLoader } from "@/app/AppLoader.tsx";
import { AppProvider } from "@/app/AppProvider.tsx";

import { Battle } from "@/pages/Battle/ui/Battle.tsx";

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
    children: [{ path: ROUTES_PATHS.BATTLE, element: <Battle /> }],
  },
]);
