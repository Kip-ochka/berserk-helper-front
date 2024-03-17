import {
  ATTACK_PATTERN,
  LOWER_MESSAGES,
  ResultFnArguments,
  ResultPattern,
} from "@/pages/Battle/model/types.ts";

const notOppositeRoll = (attackValue: number): ResultPattern => {
  switch (true) {
    case attackValue > 5:
      return {
        attack: ATTACK_PATTERN.STRONG,
        defence: "",
        canLower: LOWER_MESSAGES.DRAW,
      };
    case attackValue === 4 || attackValue === 5:
      return {
        attack: ATTACK_PATTERN.MODERATE,
        defence: "",
        canLower: LOWER_MESSAGES.DRAW,
      };
    case attackValue > 0 && attackValue < 4:
      return {
        attack: ATTACK_PATTERN.WEAK,
        defence: "",
        canLower: LOWER_MESSAGES.DRAW,
      };
    case attackValue === 0:
      return {
        attack: "",
        defence: "",
        canLower: "",
      };
    default:
      throw new Error("Произошла ошибка при проверке НЕ ВСТРЕЧНОГО броска");
  }
};

const drawRoll = (drawResult: number): ResultPattern => {
  if (drawResult >= 5) {
    return {
      attack: ATTACK_PATTERN.MISS,
      defence: ATTACK_PATTERN.WEAK,
      canLower: LOWER_MESSAGES.DRAW,
    };
  }
  return {
    attack: ATTACK_PATTERN.WEAK,
    defence: ATTACK_PATTERN.MISS,
    canLower: LOWER_MESSAGES.DRAW,
  };
};

export const defineResult = ({
  first,
  second,
  firstModifier,
  secondModifier,
  isFirstAttack,
}: ResultFnArguments): ResultPattern => {
  const stable = isFirstAttack
    ? {
        attack: first,
        attackModifier: firstModifier,
        defence: second,
        defenceModifier: secondModifier,
      }
    : {
        attack: second,
        attackModifier: secondModifier,
        defence: first,
        defenceModifier: firstModifier,
      };
  const { attack, defence, attackModifier, defenceModifier } = stable;
  if (defence === 0) {
    return notOppositeRoll(attack + attackModifier);
  }
  const difference = attack + attackModifier - (defence + defenceModifier);
  const isDraw = difference === 0;
  if (isDraw) {
    return drawRoll(attack + attackModifier);
  }

  if (difference >= 5) {
    return {
      attack: ATTACK_PATTERN.STRONG,
      defence: ATTACK_PATTERN.MISS,
      canLower: LOWER_MESSAGES.DRAW,
    };
  }
  if (difference <= -5) {
    return {
      attack: ATTACK_PATTERN.MISS,
      defence: ATTACK_PATTERN.MODERATE,
      canLower: LOWER_MESSAGES.DRAW,
    };
  }
  if (difference === 4) {
    return {
      attack: ATTACK_PATTERN.STRONG,
      defence: ATTACK_PATTERN.WEAK,
      canLower: LOWER_MESSAGES.ATTACK,
    };
  }
  if (difference === -4) {
    return {
      attack: ATTACK_PATTERN.WEAK,
      defence: ATTACK_PATTERN.MODERATE,
      canLower: LOWER_MESSAGES.DEFENCE,
    };
  }
  if (difference === 3) {
    return {
      attack: ATTACK_PATTERN.MODERATE,
      defence: ATTACK_PATTERN.MISS,
      canLower: LOWER_MESSAGES.DRAW,
    };
  }
  if (difference === -3) {
    return {
      attack: ATTACK_PATTERN.MISS,
      defence: ATTACK_PATTERN.WEAK,
      canLower: LOWER_MESSAGES.DRAW,
    };
  }
  if (difference === 2) {
    return {
      attack: ATTACK_PATTERN.MODERATE,
      defence: ATTACK_PATTERN.WEAK,
      canLower: LOWER_MESSAGES.ATTACK,
    };
  }
  if (difference === -2) {
    return {
      attack: ATTACK_PATTERN.MISS,
      defence: ATTACK_PATTERN.MISS,
      canLower: LOWER_MESSAGES.DRAW,
    };
  }
  if (difference === 1 || difference === -1) {
    return {
      attack: ATTACK_PATTERN.WEAK,
      defence: ATTACK_PATTERN.MISS,
      canLower: LOWER_MESSAGES.DRAW,
    };
  }
  throw new Error(
    "Произошла ошибка в подсчете результата, попробуйте обновить страницу и попробовать заного",
  );
};
