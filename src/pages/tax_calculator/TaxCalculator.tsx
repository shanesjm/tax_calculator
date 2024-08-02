import TaxDisplay from '../../features/tax_calculate/components/tax_display/TaxDisplay';
import TaxForm from '../../features/tax_calculate/components/tax_form/TaxForm';
import './TaxCalculator.css';

function TaxCalculator() {
  // const { data = [], isFetching } = useFetchTaxBracketsQuery(2021);

  // console.log({ data });
  // console.log({ isFetching });

  return (
    <div className="container">
      <TaxForm />
      <TaxDisplay />
    </div>
  );
}

export default TaxCalculator;
