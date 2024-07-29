export enum TYPE_ELEMENT_VALUE {
  DARK = "dark",
  FORESTS = "forests",
  MOUNTAINS = "mountains",
  NEUTRAL = "neutral",
  SWAMPS = "swamps",
  PLAINS = "plains",
}

export type TElement = {
  type: TYPE_ELEMENT_VALUE;
  path: string;
  alt?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type TButtonCrystal = {
  value: number;
  path: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
