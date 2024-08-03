import { Card } from '@mui/material';

import './TaxDisplay.css';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts';
import { TaxDetails, TaxDisplayProps } from '../../types/CalculateTaxTypes';
import ErrorView from '../../../../common_components/ErrorView';
import TaxDisplaySkeleton from './TaxDisplaySkeleton';

const sizing = {
  margin: { right: 5 },
  width: 400,
  height: 400,
  legend: { hidden: false },
};

function TaxDisplay({
  taxDetailsList,
  annualIncome,
  totalTax,
  netPay,
  effectiveRate,
  isFetching,
}: TaxDisplayProps) {
  const netPayPercentage = parseFloat(
    ((netPay / annualIncome) * 100).toFixed(2)
  );
  const totalTaxPercentage = parseFloat(
    ((totalTax / annualIncome) * 100).toFixed(2)
  );

  const renderContent = () => {
    if (isFetching) {
      return <TaxDisplaySkeleton />;
    }
    if (!taxDetailsList.length) {
      return (
        <Card className="container taxdisplay-container card flex-row">
          <ErrorView />
        </Card>
      );
    }

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
                outerRadius: 150,
                arcLabel: (item) => `${item.label}(${item.value} %)`,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: 'black',
                fontSize: 14,
              },
            }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...sizing}
          />
        </div>
      </Card>
    );
  };
  return renderContent();
}

export default TaxDisplay;
