import { FC } from "react";
import { Outlet } from "react-router-dom";

import styles from "./style.module.scss";

export const MainLayout: FC = () => {
  return (
    <div className={styles.main}>
      <Outlet />
    </div>
  );
};
