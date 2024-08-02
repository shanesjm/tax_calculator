import TaxDisplay from '../../features/calculate_tax/tax_display/TaxDisplay';
import TaxForm from '../../features/calculate_tax/tax_form/TaxForm';
import './TaxCalculator.css';

function TaxCalculator() {
  return (
    <div className="container">
      <TaxForm />
      <TaxDisplay />
    </div>
  );
}

export default TaxCalculator;
