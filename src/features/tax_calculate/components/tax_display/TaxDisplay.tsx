import { Card } from '@mui/material';
import './TaxDisplay.css';
import { TaxDisplayProps } from '../../types/CalculateTaxTypes';
import ErrorView from '../../../../common_components/ErrorView';
import TaxDisplaySkeleton from './TaxDisplaySkeleton';
import TaxGraph from './TaxGraph';
import TaxBracket from './TaxBracket';
import TaxSummary from './TaxSummary';

function TaxDisplay({
  taxDetailsList,
  annualIncome,
  totalTax,
  netPay,
  effectiveRate,
  isFetching,
  isError,
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
    if (!taxDetailsList.length || isError) {
      return (
        <Card className="container taxdisplay-container card flex-row">
          <ErrorView />
        </Card>
      );
    }

    return (
      <Card className="container taxdisplay-container card flex-row">
        <div className="tax-details flex-column">
          <TaxSummary
            annualIncome={annualIncome}
            totalTax={totalTax}
            netPay={netPay}
            effectiveRate={effectiveRate}
          />
          <div className="divider" />
          <TaxBracket taxDetailsList={taxDetailsList} />
        </div>
        <TaxGraph
          netPayPercentage={netPayPercentage}
          totalTaxPercentage={totalTaxPercentage}
        />
      </Card>
    );
  };

  return renderContent();
}

export default TaxDisplay;
