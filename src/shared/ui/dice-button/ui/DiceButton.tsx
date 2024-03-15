import cn from "classnames";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import One from "../../../assets/svg/dice/1.svg?react";
import Two from "../../../assets/svg/dice/2.svg?react";
import Three from "../../../assets/svg/dice/3.svg?react";
import Four from "../../../assets/svg/dice/4.svg?react";
import Five from "../../../assets/svg/dice/5.svg?react";
import Six from "../../../assets/svg/dice/6.svg?react";
import style from "./style.module.scss";

const DICES = {
  0: <One />,
  1: <One />,
  2: <Two />,
  3: <Three />,
  4: <Four />,
  5: <Five />,
  6: <Six />,
} as const;

export type Timer = ReturnType<typeof setTimeout>;
export interface DiceButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  diceResult: keyof typeof DICES;
  animationFlag: boolean;
}
export const DiceButton: FC<DiceButtonProps> = ({
  diceResult,
  className,
  onClick,
  animationFlag,
  ...restProps
}) => {
  const timer = useRef<Timer>();
  const [isAnimation, setIsAnimation] = useState(false);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setIsAnimation(true);
    timer.current = setTimeout(() => {
      if (onClick) {
        onClick(e);
        setIsAnimation(false);
      }
    }, 500);
  };

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  return (
    <button
      {...restProps}
      type={"button"}
      title={"dice"}
      className={cn(style.dice, className, {
        [style.rotating]: isAnimation || animationFlag,
      })}
      onClick={handleClick}
    >
      {DICES[diceResult]}
    </button>
  );
};
