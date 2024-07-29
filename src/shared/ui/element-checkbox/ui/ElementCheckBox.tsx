import { FC } from "react";

import { TElement } from "@/pages/SquadCalculator/model/types";

import style from "./style.module.scss";

export const ElementCheckBox: FC<TElement> = ({
  type,
  alt,
  path,
  onChange,
}) => {
  return (
    <li>
      <label className={style.element} htmlFor={type}>
        <input type="checkbox" value={type} id={type} onChange={onChange} />
        <img src={path} alt={alt} />
      </label>
    </li>
  );
};
