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
