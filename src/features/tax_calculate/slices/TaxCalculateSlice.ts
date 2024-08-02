// DUCKS pattern
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  InitialTaxCalculateState,
  TaxDetails,
} from '../types/CalculateTaxTypes';

const initialState: InitialTaxCalculateState = {
  taxDetailsList: [],
  taxYear: 2021,
  annualIncome: 75000,
};

const TaxCalculateSlice = createSlice({
  name: 'taxDetails',
  initialState,
  reducers: {
    setTaxDetailsList(state, action: PayloadAction<TaxDetails[]>) {
      // eslint-disable-next-line no-param-reassign
      state.taxDetailsList = action.payload;
    },
  },
});

export const { setTaxDetailsList } = TaxCalculateSlice.actions;
export default TaxCalculateSlice.reducer;
