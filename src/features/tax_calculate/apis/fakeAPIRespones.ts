// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import { TaxApiDTO } from '../types/CalculateTaxTypes';

const generateFakeTaxData = (): TaxApiDTO => {
  const taxBrackets = [];

  // Define the number of brackets to generate
  const numBrackets = faker.number.int({ min: 4, max: 6 });
  let min = 0;

  for (let i = 0; i < numBrackets; i += 1) {
    const max =
      i < numBrackets - 1
        ? faker.number.int({ min: min + 20000, max: min + 50000 })
        : undefined;
    const rate = faker.number.float({ min: 0.1, max: 0.4, multipleOf: 0.01 });

    taxBrackets.push({
      min,
      max,
      rate,
    });

    min = max || min;
  }

  return { tax_brackets: taxBrackets };
};

export default generateFakeTaxData;
