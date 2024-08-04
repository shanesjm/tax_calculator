import * as Yup from 'yup';

export const TaxYearList = [
  { label: 2019, value: '2019' },
  { label: 2020, value: '2020' },
  { label: 2021, value: '2021' },
  { label: 2022, value: '2022' },
];

export const TaxFormValidation = Yup.object({
  annualIncome: Yup.number()
    .min(1, 'The tax should not be less than 0')
    .required('Please enter your Annal Income'),
  taxYear: Yup.number().required('Please select a tax year'),
});
