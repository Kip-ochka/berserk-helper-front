import { Link } from "react-router-dom";

import { ROUTES_PATHS } from "@/shared/constants/routes.ts";

export const Main = () => {
  return (
    <main>
      <Link to={ROUTES_PATHS.BATTLE}>К бою</Link>
    </main>
  );
};
