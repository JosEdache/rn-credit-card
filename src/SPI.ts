import cardValidator from 'card-validator';
import {CardValue} from './types';

type Card = {[K in keyof CardValue]: CardValue[K]['value']};
type CardOptions = {
  number?: CardNumberOptions;
  date?: CardExpirationDateOption;
  month?: CardExpirationMonthOption;
  year?: CardExpirationYearOption;
} & ValidityOptions;

export function validateCard(card: Card, options: CardOptions = {}) {
  const number = validateNumber(card.number, options.number);
  const expirationDate = validateExpirationDate(
    card.expirationDate,
    options.date,
  );
  const expirationMonth = validateExpirationMonth(
    options.unifiedDate ? expirationDate.month || '' : card.expirationMonth,
    options.month,
  );
  const expirationYear = validateExpirationYear(
    options.unifiedDate ? expirationDate.year || '' : card.expirationYear,
    options.year,
  );
  const cvv = validateCVV(card.cvv);
  const postalCode = validatePostalCode(card.postalCode);
  const validity = checkValidity(
    {
      number,
      expirationDate,
      expirationMonth,
      expirationYear,
      cvv,
      postalCode,
    },
    options,
  );
  return {
    number,
    expirationDate,
    expirationMonth,
    expirationYear,
    cvv,
    postalCode,
    ...validity,
  };
}

export type ValidityOptions = Partial<{
  unifiedDate?: boolean;
}>;

export function checkValidity(card: CardValue, options: ValidityOptions = {}) {
  const {
    number,
    expirationDate,
    expirationMonth,
    expirationYear,
    cvv,
    postalCode,
  } = card;
  const {unifiedDate} = options;

  const isPotentiallyValid =
    number.isPotentiallyValid ||
    expirationDate.isPotentiallyValid ||
    (unifiedDate ? expirationMonth.isPotentiallyValid : true) ||
    (unifiedDate ? expirationYear.isPotentiallyValid : true) ||
    cvv.isPotentiallyValid ||
    postalCode.isPotentiallyValid;

  const isValid =
    number.isValid &&
    expirationDate.isValid &&
    (unifiedDate ? expirationMonth.isValid : true) &&
    (unifiedDate ? expirationYear.isValid : true) &&
    cvv.isValid &&
    (postalCode.isPotentiallyValid || postalCode.isValid);
  return {isPotentiallyValid, isValid};
}

export type CardNumberOptions = Partial<{
  maxLength: number;
  luhnValidateUnionPay: boolean;
  format: boolean;
}>;

export function validateNumber(
  number: string,
  options: CardNumberOptions = {},
) {
  const {format = true} = options;
  const trimmedNumber = number.replace(/\s/g, '');
  const result = cardValidator.number(number);
  const formattedNumber = format ? formatNumber(trimmedNumber, result) : number;
  return {value: formattedNumber, ...result};
}

export function formatNumber(
  number: string,
  result: cardValidator.validNumber,
) {
  const card = result.card;
  if (card) {
    var matches = number.match(/\d{4,}/g);
    var match = (matches && matches[0]) || '';
    var parts = [];
    let len = match.length;
    for (let i = 0; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return number;
    }
  }
  return number;
}

export const DATE_FORMATS = {
  'MM/YY': /\d{2}\/\d{2}/,
  'MM / YY': /\d{2}\s\/\s\d{2}/,
  MMYY: /\d{4}/,
  'MM YY': /\d{2}\s\d{2}/,
  'MM/YYYY': /\d{2}\/\d{4}/,
  'MM / YYYY': /\d{2}\s\/\s\d{4}/,
  MMYYYY: /\d{6}/,
  'MM YYYY': /\d{2}\s\d{2}/,
  'YYYY-MM': /\d{2}-\d{2}/,
};

export type CardExpirationDateOption = Partial<{
  maxElapsedYear: number;
  format: boolean;
  formatType: keyof typeof DATE_FORMATS;
}>;

export function validateExpirationDate(
  date: string,
  options: CardExpirationDateOption = {},
) {
  const {format = true, maxElapsedYear, formatType} = options;
  const result = cardValidator.expirationDate(date, maxElapsedYear);
  const formattedDate = format ? formatDate(date, formatType) : date;
  return {value: formattedDate, ...result};
}

// function cleanDate(date: string): string {
//   return date.replace(/[-\s/]/g, '');
// }

export function formatDate(
  date: string,
  type: CardExpirationDateOption['formatType'],
) {
  switch (type) {
    // case 'MM / YY':
    //   const MM_F_YY = DATE_FORMATS[type];
    //   return date.replace(/(\D*)/g, '').replace(/^(\d{2})(\d{0,2})/, '$1 / $2');
    // case 'MM / YYYY':
    //   const MM_F_YYYY = DATE_FORMATS[type];
    //   return date
    //     .replace(/(\D*)/g, '')
    //     .replace(/^(\d{1,2})(\d{0,4})/, '($1) / ($2)');
    // case 'MM YY':
    //   const MM_YY = DATE_FORMATS[type];
    //   return date
    //     .replace(/(\D*)/g, '')
    //     .replace(/^(\d{1,2})(\d{0,2})/, '($1) / ($2)');
    // case 'MM YYYY':
    //   const MM_YYYY = DATE_FORMATS[type];
    //   return;
    // case 'MM/YY':
    //   const MMFYY = DATE_FORMATS[type];
    //   return;
    // case 'MM/YYYY':
    //   const MMFYYYY = DATE_FORMATS[type];
    //   return;
    // case 'MMYY':
    //   const MMYY = DATE_FORMATS[type];
    //   return;
    // case 'MMYYYY':
    //   const MMYYYY = DATE_FORMATS[type];
    //   return;
    // case 'YYYY-MM':
    //   const YYYYHMM = DATE_FORMATS[type];
    //   return;
    default:
      const clean = date.replace(/(\D*)/g, '');
      if (clean.length > 2) {
        return clean.replace(/^(\d{2})(\d{0,2})/, '$1 / $2');
      }
      return clean;
  }
}

export type CardExpirationMonthOption = {
  format?: boolean;
  formatType?: 'MM' | 'M';
};

export function validateExpirationMonth(
  month: string,
  options: CardExpirationMonthOption = {},
) {
  const {format, formatType} = options;
  const result = cardValidator.expirationMonth(month);
  const formattedMonth = format ? formatMonth(month, formatType) : month;
  return {value: formattedMonth, ...result};
}

export function formatMonth(
  month: string,
  type: CardExpirationMonthOption['formatType'],
) {
  switch (type) {
    default:
      return month;
  }
}

export type CardExpirationYearOption = {
  format?: boolean;
  formatType?: 'YY' | 'YYYY';
};

export function validateExpirationYear(
  year: string,
  options: CardExpirationYearOption = {},
) {
  const {format, formatType} = options;
  const result = cardValidator.expirationYear(year);
  const formattedYear = format ? formatYear(year, formatType) : year;
  return {value: formattedYear, ...result};
}

export function formatYear(
  year: string,
  type: CardExpirationYearOption['formatType'],
) {
  switch (type) {
    default:
      return year;
  }
}

export function validateCVV(cvv: string) {
  const result = cardValidator.cvv(cvv);
  return {value: cvv, ...result};
}

export function validatePostalCode(postalCode: string) {
  const result = cardValidator.postalCode(postalCode);
  return {value: postalCode, ...result};
}
