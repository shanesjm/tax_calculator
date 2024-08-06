import { render, screen } from '@testing-library/react';
import TaxDisplay from './TaxDisplay';

describe('Tax Display Test Suite', () => {
  it('Check if TaxDisplay component renders tax details correctly', () => {
    render(
      <TaxDisplay
        taxDetailsList={[
          { id: 1, bracket: '$0 - $50,197', amount: 7519, rate: 15 },
        ]}
        annualIncome={50000}
        totalTax={7519}
        netPay={42481}
        effectiveRate={15}
        isFetching={false}
        isError={false}
      />
    );
    expect(screen.getAllByText(/salary/i)[0]).toBeVisible();
    expect(screen.getAllByText(/net pay/i)[0]).toBeVisible();
    expect(screen.getAllByText(/effective rate/i)[0]).toBeVisible();
  });
});
