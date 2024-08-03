import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import TaxDisplay from '../../features/tax_calculate/components/tax_display/TaxDisplay';
import TaxForm from '../../features/tax_calculate/components/tax_form/TaxForm';
import './TaxCalculator.css';
import { useAppSelector } from '../../hooks/ReduxHooks';
import { useFetchTaxBracketsQuery } from '../../features/tax_calculate/apis/TaxCalculateAPI';
import {
  setAnnualIncome,
  setEffectiveRate,
  setNetPay,
  setTaxDetailsList,
  setTaxYear,
  setTotalTax,
} from '../../features/tax_calculate/slices/TaxCalculateSlice';
import {
  TaxBracket,
  TaxDetails,
  TaxFromTypes,
} from '../../features/tax_calculate/types/CalculateTaxTypes';
import { CircularProgress } from '@mui/material';

function TaxCalculator() {
  const dispatch = useDispatch();

  const taxYear = useAppSelector((state) => state.taxCalculate.taxYear);
  const annualIncome = useAppSelector(
    (state) => state.taxCalculate.annualIncome
  );
  const taxDetailsList = useAppSelector(
    (state) => state.taxCalculate.taxDetailsList
  );
  const totalTax = useAppSelector((state) => state.taxCalculate.totalTax);
  const netPay = useAppSelector((state) => state.taxCalculate.netPay);
  const effectiveRate = useAppSelector(
    (state) => state.taxCalculate.effectiveRate
  );

  const {
    data = { tax_brackets: [] },
    isFetching,
    isError,
    error,
  } = useFetchTaxBracketsQuery(taxYear, { skip: !taxYear });

  const calculateTaxes = (income: number, taxBracketList: TaxBracket[]) => {
    const calculatedTaxDetailList: TaxDetails[] = [];
    let calculatedTotalTax = 0;

    taxBracketList.forEach((bracket, index) => {
      const prevMax = index === 0 ? 0 : taxBracketList[index - 1].max!;
      const taxableAmount = Math.min(bracket.max || Infinity, income) - prevMax;
      const taxForBracket = parseInt(
        (taxableAmount * bracket.rate).toFixed(2),
        10
      );

      if (taxableAmount > 0) {
        calculatedTotalTax += taxForBracket;
        calculatedTaxDetailList.push({
          id: index + 1,
          bracket: `$${prevMax + 1} - $${bracket.max || '∞'}`,
          amount: taxForBracket,
          rate: +(taxBracketList[index].rate * 100).toFixed(2),
        });
      }
    });
    console.log({ calculatedTaxDetailList });

    const calculatedNetPay = income - calculatedTotalTax;
    const calculatedEffectiveRate =
      income > 0
        ? parseFloat(((calculatedTotalTax / income) * 100).toFixed(2))
        : 0;

    return {
      calculatedTaxDetailList,
      calculatedTotalTax,
      calculatedNetPay,
      calculatedEffectiveRate,
    };
  };

  useEffect(() => {
    if (data.tax_brackets.length) {
      const {
        calculatedTaxDetailList,
        calculatedTotalTax,
        calculatedNetPay,
        calculatedEffectiveRate,
      } = calculateTaxes(annualIncome, data.tax_brackets);

      dispatch(setTaxDetailsList(calculatedTaxDetailList));
      dispatch(setTotalTax(calculatedTotalTax));
      dispatch(setNetPay(calculatedNetPay));
      dispatch(setEffectiveRate(calculatedEffectiveRate));
    }
  }, [annualIncome, data, dispatch]);

  const handleSubmit = (formValues) => {
    dispatch(setTaxYear(formValues.taxYear));
    dispatch(setAnnualIncome(formValues.annualIncome));
  };

  return isFetching ? (
    <div className="container">
      <CircularProgress />
    </div>
  ) : (
    <div className="container">
      <TaxForm
        annualIncome={annualIncome}
        taxYear={taxYear}
        handleSubmit={handleSubmit}
      />
      <TaxDisplay
        taxDetailsList={taxDetailsList}
        annualIncome={annualIncome}
        totalTax={totalTax}
        netPay={netPay}
        effectiveRate={effectiveRate}
      />
    </div>
  );
}

export default TaxCalculator;
