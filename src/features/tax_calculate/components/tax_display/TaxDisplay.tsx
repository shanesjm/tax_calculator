import { Card } from '@mui/material';

import './TaxDisplay.css';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../hooks/ReduxHooks';
import { useFetchTaxBracketsQuery } from '../../apis/TaxCalculateAPI';
import { useEffect } from 'react';
import { TaxBracket, TaxDetails } from '../../types/CalculateTaxTypes';
import { setTaxDetailsList } from '../../slices/TaxCalculateSlice';
import { PieChart } from '@mui/x-charts';

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

// export const handleApiError = (error: CustomError | undefined) => {
//   if (!error) {
//     return 'An unknown error occurred';
//   }

//   if (error.status === 400) {
//     // Bad Request
//     return error.data?.message || 'Bad request';
//   } else if (error.status === 500) {
//     // Internal Server Error
//     return error.data?.message || 'Internal server error';
//   } else if (error.message === 'Network Error') {
//     // Network Error
//     return 'Network error. Please check your connection.';
//   } else {
//     // Other errors
//     return error.message || 'An error occurred';
//   }
// };

function TaxDisplay(props: { taxDetailsList: TaxDetails[] }) {
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
      const taxForBracket = +(taxableAmount * bracket.rate).toFixed(2);

      if (taxableAmount > 0) {
        total += taxForBracket;
        calculatedTaxDetailList.push({
          id: index + 1,
          bracket: `$${prevMax + 1} - $${bracket.max || '∞'}`,
          amount: taxForBracket,
          rate: +(taxBracketList[index].rate * 100).toFixed(2),
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
        <div className="flex-column tax-details-top">
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
          colors={['#30183f', '#9DE9F6']}
          series={[{ data: [{ value: 10 }, { value: 15 }] }]}
          width={400}
          height={200}
        />
      </div>
    </Card>
  );
}

export default TaxDisplay;
