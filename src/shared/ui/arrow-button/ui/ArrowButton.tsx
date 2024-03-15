import cn from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

import Arrow from "../../../assets/svg/regularIcons/arrow.svg?react";
import style from "./style.module.scss";

export interface DiceButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  position: "left" | "right" | "top" | "bottom";
}
export const ArrowButton: FC<DiceButtonProps> = ({
  position = "bottom",
  className,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      title={"modifier"}
      type={"button"}
      className={cn(style.arrow, style[`arrow_${position}`], className)}
    >
      <Arrow />
    </button>
  );
};
