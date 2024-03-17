import { createEvent, createStore, sample } from "effector";

import { defineResult } from "@/pages/Battle/model/defineResult.ts";
import { ResultPattern, ValidDiceResult } from "@/pages/Battle/model/types.ts";

const diceSides = 6;

export const $firstDice = createStore<ValidDiceResult>(0);
export const $secondDice = createStore<ValidDiceResult>(0);
export const $firstDieModifier = createStore(0);
export const $secondDieModifier = createStore(0);
export const $isFirstAttacking = createStore(true);
export const $isSecondAttacking = $isFirstAttacking.map((state) => !state);
export const $isBattling = createStore(false);
export const $rollResult = createStore<ResultPattern>({
  attack: "",
  defence: "",
  canLower: "",
});

export const firstDiceRolled = createEvent();
export const secondDiceRolled = createEvent();
export const firstModifierChange = createEvent<number>();
export const secondModifierChange = createEvent<number>();
export const resetPressed = createEvent();
export const attackerChanged = createEvent();
export const twoDicesRolled = createEvent();

sample({ clock: twoDicesRolled, target: [firstDiceRolled, secondDiceRolled] });

$firstDice.on(
  firstDiceRolled,
  () => (Math.floor(Math.random() * diceSides) + 1) as ValidDiceResult,
);
$secondDice.on(secondDiceRolled, () => {
  return (Math.floor(Math.random() * diceSides) + 1) as ValidDiceResult;
});
$isFirstAttacking.on(attackerChanged, (state) => !state);
$isBattling.on(firstDiceRolled, () => true);
$isBattling.on(secondDiceRolled, () => true);

$firstDieModifier.on(firstModifierChange, (state, payload) => state + payload);
$secondDieModifier.on(
  secondModifierChange,
  (state, payload) => state + payload,
);

sample({
  clock: [
    firstDiceRolled,
    secondDiceRolled,
    twoDicesRolled,
    firstModifierChange,
    secondModifierChange,
  ],
  source: {
    first: $firstDice,
    second: $secondDice,
    firstModifier: $firstDieModifier,
    secondModifier: $secondDieModifier,
    isFirstAttack: $isFirstAttacking,
  },
  fn: defineResult,
  target: $rollResult,
});

sample({
  clock: resetPressed,
  target: [
    $firstDice.reinit,
    $secondDice.reinit,
    $firstDieModifier.reinit,
    $secondDieModifier.reinit,
    $isBattling.reinit,
    $rollResult.reinit,
  ],
});
