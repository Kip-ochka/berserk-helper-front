import cn from "classnames";
import { useUnit } from "effector-react";
import { useEffect, useRef, useState } from "react";

import {
  $firstDice,
  $firstDieModifier,
  $isBattling,
  $isFirstAttacking,
  $rollResult,
  $secondDice,
  $secondDieModifier,
  attackerChanged,
  firstDiceRolled,
  firstModifierChange,
  resetPressed,
  secondDiceRolled,
  secondModifierChange,
  twoDicesRolled,
} from "@/pages/Battle/model";

import { ArrowButton } from "@/shared/ui/arrow-button/ui/ArrowButton.tsx";
import { DiceButton } from "@/shared/ui/dice-button";
import { Timer } from "@/shared/ui/dice-button/ui/DiceButton.tsx";
import { Switch } from "@/shared/ui/switch";

import Axe from "../../../shared/assets/svg/battle/axe.svg?react";
import Shield from "../../../shared/assets/svg/battle/shield.svg?react";
import style from "./style.module.scss";

export const Battle = () => {
  const [
    firstDice,
    secondDice,
    firstModifier,
    secondModifier,
    battleBegan,
    isFirstAttack,
    rollResult,
  ] = useUnit([
    $firstDice,
    $secondDice,
    $firstDieModifier,
    $secondDieModifier,
    $isBattling,
    $isFirstAttacking,
    $rollResult,
  ]);
  const [
    onFirstDieRoll,
    onSecondDiceRoll,
    onFirstMode,
    onSecondMode,
    onReset,
    onChangeAttacker,
    onRollClicked,
  ] = useUnit([
    firstDiceRolled,
    secondDiceRolled,
    firstModifierChange,
    secondModifierChange,
    resetPressed,
    attackerChanged,
    twoDicesRolled,
  ]);
  const timer = useRef<Timer>();
  const [isAnimation, setIsAnimation] = useState(false);
  const handleBothClick = () => {
    setIsAnimation(true);
    onRollClicked();
    timer.current = setTimeout(() => {
      setIsAnimation(false);
    }, 500);
  };

  const handleResetClick = () => {
    setIsAnimation(false);
    onReset();
  };

  useEffect(() => {
    return () => {
      setIsAnimation(false);
      clearTimeout(timer.current);
    };
  }, []);
  return (
    <section className={style.battleSection}>
      <div className={cn(style.gamerField, style.gamerField_second)}>
        <div className={style.modifier}>
          {secondModifier <= 0 ? secondModifier : `+${secondModifier}`}
        </div>
        <div className={style.playerButtons}>
          <ArrowButton position={"left"} onClick={() => onSecondMode(-1)} />
          <DiceButton
            diceResult={secondDice}
            onClick={onSecondDiceRoll}
            animationFlag={isAnimation}
          />
          <ArrowButton position={"right"} onClick={() => onSecondMode(+1)} />
        </div>
      </div>
      <div className={cn(style.resultFields, style.resultFields_rotated)}>
        <p className={style.result}>{rollResult.canLower}</p>
        <p className={style.result}>
          {isFirstAttack ? rollResult.defence : rollResult.attack}
        </p>
      </div>

      <div className={cn(style.centralField)}>
        <div className={cn(style.attackerSelect)}>
          {isFirstAttack ? (
            <Shield className={style.rotatedIcon} />
          ) : (
            <Axe className={style.rotatedIcon} />
          )}
          <Switch
            onClick={onChangeAttacker}
            classNames={{ label: style.switch }}
            checked={!isFirstAttack}
          />
          {isFirstAttack ? <Axe /> : <Shield />}
        </div>
        <div className={style.bothPlayerSection}>
          <button
            onClick={battleBegan ? handleResetClick : handleBothClick}
            className={style.battleButton}
          >
            {battleBegan ? "Сброс" : "БОЙ!"}
          </button>
        </div>
      </div>
      <div className={style.resultFields}>
        <p className={style.result}>{rollResult.canLower}</p>
        <p className={style.result}>
          {isFirstAttack ? rollResult.attack : rollResult.defence}
        </p>
      </div>

      <div className={cn(style.gamerField)}>
        <div className={style.modifier}>
          {firstModifier <= 0 ? firstModifier : `+${firstModifier}`}
        </div>
        <div className={style.playerButtons}>
          <ArrowButton position={"left"} onClick={() => onFirstMode(-1)} />
          <DiceButton
            diceResult={firstDice}
            onClick={onFirstDieRoll}
            animationFlag={isAnimation}
          />
          <ArrowButton position={"right"} onClick={() => onFirstMode(+1)} />
        </div>
      </div>
    </section>
  );
};
