import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  TButtonCrystal,
  TYPE_ELEMENT_VALUE,
} from "@/pages/SquadCalculator/model/types";

import {
  DEFAULT_FIRST_GOLD,
  DEFAULT_FIRST_SILVER, DEFAULT_SECOND_SILVER,
  ELITE_TYPE,
  FREE_ELEMENTS,
  ORDINARY_TYPE,
} from "./constants";

type TInitialState = {
  maxGoldValue: number
  sequence: string;
  mulliganCount: number;
  elementsSelected: string[];
  goldCrystal: number;
  silverCrystal: number;
  squad: TButtonCrystal[];
};

const initialState: TInitialState = {
  sequence: "first",
  mulliganCount: 0,
  elementsSelected: [],
  goldCrystal: DEFAULT_FIRST_GOLD,
  maxGoldValue: DEFAULT_FIRST_GOLD,
  silverCrystal: DEFAULT_FIRST_SILVER,
  squad: [],
};

export const squadSlice = createSlice({
  name: "squad",
  initialState,
  reducers: {
    setSequence: (state, actions: PayloadAction<string>) => {
      state.sequence = actions.payload;

      if (state.sequence === "first") {
        state.maxGoldValue -= 1;
        state.goldCrystal -= 1;
        state.silverCrystal -= 1;
      } else if (state.sequence === "second") {
        state.maxGoldValue += 1;
        state.goldCrystal += 1;
        state.silverCrystal += 1;
      }
    },

    addElement: (state, actions: PayloadAction<string>) => {
      if (actions.payload !== TYPE_ELEMENT_VALUE.NEUTRAL) {
        state.elementsSelected.push(actions.payload);
        const length = state.elementsSelected.length;

        if (length > FREE_ELEMENTS) {
          state.goldCrystal -= 1;
          state.maxGoldValue -= 1;
        }
      }
    },

    deleteElement: (state, actions: PayloadAction<string>) => {
      const currentElement = state.elementsSelected.indexOf(actions.payload);
      if (actions.payload !== TYPE_ELEMENT_VALUE.NEUTRAL) {
        state.elementsSelected.splice(currentElement, 1);
        const length = state.elementsSelected.length;

        if (length >= FREE_ELEMENTS) {
          state.goldCrystal += 1;
          state.maxGoldValue += 1;
        }
      }
    },

    addToSquad: (state, actions: PayloadAction<TButtonCrystal>) => {
      const priceEntity = actions.payload.value;
      const path = actions.payload.path;
      state.squad.push(actions.payload);
      if (path.includes(ELITE_TYPE)) state.goldCrystal -= priceEntity;
      if (path.includes(ORDINARY_TYPE)) {
        if (state.silverCrystal - priceEntity < 0) {
          const divPrice = priceEntity - state.silverCrystal;
          state.goldCrystal -= divPrice;
          state.silverCrystal -= state.silverCrystal;
        } else {
          state.silverCrystal -= priceEntity;
        }
      }
    },

    deleteToSquad: (state, actions: PayloadAction<TButtonCrystal>) => {
      const priceEntity = actions.payload.value;
      const path = actions.payload.path;
      const maxSilverCrystal = state.sequence === "first" ? DEFAULT_FIRST_SILVER : DEFAULT_SECOND_SILVER;
      const currentEntity = state.squad.findIndex(
        (entity) => entity.value === priceEntity && entity.path === path,
      );

      const {
        gold: occupiedGoldCrystal,
        silver: occupiedSilverCrystal,
      } = state.squad.reduce((sum, entity) => {
        if (entity.path.includes(ELITE_TYPE)) {
          sum.gold = sum.gold + entity.value;
          return sum;
        }
        sum.silver = sum.silver + entity.value;
        return sum;
      }, { gold: 0, silver: 0 });

      if (path.includes(ELITE_TYPE)) {
        state.goldCrystal += priceEntity;
      }

      if (path.includes(ORDINARY_TYPE)) {
        if (occupiedSilverCrystal > maxSilverCrystal) {
          const availableGoldToReturn = state.goldCrystal <= 0 ? state.maxGoldValue + Math.abs(state.goldCrystal) - occupiedGoldCrystal : state.maxGoldValue - occupiedGoldCrystal;
          const goldToReturn = occupiedGoldCrystal + priceEntity > state.maxGoldValue ? availableGoldToReturn : priceEntity;
          const silverToReturn = occupiedGoldCrystal + priceEntity > state.maxGoldValue ? priceEntity - availableGoldToReturn : 0;

          state.goldCrystal += goldToReturn;
          state.silverCrystal += silverToReturn;
        } else {
          state.silverCrystal += priceEntity;
        }
      }
      state.squad.splice(currentEntity, 1);
      return;
    },

    incrementMulliganCount: (state) => {
      state.mulliganCount += 1;
      state.goldCrystal -= 1;
    },

    decrementMulliganCount: (state) => {
      if (state.mulliganCount > 0) {
        state.mulliganCount -= 1;
        state.goldCrystal += 1;
      }
    },
  },
  selectors: {
    squadSelectors: (state) => state,
  },
});

export const {
  setSequence,
  addElement,
  deleteElement,
  addToSquad,
  deleteToSquad,
  incrementMulliganCount,
  decrementMulliganCount,
} = squadSlice.actions;
export const { squadSelectors } = squadSlice.selectors;
