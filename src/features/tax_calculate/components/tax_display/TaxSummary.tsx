import { TaxSummaryProps } from '../../types/CalculateTaxTypes';

function TaxSummary({
  annualIncome,
  totalTax,
  netPay,
  effectiveRate,
}: TaxSummaryProps) {
  return (
    <div className="flex-column tax-details-top">
      <div className="flex-row calc-text">
        <div className="bold-400">Salary</div>
        <div className="bold-400">${annualIncome.toLocaleString()}</div>
      </div>
      <div className="flex-row calc-text">
        <div className="bold-400">Total Tax</div>
        <div className="bold-400" data-testid="total_tax">
          ${parseFloat(totalTax.toFixed(2)).toLocaleString()}
        </div>
      </div>
      <div className="flex-row calc-text">
        <div className="bold-600">Net pay</div>
        <div className="bold-600">${netPay.toLocaleString()}</div>
      </div>
      <div className="flex-row calc-text">
        <div>Effective Rate</div>
        <div>{effectiveRate.toFixed(2)}%</div>
      </div>
    </div>
  );
}

export default TaxSummary;
