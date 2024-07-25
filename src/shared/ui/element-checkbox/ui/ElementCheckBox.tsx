import { FC } from "react";

import { TElement } from "@/pages/SquadCalculator/model/types";

import style from "./style.module.scss";

export const ElementCechkBox: FC<TElement> = ({
  type,
  alt,
  path,
  onChange,
}) => {
  return (
    <label className={style.element} htmlFor={type}>
      <input type="checkbox" value={type} id={type} onChange={onChange} />
      <img src={path} alt={alt} />
    </label>
  );
};
