import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import TaxDisplay from '../../features/tax_calculate/components/tax_display/TaxDisplay';
import TaxForm from '../../features/tax_calculate/components/tax_form/TaxForm';
import './TaxCalculator.css';
import { useAppSelector } from '../../hooks/ReduxHooks';
import { useFetchTaxBracketsQuery } from '../../features/tax_calculate/apis/TaxCalculateAPI';
import {
  setAnnualIncome,
  setTaxDetailsList,
  setTaxYear,
} from '../../features/tax_calculate/slices/TaxCalculateSlice';
import { TaxFromTypes } from '../../features/tax_calculate/types/CalculateTaxTypes';

function TaxCalculator() {
  const dispatch = useDispatch();

  const taxYear = useAppSelector((state) => state.taxCalculate.taxYear);
  const annualIncome = useAppSelector(
    (state) => state.taxCalculate.annualIncome
  );
  const taxDetailsList = useAppSelector(
    (state) => state.taxCalculate.taxDetailsList
  );

  const {
    data = { tax_brackets: [] },
    isFetching,
    isError,
    error,
  } = useFetchTaxBracketsQuery(taxYear, { skip: !taxYear });

  const calculateTaxes = (income: number, taxBracketList: TaxBracket[]) => {
    const calculatedTaxDetailList: TaxDetails[] = [];
    let total = 0;

    taxBracketList.forEach((bracket, index) => {
      const prevMax = index === 0 ? 0 : taxBracketList[index - 1].max!;
      const taxableAmount = Math.min(bracket.max || Infinity, income) - prevMax;
      const taxForBracket = parseInt(
        (taxableAmount * bracket.rate).toFixed(2),
        10
      );

      if (taxableAmount > 0) {
        total += taxForBracket;
        calculatedTaxDetailList.push({
          id: index + 1,
          bracket: `$${prevMax + 1} - $${bracket.max || '∞'}`,
          amount: taxForBracket,
          rate: taxBracketList[index].rate * 100,
        });
      }
    });
    console.log({ calculatedTaxDetailList });

    return calculatedTaxDetailList;
  };

  useEffect(() => {
    if (data.tax_brackets.length) {
      const calculatedTaxes: TaxDetails[] = calculateTaxes(
        annualIncome,
        data.tax_brackets
      );
      dispatch(setTaxDetailsList(calculatedTaxes));
    }
  }, [annualIncome, data, dispatch]);

  const handleSubmit = (formValues) => {
    dispatch(setTaxYear(formValues.taxYear));
    dispatch(setAnnualIncome(formValues.annualIncome));
  };

  return (
    <div className="container">
      <TaxForm
        annualIncome={annualIncome}
        taxYear={taxYear}
        handleSubmit={handleSubmit}
      />
      <TaxDisplay taxDetailsList={[]} />
    </div>
  );
}

export default TaxCalculator;
