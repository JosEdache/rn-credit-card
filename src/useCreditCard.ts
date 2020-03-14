import {useMemo, useCallback, useState, useEffect} from 'react';
import {
  CardState,
  RenderProps,
  OnChangeTextCallback,
  StateChangerOnChangeText,
  HookProps,
} from './types';
import {
  checkValidity,
  validateNumber,
  validateExpirationDate,
  validateExpirationMonth,
  validateExpirationYear,
  validateCVV,
  validatePostalCode,
  validateCard,
} from './SPI';

export function useCreditCard(props: HookProps = {}): RenderProps {
  const {
    // validateOnInput = true,
    enableReinitialize,
    initialValues = {
      number: '',
      expirationDate: '',
      expirationMonth: '',
      expirationYear: '',
      postalCode: '',
      cvv: '',
    },
    // unifiedDate,
  } = props;

  const initialState = useMemo(() => {
    const {
      number,
      expirationDate,
      expirationMonth,
      expirationYear,
      postalCode,
      cvv,
    } = initialValues;

    const valid = {isValid: false, isPotentiallyValid: false};
    return {
      number: {value: number, card: null, ...valid},
      expirationDate: {value: expirationDate, month: null, year: '', ...valid},
      expirationMonth: {
        value: expirationMonth,
        isValidForThisYear: false,
        ...valid,
      },
      expirationYear: {value: expirationYear, isCurrentYear: false, ...valid},
      cvv: {value: cvv, ...valid},
      postalCode: {value: postalCode, ...valid},
      ...valid,
    };
  }, [initialValues]);

  // const [state, dispatch] = useReducer(reducer, initialState);
  const [state, setState] = useState<CardState>(() => initialState);

  useEffect(() => {
    if (enableReinitialize) {
      setState(validateCard(initialValues));
    }
  }, [initialValues, enableReinitialize]);

  useEffect(() => {
    setState(validateCard(initialValues));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setStateOnChangeText = useCallback<StateChangerOnChangeText>(
    (type, result) => {
      setState(prevState => ({
        ...prevState,
        [type]: result,
        ...checkValidity({...prevState, [type]: result}),
      }));
    },
    [],
  );

  const onChangeText = useCallback<OnChangeTextCallback>(
    type => text => {
      // if (!validateOnInput) {
      //   setState(prevState => ({
      //     ...prevState,
      //     [type]: {
      //       ...prevState[type],
      //       value: text,
      //     },
      //   }));
      //   return;
      // }

      // if (
      //   unifiedDate &&
      //   (type === 'expirationDate' ||
      //     type === 'expirationMonth' ||
      //     type === 'expirationYear')
      // ) {
      //   setState(prevState => {
      //     const unifiedText =
      //       type === 'expirationYear'
      //         ? `${prevState.expirationMonth.value}${text}`
      //         : type === 'expirationMonth'
      //         ? `${text}${prevState.expirationYear.value}`
      //         : text;

      //     const dateResult = validateExpirationDate(unifiedText);
      //     console.log(dateResult.month, dateResult.year);
      //     const monthResult = validateExpirationMonth(
      //       dateResult.month || type === 'expirationMonth'
      //         ? text
      //         : prevState.expirationMonth.value,
      //     );
      //     const yearResult = validateExpirationYear(
      //       dateResult.year || type === 'expirationYear'
      //         ? text
      //         : prevState.expirationYear.value,
      //     );
      //     return {
      //       ...prevState,
      //       expirationDate: dateResult,
      //       expirationMonth: monthResult,
      //       expirationYear: yearResult,
      //     };
      //   });
      //   return;
      // }

      switch (type) {
        case 'number':
          const numberResult = validateNumber(text);
          setStateOnChangeText(type, numberResult);
          break;
        case 'expirationDate':
          const dateResult = validateExpirationDate(text);
          setStateOnChangeText(type, dateResult);
          break;
        case 'expirationMonth':
          const monthResult = validateExpirationMonth(text);
          setStateOnChangeText(type, monthResult);
          break;
        case 'expirationYear':
          const yearResult = validateExpirationYear(text);
          setStateOnChangeText(type, yearResult);
          break;
        case 'cvv':
          const cvvResult = validateCVV(text);
          setStateOnChangeText(type, cvvResult);
          break;
        case 'postalCode':
          const codeResult = validatePostalCode(text);
          setStateOnChangeText(type, codeResult);
          break;
        default:
          break;
      }
    },
    [setStateOnChangeText],
  );

  // const validate = useCallback<Validate>(() => {}, []);

  const {isPotentiallyValid, isValid, ...values} = state;

  return {
    values,
    isPotentiallyValid,
    isValid,
    onChangeText,
    // validate,
  };
}

type CardAction = {[K in keyof CardState]: {type: K; payload: CardState[K]}};

type Actions = CardAction[keyof CardAction];

// function reducer(state: CardState, {type, payload}: Actions): CardState {
//   switch (type) {
//     case 'number':
//       return state;
//     default:
//       return state;
//   }
// }

// function changeTextWithType<T extends keyof CardState>(
//   type: T,
//   state: CardState,
//   result: CardState[T],
// ): CardState {
//   return {
//     ...state,
//     [type]: result,
//     ...checkValidity({...state, [type]: result}),
//   };
// }
