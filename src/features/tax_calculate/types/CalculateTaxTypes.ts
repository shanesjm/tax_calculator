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

export type TaxFromTypes = {
  annualIncome: number | null;
  taxYear: number | null;
  handleSubmit: () => void;
};

export type TaxDisplayProps = {
  taxDetailsList: TaxDetails[];
  annualIncome: number;
  totalTax: number;
  netPay: number;
  effectiveRate: number;
  isFetching: boolean;
};
