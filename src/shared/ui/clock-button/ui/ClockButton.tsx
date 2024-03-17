import cn from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react";

import Clock from "../../../assets/svg/clock/clock.svg?react";
import style from "./style.module.scss";

export interface ClockButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  timer?: ReactNode;
}

export const ClockButton: FC<ClockButtonProps> = ({
  timer,
  className,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      type={"button"}
      title={"clock button"}
      className={cn(style.clockButton, className)}
    >
      {timer ? timer : <Clock />}
    </button>
  );
};
