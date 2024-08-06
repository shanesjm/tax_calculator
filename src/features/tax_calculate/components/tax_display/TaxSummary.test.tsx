import { render, screen } from '@testing-library/react';
import TaxSummary from './TaxSummary';

describe('TaxSummary Component Test Suite', () => {
  it('Check if TaxSummary renders the right details', () => {
    render(
      <TaxSummary
        annualIncome={50000}
        totalTax={7500}
        netPay={42500}
        effectiveRate={15}
      />
    );

    expect(screen.getByText(/\$50,000/i)).toBeVisible();
    expect(screen.getByText(/\$7,500/i)).toBeVisible();
    expect(screen.getByText(/\$42,500/i)).toBeVisible();
    expect(screen.getByText(/15\.00%/i)).toBeVisible();
  });
});
