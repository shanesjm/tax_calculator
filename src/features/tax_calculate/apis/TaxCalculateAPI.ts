import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TaxApiDTO } from '../types/CalculateTaxTypes';

const BASE_API_URL = import.meta.env.VITE_API_URL;

export const TaxCalculateAPI = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  endpoints(builder) {
    return {
      fetchTaxBrackets: builder.query<TaxApiDTO, number | undefined>({
        query(year) {
          return `/tax-calculator/tax-year/${year}`;
        },
      }),
    };
  },
});

export const { useFetchTaxBracketsQuery } = TaxCalculateAPI;
