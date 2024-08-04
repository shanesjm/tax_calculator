import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

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
  TaxFormValues,
} from '../../features/tax_calculate/types/CalculateTaxTypes';
import { Alert, Snackbar } from '@mui/material';

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
    data: taxBracketResponse = { tax_brackets: [] },
    isFetching = false,
    isError,
    error,
    refetch,
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
    // console.log({ calculatedTaxDetailList });

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
    if (taxBracketResponse.tax_brackets.length) {
      const {
        calculatedTaxDetailList,
        calculatedTotalTax,
        calculatedNetPay,
        calculatedEffectiveRate,
      } = calculateTaxes(annualIncome, taxBracketResponse.tax_brackets);

      dispatch(setTaxDetailsList(calculatedTaxDetailList));
      dispatch(setTotalTax(calculatedTotalTax));
      dispatch(setNetPay(calculatedNetPay));
      dispatch(setEffectiveRate(calculatedEffectiveRate));
    }
  }, [taxYear, annualIncome, taxBracketResponse.tax_brackets, dispatch]);

  const handleSubmit = (formValues: TaxFormValues) => {
    dispatch(setTaxYear(formValues.taxYear));
    dispatch(setAnnualIncome(formValues.annualIncome));
    // refetch();
  };

  return (
    <div className="container">
      {isError && (
        <Snackbar
          open={isError}
          autoHideDuration={1000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={() => {
            setShowNotification(false);
          }}
        >
          <Alert severity="error">Sorry! Something Went Wrong.</Alert>
        </Snackbar>
      )}
      <TaxForm
        annualIncome={annualIncome}
        taxYear={taxYear}
        handleSubmit={handleSubmit}
        isFetching={isFetching}
      />
      <TaxDisplay
        taxDetailsList={taxDetailsList}
        annualIncome={annualIncome}
        totalTax={totalTax}
        netPay={netPay}
        effectiveRate={effectiveRate}
        isFetching={isFetching}
        isError={isError}
      />
    </div>
  );
}

export default TaxCalculator;
