import { FC, PropsWithChildren } from "react";

import styles from "./style.module.scss";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.main}>{children}</div>;
};
