import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import './TaxFrom.css';
import { Button, Card, MenuItem, TextField } from '@mui/material';
import { Button, MenuItem, TextField } from '@mui/material';
import TaxDisplay from '../tax_display/TaxDisplay';

const taxYearList = [
  { label: 2021, value: '2021' },
  { label: 2022, value: '2022' },
  { label: 2023, value: '2023' },
];

const TaxFormValidation = Yup.object({
  taxAmount: Yup.number()
    .min(1, 'The tax should not be less than 0')
    .max(20, 'Must be 20 characters or less')
    .required('Please enter your Annal Income'),
  taxYear: Yup.number().required('Please select a tax year'),
});

function TaxForm() {
  const formik = useFormik({
    initialValues: {
      taxAmount: '',
      taxYear: '',
    },
    validationSchema: TaxFormValidation,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Card className="container taxform-container">
      <h1 className="form-title">Tax Calculator</h1>
      <FormikProvider value={formik}>
        <form className="form flex-row" onSubmit={formik.handleSubmit}>
          <div className="flex-column">
            <TextField
              error={
                formik.touched.taxAmount && Boolean(formik.errors.taxAmount)
              }
              id="outlined-error"
              value={formik.values.taxAmount}
              label="Tax Amount"
              helperText={formik.errors.taxAmount}
            />
          </div>

          <div className="flex-column">
            <TextField
              id="outlined-select-currency"
              label="Select a Tax Year"
              select
              style={{ width: '200px' }}
              value={formik.values.taxYear}
              helperText={formik.errors.taxYear}
              error={formik.touched.taxYear && Boolean(formik.errors.taxYear)}
            >
              {taxYearList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <Button
            variant="contained"
            type="submit"
            className="button button--primary"
          >
            Calculate
          </Button>
        </form>
      </FormikProvider>
    </Card>
  );
}

export default TaxForm;
