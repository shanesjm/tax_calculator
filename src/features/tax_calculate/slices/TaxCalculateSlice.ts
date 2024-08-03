// DUCKS pattern
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  InitialTaxCalculateState,
  TaxDetails,
} from '../types/CalculateTaxTypes';

const initialState: InitialTaxCalculateState = {
  taxDetailsList: [],
  taxYear: 2022,
  annualIncome: 500000,
  totalTax: 0,
  netPay: 0,
  effectiveRate: 0,
};

const TaxCalculateSlice = createSlice({
  name: 'taxDetails',
  initialState,
  reducers: {
    setTaxDetailsList(state, action: PayloadAction<TaxDetails[]>) {
      state.taxDetailsList = action.payload;
    },
    setTaxYear(state, action: PayloadAction<number>) {
      state.taxYear = action.payload;
    },
    setAnnualIncome(state, action: PayloadAction<number>) {
      state.annualIncome = action.payload;
    },
    setTotalTax(state, action: PayloadAction<number>) {
      state.totalTax = action.payload;
    },
    setNetPay(state, action: PayloadAction<number>) {
      state.netPay = action.payload;
    },
    setEffectiveRate(state, action: PayloadAction<number>) {
      state.effectiveRate = action.payload;
    },
  },
});

export const {
  setTaxDetailsList,
  setTaxYear,
  setAnnualIncome,
  setTotalTax,
  setNetPay,
  setEffectiveRate,
} = TaxCalculateSlice.actions;
export default TaxCalculateSlice.reducer;
