import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  TButtonCrystal,
  TYPE_ELEMENT_VALUE,
} from "@/pages/SquadCalculator/model/types";

import {
  DEFAULT_FIRST_GOLD,
  DEFAULT_FIRST_SILVER,
  DEFAULT_SECOND_SILVER,
  ELITE_TYPE,
  FREE_ELEMENTS,
  ORDINARY_TYPE,
} from "./constants";

type TInitialState = {
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
        state.goldCrystal -= 1;
        state.silverCrystal -= 1;
      } else if (state.sequence === "second") {
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
        } else state.silverCrystal -= priceEntity;
      }
    },

    deleteToSquad: (state, actions: PayloadAction<TButtonCrystal>) => {
      const priceEntity = actions.payload.value;
      const path = actions.payload.path;
      const maxSilverQuantity =
        state.sequence === "first"
          ? DEFAULT_FIRST_SILVER
          : DEFAULT_SECOND_SILVER;

      const currentEntity = state.squad.findIndex(
        (entity) => entity.value === priceEntity && entity.path === path,
      );

      const currentSilverQuantity = state.squad.reduce((sum, entity) => {
        if (entity.path.includes(ORDINARY_TYPE)) {
          return (sum += entity.value);
        }
        return sum;
      }, 0);

      if (path.includes(ELITE_TYPE)) state.goldCrystal += priceEntity;
      if (path.includes(ORDINARY_TYPE)) {
        if (currentSilverQuantity >= maxSilverQuantity) {
          const returnGold = currentSilverQuantity - maxSilverQuantity;
          if (returnGold > priceEntity) {
            state.goldCrystal += priceEntity;
          } else {
            state.goldCrystal += returnGold;
            state.silverCrystal += priceEntity - returnGold;
          }
        } else state.silverCrystal += priceEntity;
      }
      state.squad.splice(currentEntity, 1);
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
