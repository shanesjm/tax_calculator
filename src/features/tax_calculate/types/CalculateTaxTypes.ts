export type TaxDetails = {
  id: number;
  bracket: string;
  amount: number;
  rate: number;
};

export type InitialTaxCalculateState = {
  taxDetailsList: TaxDetails[];
  taxYear: number;
  annualIncome: number;
  totalTax: number;
  netPay: number;
  effectiveRate: number;
  showNotification: boolean;
  isAPIError: boolean;
  errorMessage: string;
};

export type TaxBracketDTO = {
  max?: number;
  min: number;
  rate: number;
};

export type TaxBracket = {
  max?: number;
  min: number;
  rate: number;
};

export type TaxApiDTO = {
  tax_brackets: TaxBracket[];
};

export type TaxFormValues = {
  annualIncome: number;
  taxYear: number;
};

export type TaxFormTypes = {
  annualIncome: number;
  taxYear: number;
  handleSubmit: (values: TaxFormValues) => void;
  isFetching: boolean;
};

export type TaxDisplayProps = {
  taxDetailsList: TaxDetails[];
  annualIncome: number;
  totalTax: number;
  netPay: number;
  effectiveRate: number;
  isFetching: boolean;
  isError: boolean;
};

export type TaxGraphProps = {
  netPayPercentage: number;
  totalTaxPercentage: number;
};

export type TaxBracketProps = {
  taxDetailsList: TaxDetails[];
};
export type TaxSummaryProps = {
  annualIncome: number;
  totalTax: number;
  netPay: number;
  effectiveRate: number;
};
