export const ATTACK_PATTERN = {
  MISS: "Ты промахнулся",
  WEAK: "Ты нанес слабый удар",
  MODERATE: "Ты нанес средний удар",
  STRONG: "Ты нанес сильный удар",
} as const;

export const LOWER_MESSAGES = {
  ATTACK: "Атакующий может свести результат боя вниз",
  DEFENCE: "Защищающий может свести результат боя вниз",
  DRAW: "",
} as const;

export type LowerMessage = (typeof LOWER_MESSAGES)[keyof typeof LOWER_MESSAGES];

export type RollResult =
  | (typeof ATTACK_PATTERN)[keyof typeof ATTACK_PATTERN]
  | "";

export type ResultPattern = {
  attack: RollResult;
  defence: RollResult;
  canLower: LowerMessage;
};

export type ValidDiceResult = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type ResultFnArguments = {
  first: ValidDiceResult;
  second: ValidDiceResult;
  firstModifier: number;
  secondModifier: number;
  isFirstAttack: boolean;
};
