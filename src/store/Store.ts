import { configureStore } from '@reduxjs/toolkit';
import { TaxCalculateAPI } from '../features/tax_calculate/apis/TaxCalculateAPI';
import TaxCalculateSlice from '../features/tax_calculate/slices/TaxCalculateSlice';

export const store = configureStore({
  reducer: {
    taxCalculate: TaxCalculateSlice,

    [TaxCalculateAPI.reducerPath]: TaxCalculateAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(TaxCalculateAPI.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
