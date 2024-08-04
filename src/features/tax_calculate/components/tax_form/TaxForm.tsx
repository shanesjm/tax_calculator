import { useFormik } from 'formik';
import * as Yup from 'yup';
import './TaxFrom.css';
import { Button, Card, MenuItem, TextField } from '@mui/material';
import {
  TaxYearList,
  TaxFormValidation,
} from '../../../../constants/Constants';
import { TaxFormTypes } from '../../types/CalculateTaxTypes';

function TaxForm({
  annualIncome,
  taxYear,
  handleSubmit,
  isFetching,
}: TaxFormTypes) {
  const formik = useFormik({
    initialValues: {
      annualIncome,
      taxYear,
    },
    validationSchema: TaxFormValidation,

    onSubmit: (values) => {
      console.log({ values });
      handleSubmit(values);
    },
  });

  // const [taxFromValues, setTaxFromValues] = useState({
  //   annualIncome,
  //   taxYear,
  // });
  return (
    <Card className="container taxform-container">
      <h1 className="primary-title">Tax Calculator</h1>
      <form className="form flex-row" onSubmit={formik.handleSubmit}>
        <div className="flex-column">
          <TextField
            id="outlined-error"
            value={formik.values.annualIncome}
            label="Annual income"
            name="annualIncome"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.annualIncome && Boolean(formik.errors.annualIncome)
            }
            helperText={formik.errors.annualIncome}
            className="text-field"
            type="number"
            disabled={isFetching}
          />
        </div>

        <div className="flex-column">
          <TextField
            id="outlined-select-currency"
            name="taxYear"
            label="Select a Tax Year"
            select
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.taxYear}
            error={formik.touched.taxYear && Boolean(formik.errors.taxYear)}
            helperText={formik.errors.taxYear}
            className="text-field select"
            disabled={isFetching}
          >
            {TaxYearList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <Button
          variant="contained"
          type="submit"
          className="button custom-button"
          disabled={isFetching}
        >
          Calculate
        </Button>
      </form>
    </Card>
  );
}

export default TaxForm;
