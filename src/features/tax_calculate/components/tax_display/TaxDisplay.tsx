import { Card } from '@mui/material';

import './TaxDisplay.css';
import { PieChart } from '@mui/x-charts';
import { TaxDetails, TaxDisplayProps } from '../../types/CalculateTaxTypes';

const taxData = [
  { max: 49020, min: 0, rate: 0.15 },
  { max: 98040, min: 49020, rate: 0.205 },
  { max: 151978, min: 98040, rate: 0.26 },
  { max: 216511, min: 151978, rate: 0.29 },
  { min: 216511, rate: 0.33 },
];

interface ApiError {
  code: string;
  field: string;
  message: string;
}

interface CustomError extends Error {
  status?: number;
  data?: ApiError;
}

// export const handleApiError = (error: CustomError | undefined) => {
//   if (!error) {
//     return 'An unknown error occurred';
//   }

//   if (error.status === 400) {
//     // Bad Request
//     return error.data?.message || 'Bad request';
//   } else if (error.status === 500) {
//     // Internal Server Error
//     return error.data?.message || 'Internal server error';
//   } else if (error.message === 'Network Error') {
//     // Network Error
//     return 'Network error. Please check your connection.';
//   } else {
//     // Other errors
//     return error.message || 'An error occurred';
//   }
// };
function TaxDisplay({
  taxDetailsList,
  annualIncome,
  totalTax,
  netPay,
  effectiveRate,
}: TaxDisplayProps) {
  const netPayPercentage = parseFloat(
    ((netPay / annualIncome) * 100).toFixed(2)
  );
  const totalTaxPercentage = parseFloat(
    ((totalTax / annualIncome) * 100).toFixed(2)
  );

  return (
    <Card className="container taxdisplay-container card flex-row">
      <div className="tax-details flex-column">
        <div className="flex-column tax-details-top">
          <div className="flex-row calc-text">
            <div className="bold-400">Salary</div>
            <div className="bold-400">${annualIncome.toLocaleString()}</div>
          </div>
          <div className="flex-row calc-text">
            <div className="bold-400">Total Tax</div>
            <div className="bold-400">${totalTax.toLocaleString()}</div>
          </div>
          <div className="flex-row calc-text">
            <div className="bold-600">Net pay</div>
            <div className="bold-600">${netPay.toLocaleString()}</div>
          </div>
          <div className="flex-row calc-text">
            <div>Effective Rate</div>
            <div>{effectiveRate}%</div>
          </div>
        </div>
        <div className="divider" />
        <div className="flex-column tax-details-bottom">
          <div className="flex-row calc-text table-text header">
            <div className="bold-600">Tax Bracket</div>
            <div className="bold-600">Tax Rate</div>
            <div className="bold-600">Tax Amount</div>
          </div>
          {taxDetailsList.length &&
            taxDetailsList.map((taxDetailsObj: TaxDetails) => {
              return (
                <div
                  className="flex-row calc-text table-text"
                  key={taxDetailsObj.id}
                >
                  <div>{taxDetailsObj.bracket}</div>
                  <div>{taxDetailsObj.rate} %</div>
                  <div>${taxDetailsObj.amount.toLocaleString()}</div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="tax-details-chart">
        <PieChart
          colors={['#FFF1C9', '#EA5F89']}
          series={[
            {
              data: [
                { id: 1, value: netPayPercentage, label: 'Net Pay' },
                { id: 2, value: totalTaxPercentage, label: 'Total Tax' },
              ],
              arcLabel: (item) => `${item.label}(${item.value} %)`,
              arcLabelMinAngle: 50,
            },
          ]}
          width={500}
          height={250}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </div>
    </Card>
  );
}

export default TaxDisplay;
