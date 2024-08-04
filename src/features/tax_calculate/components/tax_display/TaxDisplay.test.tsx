import { render, screen } from '@testing-library/react';
import TaxDisplay from './TaxDisplay';

describe('TaxDisplay Component', () => {
  const defaultProps = {
    taxDetailsList: [
      { id: 1, bracket: '$0 - $50,197', amount: 7519, rate: 15 },
    ],
    annualIncome: 50000,
    totalTax: 7519,
    netPay: 42481,
    effectiveRate: 15,
    isFetching: false,
    isError: false,
  };

  it('should render tax details', () => {
    render(<TaxDisplay {...defaultProps} />);

    expect(screen.getAllByText(/salary/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/net pay/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/effective rate/i)[0]).toBeInTheDocument();
    // expect(screen.getByText(/net pay/i)).toBeInTheDocument();
    // expect(screen.getByText(/effective rate/i)).toBeInTheDocument();
  });

  it('should render TaxDisplaySkeleton when fetching', () => {
    render(<TaxDisplay {...defaultProps} isFetching={true} />);

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('should render ErrorView when there is an error', () => {
    render(<TaxDisplay {...defaultProps} isError={true} />);

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
