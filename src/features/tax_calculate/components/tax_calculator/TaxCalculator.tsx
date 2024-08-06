import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';

import TaxDisplay from '../tax_display/TaxDisplay';
import TaxForm from '../tax_form/TaxForm';
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

// This is the only smart component, the child components are views and rely only on props
// The API has to be called only when the Year changes and not the annualIncome
function TaxCalculator() {
  const dispatch = useDispatch();
  // select the state variables from store
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

  // useFetchTaxBracketsQuery hook caches API response for performance optimization
  const {
    data: taxBracketResponse = { tax_brackets: [] },
    isFetching = false,
    isError,
    error,
    refetch,
  } = useFetchTaxBracketsQuery(taxYear);

  // This result of this function can be momoized using useMemo Hook if it was an expensive calculation
  // We can also use useCallback to avoid ununcessary renders if it was an expensive function and if it was passed to child components.
  const calculateTaxes = (income: number, taxBracketList: TaxBracket[]) => {
    const calculatedTaxDetailList: TaxDetails[] = [];
    let calculatedTotalTax = 0;

    taxBracketList.forEach((bracket, index) => {
      const prevMax = index === 0 ? 0 : taxBracketList[index - 1].max!;
      const taxableAmount = Math.min(bracket.max || Infinity, income) - prevMax;
      const taxAmountForTheBracket = taxableAmount * bracket.rate;
      if (taxableAmount > 0) {
        calculatedTotalTax += taxAmountForTheBracket;
        calculatedTaxDetailList.push({
          id: index + 1,
          bracket: `$${prevMax + 1} - $${bracket.max || '∞'}`,
          amount: taxAmountForTheBracket,
          rate: +(taxBracketList[index].rate * 100),
        });
      }
    });

    const calculatedNetPay = income - calculatedTotalTax;
    const calculatedEffectiveRate =
      income > 0 ? (calculatedTotalTax / income) * 100 : 0;

    return {
      calculatedTaxDetailList,
      calculatedTotalTax,
      calculatedNetPay,
      calculatedEffectiveRate,
    };
  };

  useEffect(() => {
    if (isError) {
      const errMsg = handleApiError(error);
      dispatch(setShowNotification(true));
      dispatch(setErrorMessage(errMsg));
    } else {
      dispatch(setErrorMessage(''));
    }
  }, [isError, error, dispatch]);

  // We need to recalculate taxes and update store if the relevant state changes
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
    // The user should be able to calculate the tax again if an error has occured.
    if (errorMessage) refetch();
  };

  return (
    <div className="container">
      {/* show notification and close it after 5 seconds */}
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
