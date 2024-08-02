import { Card } from '@mui/material';

import './TaxDisplay.css';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../hooks/ReduxHooks';
import { useFetchTaxBracketsQuery } from '../../apis/TaxCalculateAPI';
import { useEffect } from 'react';
import { TaxBracket, TaxDetails } from '../../types/CalculateTaxTypes';
import { setTaxDetailsList } from '../../slices/TaxCalculateSlice';

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

export const handleApiError = (error: CustomError | undefined) => {
  if (!error) {
    return 'An unknown error occurred';
  }

  if (error.status === 400) {
    // Bad Request
    return error.data?.message || 'Bad request';
  } else if (error.status === 500) {
    // Internal Server Error
    return error.data?.message || 'Internal server error';
  } else if (error.message === 'Network Error') {
    // Network Error
    return 'Network error. Please check your connection.';
  } else {
    // Other errors
    return error.message || 'An error occurred';
  }
};
const AnnualSalary = 115000;
function TaxDisplay() {
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
  } = useFetchTaxBracketsQuery(taxYear);

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

  return isError ? (
    <h1>{JSON.stringify(error)}</h1>
  ) : (
    <Card className="container taxdisplay-container card flex-row">
      <div className="tax-details flex-column">
        <div className="flex-row calc-text">
          <div className="bold-400">Salary</div>
          <div className="bold-400">10000</div>
        </div>
        <div className="flex-row calc-text">
          <div className="bold-400">Total Tax</div>
          <div className="bold-400">10000</div>
        </div>
        <div className="flex-row calc-text">
          <div className="bold-600">Net pay</div>
          <div className="bold-600">16000</div>
        </div>
        <div className="flex-row calc-text">
          <div>Effective Rate</div>
          <div>34.06%</div>
        </div>
        <div className="divider" />
        <div className="flex-column">
          <div className="flex-row calc-text">
            <div>Tax Bracket</div>
            <div>Tax Rate</div>
            <div>Tax Amount</div>
          </div>
        </div>
        <div className="flex-column">
          {taxDetailsList.length &&
            taxDetailsList.map((taxDetailsObj: TaxDetails) => {
              return (
                <div className="flex-row calc-text" key={taxDetailsObj.id}>
                  <div>{taxDetailsObj.bracket}</div>
                  <div>{taxDetailsObj.rate}</div>
                  <div>{taxDetailsObj.amount}</div>
                </div>
              );
            })}
        </div>
      </div>

      <div> Graph goes here</div>
    </Card>
  );
}

export default TaxDisplay;
