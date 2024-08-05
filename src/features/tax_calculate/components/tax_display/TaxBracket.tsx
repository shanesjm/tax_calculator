import { TaxBracketProps, TaxDetails } from '../../types/CalculateTaxTypes';

function TaxBracket({ taxDetailsList }: TaxBracketProps) {
  return (
    <div className="flex-column tax-details-bottom">
      <div className="flex-row calc-text table-text header">
        <div className="bold-600">Tax Bracket</div>
        <div className="bold-600">Tax Rate</div>
        <div className="bold-600">Tax Amount</div>
      </div>
      {taxDetailsList.length &&
        taxDetailsList.map(({ id, bracket, rate, amount }: TaxDetails) => {
          return (
            <div className="flex-row calc-text table-text" key={id}>
              <div>{bracket.replace('$∞', '∞')}</div>
              <div>{rate} %</div>
              <div>${amount.toLocaleString()}</div>
            </div>
          );
        })}
    </div>
  );
}

export default TaxBracket;
