import cn from "classnames";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";

import styles from "./switch.module.scss";

export interface SwitchProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  leftLabel?: string | ReactNode;
  rightLabel?: string | ReactNode;
  checked?: boolean;
  classNames?: {
    label?: string;
    input?: string;
    outerSpan?: string;
    innerSpan?: string;
  };
  fromElement?: ReactNode;
  toElement?: ReactNode;
  innerElement?: ReactNode;
}

export const Switch = ({
  leftLabel,
  rightLabel,
  checked,
  fromElement,
  toElement,
  innerElement,
  classNames,
  onChange,
  disabled,
  ...restProps
}: SwitchProps) => {
  const [checkedState, setCheckedState] = useState(!!checked);
  return (
    <label className={cn(styles.label, classNames?.label)}>
      {leftLabel || ""}
      <input
        {...restProps}
        onChange={(event) => {
          if (onChange) {
            onChange(event);
          }
          setCheckedState(!checkedState);
        }}
        className={cn(styles.input, classNames?.input)}
        type={"checkbox"}
        checked={checked}
        disabled={disabled}
      />
      <span
        className={cn(
          styles.outer,
          { [styles.outer_active]: checkedState },
          { [styles.outer_disable]: disabled },
          classNames?.outerSpan,
        )}
      >
        <span
          className={cn(styles.fromToElement, {
            [styles.fromToElement_active]: checkedState,
            [styles.fromToElement_disable]: disabled,
          })}
        >
          {checkedState ? toElement : fromElement}
        </span>
        <span
          className={cn(
            styles.inner,
            { [styles.inner_active]: checkedState },
            { [styles.inner_disable]: disabled },
            classNames?.innerSpan,
          )}
        >
          {innerElement || null}
        </span>
      </span>
      {rightLabel || ""}
    </label>
  );
};
