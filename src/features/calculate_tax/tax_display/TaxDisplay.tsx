import { Box, Card, CardContent } from '@mui/material';

import './TaxDisplay.css';

const taxData = [
  { max: 49020, min: 0, rate: 0.15 },
  { max: 98040, min: 49020, rate: 0.205 },
  { max: 151978, min: 98040, rate: 0.26 },
  { max: 216511, min: 151978, rate: 0.29 },
  { min: 216511, rate: 0.33 },
];
const AnnualSalary = 115000;
function TaxDisplay() {
  const details: {
    id: number;
    bracket: string;
    amount: number;
    rate: number;
  }[] = [];

  const calculateTaxes = (salary: number) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let total = 0;

    taxData.forEach((bracket, index) => {
      const prevMax = index === 0 ? 0 : taxData[index - 1].max!;
      const taxableAmount = Math.min(bracket.max || Infinity, salary) - prevMax;
      const taxForBracket = (taxableAmount * bracket.rate).toFixed(2);

      if (taxableAmount > 0) {
        total += taxForBracket;
        details.push({
          id: index + 1,
          bracket: `\$${prevMax + 1} - \$${bracket.max || '∞'}`,
          amount: taxForBracket,
          rate: taxData[index].rate * 100,
        });
      }
    });
    console.log({ details });
  };
  calculateTaxes(AnnualSalary);
  return (
    <Card className="container taxdisplay-container card flex-row">
      <div className="tax-details flex-column">
        <div className="flex-row calc-text">
          <div className="bold-400">Salary</div>
          <div className="bold-400">10000</div>
        </div>
        <div className="flex-row calc-text">
          <div className="bold-400">Total Tax</div>
          <div className="bold-400">10000</div>
        </div>
        <div className="flex-row calc-text">
          <div className="bold-600">Net pay</div>
          <div className="bold-600">16000</div>
        </div>
        <div className="flex-row calc-text">
          <div>Effective Rate</div>
          <div>34.06%</div>
        </div>
        <div className="divider" />
        <div className="flex-column">
          <div className="flex-row calc-text">
            <div>Tax Bracket</div>
            <div>Tax Rate</div>
            <div>Tax Amount</div>
          </div>
        </div>
        <div className="flex-column">
          {details.map((taxDetailsObj) => {
            return (
              <div className="flex-row calc-text" key={taxDetailsObj.id}>
                <div>{taxDetailsObj.bracket}</div>
                <div>{taxDetailsObj.rate}</div>
                <div>{taxDetailsObj.amount}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div> Graph goes here</div>
    </Card>
  );
}

export default TaxDisplay;
