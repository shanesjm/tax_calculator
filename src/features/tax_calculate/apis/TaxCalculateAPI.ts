import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import generateFakeTaxData from './fakeAPIRespones';
import { TaxApiDTO } from '../types/CalculateTaxTypes';

const BASE_API_URL = import.meta.env.VITE_API_URL;

const ENABLE_FAKE_API_RESPONSE = import.meta.env.VITE_ENABLE_FAKE_API_RESPONSE;

const fakeBaseQuery: BaseQueryFn = async () => {
  const fakeTaxBracketResponse = generateFakeTaxData(); // Generate new fake data
  return { data: fakeTaxBracketResponse }; // Always return fake data
};

const realBaseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
});
// Used Redux Toolkit Queries for API caching
export const TaxCalculateAPI = createApi({
  reducerPath: 'api',
  baseQuery: ENABLE_FAKE_API_RESPONSE ? fakeBaseQuery : realBaseQuery,
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

// Redux Toolkit Queries exposes a hook with the name use<FunctionName> for API calls and caching

export const { useFetchTaxBracketsQuery } = TaxCalculateAPI;
