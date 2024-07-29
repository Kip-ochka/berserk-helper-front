import { FC } from "react";

import { TButtonCrystal } from "@/pages/SquadCalculator/model/types";

import style from "./style.module.scss";

export const ButtonCrystal: FC<TButtonCrystal> = ({ value, path, onClick }) => {
  return (
    <li>
      <button className={style.button} onClick={onClick}>
        <span>{value}</span>
        <img src={path} alt="Кнопка в виде кристала" />
      </button>
    </li>
  );
};
