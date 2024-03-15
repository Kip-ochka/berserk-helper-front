import cn from "classnames";
import { ReactNode } from "react";

import styles from "./small-widget.module.scss";

export const SmallWidget = ({
  children,
  active,
  className,
}: {
  children: ReactNode;
  active: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        styles.smallWidget,
        { smallWidget_activeState: active },
        className,
      )}
    >
      {children}
    </div>
  );
};
