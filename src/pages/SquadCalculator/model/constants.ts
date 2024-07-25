import DarkElement from "../../../shared/assets/elements/element-dark.png";
import ForestsElement from "../../../shared/assets/elements/element-forests.png";
import MointainsElement from "../../../shared/assets/elements/element-mountains.png";
import Neturallement from "../../../shared/assets/elements/element-neutral.png";
import PlainsElement from "../../../shared/assets/elements/element-plains.png";
import SwampsElement from "../../../shared/assets/elements/element-swamps.png";
import { TElement, TYPE_ELEMENT_VALUE } from "../model/types";

export const elements: TElement[] = [
  {
    type: TYPE_ELEMENT_VALUE.PLAINS,
    path: PlainsElement,
    alt: "Иконка степной стихии",
  },
  {
    type: TYPE_ELEMENT_VALUE.MOUNTAINS,
    path: MointainsElement,
    alt: "Иконка   горной стихии",
  },
  {
    type: TYPE_ELEMENT_VALUE.FORESTS,
    path: ForestsElement,
    alt: "Иконка темной стихии",
  },
  {
    type: TYPE_ELEMENT_VALUE.SWAMPS,
    path: SwampsElement,
    alt: "Иконка болотной стихии",
  },
  {
    type: TYPE_ELEMENT_VALUE.DARK,
    path: DarkElement,
    alt: "Иконка темной стихии",
  },
  {
    type: TYPE_ELEMENT_VALUE.NETURAL,
    path: Neturallement,
    alt: "Иконка нейтральной стихии",
  },
];

export const buttonsCrystal: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
