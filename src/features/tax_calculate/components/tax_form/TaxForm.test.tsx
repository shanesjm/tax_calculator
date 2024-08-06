import { render, screen } from '@testing-library/react';
import TaxForm from './TaxForm';

describe('TaxForm Component Test Suite', () => {
  it('Check if Tax From renders the correct values', () => {
    render(
      <TaxForm
        annualIncome={2000}
        taxYear={2022}
        handleSubmit={vi.fn}
        isFetching={false}
      />
    );
    const annualIncomeInput = screen.getByLabelText(/annual income/i);
    expect((annualIncomeInput as HTMLInputElement).value).toStrictEqual('2000');

    const taxYearInput = screen.getByLabelText(/tax year 2022/i);
    expect((taxYearInput as HTMLSelectElement).textContent).toStrictEqual(
      '2022'
    );
  });

  it('Check if Tax From Inputs get disabled when the data is being fetched', () => {
    render(
      <TaxForm
        annualIncome={2000}
        taxYear={2022}
        handleSubmit={vi.fn}
        isFetching
      />
    );
    const annualIncomeInput = screen.getByLabelText(/annual income/i);

    const taxYearInput = screen.getByLabelText(/tax year 2022/i);
    expect(annualIncomeInput).toBeDisabled();
    expect(taxYearInput).toHaveAttribute('aria-disabled', 'true');
  });
});
