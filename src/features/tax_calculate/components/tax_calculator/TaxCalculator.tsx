import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

import TaxDisplay from '../tax_display/TaxDisplay';
import TaxForm from '../tax_form/TaxForm';
import './TaxCalculator.css';
import { useAppSelector } from '../../../../hooks/ReduxHooks';
import { useFetchTaxBracketsQuery } from '../../apis/TaxCalculateAPI';
import {
  setAnnualIncome,
  setEffectiveRate,
  setErrorMessage,
  setNetPay,
  setShowNotification,
  setTaxDetailsList,
  setTaxYear,
  setTotalTax,
} from '../../slices/TaxCalculateSlice';
import {
  TaxBracket,
  TaxDetails,
  TaxFormValues,
} from '../../types/CalculateTaxTypes';
import handleApiError from '../../../../utils/HandleError';

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
  const errorMessage = useAppSelector(
    (state) => state.taxCalculate.errorMessage
  );
  const showNotification = useAppSelector(
    (state) => state.taxCalculate.showNotification
  );
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
      const taxForBracket = parseFloat(
        (taxableAmount * bracket.rate).toFixed(2)
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
    if (isError) {
      handleApiError(error);
      dispatch(setShowNotification(true));
      dispatch(setErrorMessage('Something Went Wrong.'));
    } else {
      dispatch(setErrorMessage(''));
    }
  }, [isError, error, dispatch]);

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
    if (errorMessage) refetch();
  };

  return (
    <div className="container">
      {isError && (
        <Snackbar
          open={showNotification}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={() => {
            dispatch(setShowNotification(false));
          }}
        >
          <Alert severity="error">{errorMessage}</Alert>
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
