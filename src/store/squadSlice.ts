import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  TButtonCrystal,
  TYPE_ELEMENT_VALUE,
} from "@/pages/SquadCalculator/model/types";

import {
  DEFAULT_FIRST_ALL,
  DEFAULT_FIRST_GOLD,
  DEFAULT_FIRST_SILVER,
  ELITE_TYPE,
  FREE_ELEMENTS,
  ORDINARY_TYPE,
} from "./constants";

type TInitialState = {
  mulligunCount: number;
  elementsSelecteds: string[];
  goldCrystal: number;
  silverCrystal: number;
  allCrystal: number;
  divPrice: number;
  squad: TButtonCrystal[];
};

const initialState: TInitialState = {
  mulligunCount: 0,
  elementsSelecteds: [],
  goldCrystal: DEFAULT_FIRST_GOLD,
  silverCrystal: DEFAULT_FIRST_SILVER,
  allCrystal: DEFAULT_FIRST_ALL,
  divPrice: 0,
  squad: [],
};

export const squadSlice = createSlice({
  name: "squad",
  initialState,
  reducers: {
    setSequence: (state, actions: PayloadAction<string>) => {
      const sequence = actions.payload;

      if (sequence === "first") {
        state.goldCrystal -= 1;
        state.silverCrystal -= 1;
      } else if (sequence === "second") {
        state.goldCrystal += 1;
        state.silverCrystal += 1;
      }
      state.allCrystal = state.goldCrystal + state.silverCrystal;
    },

    addElement: (state, actions: PayloadAction<string>) => {
      if (actions.payload !== TYPE_ELEMENT_VALUE.NETURAL) {
        state.elementsSelecteds.push(actions.payload);

        const length = state.elementsSelecteds.length;

        if (length > FREE_ELEMENTS) {
          state.goldCrystal -= 1;
          state.allCrystal -= 1;
        }
      }
    },

    deleteElement: (state, actions: PayloadAction<string>) => {
      const currentElement = state.elementsSelecteds.indexOf(actions.payload);
      if (actions.payload !== TYPE_ELEMENT_VALUE.NETURAL) {
        state.elementsSelecteds.splice(currentElement, 1);

        const length = state.elementsSelecteds.length;

        if (length >= FREE_ELEMENTS) {
          state.goldCrystal += 1;
          state.allCrystal += 1;
        }
      }
    },

    addToSquad: (state, actions: PayloadAction<TButtonCrystal>) => {
      const priceEntity = actions.payload.value;
      const path = actions.payload.path;
      state.squad.push(actions.payload);

      if (path.includes(ELITE_TYPE)) {
        state.goldCrystal -= priceEntity;
        state.allCrystal -= priceEntity;
      }

      if (path.includes(ORDINARY_TYPE)) {
        if (state.silverCrystal - priceEntity < 0) {
          state.divPrice += priceEntity - state.silverCrystal;
          state.silverCrystal = 0;
          state.goldCrystal -= state.divPrice;
        } else state.silverCrystal -= priceEntity;
        state.allCrystal -= priceEntity;
      }
    },

    deleteToSquad: (state, actions: PayloadAction<TButtonCrystal>) => {
      const priceEntity = actions.payload.value;
      const path = actions.payload.path;
      const currentEntity = state.squad.findIndex(
        (entity) =>
          entity.value === actions.payload.value &&
          actions.payload.path === entity.path,
      );

      if (path.includes(ELITE_TYPE)) state.goldCrystal += priceEntity;
      if (path.includes(ORDINARY_TYPE)) {
        if (state.silverCrystal + priceEntity > DEFAULT_FIRST_SILVER) {
          state.goldCrystal += state.divPrice;
          state.silverCrystal += priceEntity - state.divPrice;
          state.divPrice = 0;
        } else state.silverCrystal += priceEntity;
      }

      state.squad.splice(currentEntity, 1);
      state.allCrystal += priceEntity;
    },

    incrementMulliganCount: (state) => {
      state.mulligunCount += 1;
      state.goldCrystal -= 1;
      state.allCrystal -= 1;
    },

    decrementMulliganCount: (state) => {
      if (state.mulligunCount > 0) {
        state.mulligunCount -= 1;
        state.goldCrystal += 1;
        state.allCrystal += 1;
      }
    },

    setGold: (state, actions: PayloadAction<number>) => {
      state.goldCrystal = actions.payload;
      state.allCrystal += state.goldCrystal;
    },

    setSilver: (state, actions: PayloadAction<number>) => {
      state.silverCrystal = actions.payload;
      state.allCrystal += state.silverCrystal;
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
  setGold,
  setSilver,
} = squadSlice.actions;
export const { squadSelectors } = squadSlice.selectors;
