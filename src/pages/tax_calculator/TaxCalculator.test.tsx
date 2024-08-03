import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import TaxCalculator from './TaxCalculator';
import taxCalculateReducer from '../../features/tax_calculate/slices/TaxCalculateSlice';
import { useFetchTaxBracketsQuery } from '../../features/tax_calculate/apis/TaxCalculateAPI';

// Mock the API call
vi.mock('../../features/tax_calculate/apis/TaxCalculateAPI', () => ({
  useFetchTaxBracketsQuery: vi.fn(),
}));

const mockUseFetchTaxBracketsQuery = useFetchTaxBracketsQuery as jest.Mock;

// Mock Redux store
const renderWithStore = (initialState) => {
  const store = configureStore({
    reducer: { taxCalculate: taxCalculateReducer },
    preloadedState: { taxCalculate: initialState },
  });

  return render(
    <Provider store={store}>
      <TaxCalculator />
    </Provider>
  );
};

describe('TaxCalculator Component', () => {
  it('should display loading state initially', () => {
    mockUseFetchTaxBracketsQuery.mockReturnValue({
      data: { tax_brackets: [] },
      isFetching: true,
      isError: false,
    });

    renderWithStore({
      taxYear: 2022,
      annualIncome: 0,
      taxDetailsList: [],
      totalTax: 0,
      netPay: 0,
      effectiveRate: 0,
    });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  //   it('should display error message on API error', async () => {
  //     mockUseFetchTaxBracketsQuery.mockReturnValue({
  //       data: { tax_brackets: [] },
  //       isFetching: false,
  //       isError: true,
  //       error: { message: 'API Error' },
  //     });

  //     renderWithStore({
  //       taxYear: 2022,
  //       annualIncome: 0,
  //       taxDetailsList: [],
  //       totalTax: 0,
  //       netPay: 0,
  //       effectiveRate: 0,
  //     });

  //     await waitFor(() => {
  //       expect(screen.getByText(/error/i)).toBeInTheDocument();
  //     });
  //   });

  it('should display TaxForm and TaxDisplay on successful data fetch', async () => {
    mockUseFetchTaxBracketsQuery.mockReturnValue({
      data: {
        tax_brackets: [{ min: 0, max: 50197, rate: 0.15 }],
      },
      isFetching: false,
      isError: false,
    });

    renderWithStore({
      taxYear: 2022,
      annualIncome: 100000,
      taxDetailsList: [
        { id: 1, bracket: '$1 - $50197', amount: 7529, rate: 15 },
      ],
      totalTax: 0,
      netPay: 0,
      effectiveRate: 0,
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/Annual income/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Select a Tax Year/i)).toBeInTheDocument();
    });

    // Check that TaxDisplay is rendered with calculated values
    expect(screen.getByText(/total tax/i)).toBeInTheDocument();
    expect(screen.getByText(/net pay/i)).toBeInTheDocument();
  });

  //   it('should handle form submission and update state', async () => {
  //     mockUseFetchTaxBracketsQuery.mockReturnValue({
  //       data: {
  //         tax_brackets: [
  //           { min: 0, max: 50197, rate: 0.15 },
  //           { min: 50197, max: 100392, rate: 0.205 },
  //         ],
  //       },
  //       isFetching: false,
  //       isError: false,
  //     });

  //     renderWithStore({
  //       taxYear: 2022,
  //       annualIncome: 0,
  //       taxDetailsList: [],
  //       totalTax: 0,
  //       netPay: 0,
  //       effectiveRate: 0,
  //     });

  //     fireEvent.change(screen.getByLabelText(/annual income/i), {
  //       target: { value: '60000' },
  //     });
  //     fireEvent.change(screen.getByLabelText(/tax year/i), {
  //       target: { value: '2022' },
  //     });

  //     fireEvent.submit(screen.getByRole('button', { name: /calculate/i }));

  //     await waitFor(() => {
  //       expect(screen.getByText(/total tax/i)).toBeInTheDocument();
  //       expect(screen.getByText(/net pay/i)).toBeInTheDocument();
  //     });
  //   });
});
