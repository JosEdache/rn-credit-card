import React, {Component, Fragment} from 'react';
import {CardProps, CardState, OnChangeTextCallback} from './types';
import {
  validateCard,
  validateNumber,
  validateExpirationDate,
  validateExpirationMonth,
  validateExpirationYear,
  validateCVV,
  validatePostalCode,
  checkValidity,
} from './SPI';

class CreditCard extends Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);
    const {
      number,
      expirationDate,
      expirationMonth,
      expirationYear,
      postalCode,
      cvv,
    } = props.initialValues!;
    const valid = {isValid: false, isPotentiallyValid: false};
    this.state = {
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
  }

  static defaultProps: Partial<CardProps> = {
    initialValues: {
      number: '',
      expirationDate: '',
      expirationMonth: '',
      expirationYear: '',
      postalCode: '',
      cvv: '',
    },
  };

  //   static getDerivedStateFromProps(props: CardProps, state: CardState) {}

  componentDidMount = () => {
    this.setState((_, {initialValues}) => {
      return validateCard(initialValues!);
    });
  };

  componentDidUpdate = (prevProps: CardProps) => {
    const {enableReinitialize, initialValues} = this.props;
    if (enableReinitialize && initialValues !== prevProps.initialValues) {
      this.componentDidMount();
    }
  };

  // validate: Validate = () => {};

  onChangeText: OnChangeTextCallback = type => text => {
    // TODO move setState to a unified functions
    // if (this.props.validateOnInput) {
    //   this.setState(prevState => ({
    //     ...prevState,
    //     [type]: {
    //       ...prevState[type],
    //       value: text,
    //     },
    //   }));
    //   return;
    // }

    switch (type) {
      case 'number':
        const numberResult = validateNumber(text);
        this.setState(state => ({
          number: numberResult,
          ...checkValidity({...state, number: numberResult}),
        }));
        break;
      case 'expirationDate':
        const dateResult = validateExpirationDate(text);
        this.setState(state => ({
          expirationDate: dateResult,
          ...checkValidity({...state, expirationDate: dateResult}),
        }));
        break;
      case 'expirationMonth':
        const monthResult = validateExpirationMonth(text);
        this.setState(state => ({
          expirationMonth: monthResult,
          ...checkValidity({...state, expirationMonth: monthResult}),
        }));
        break;
      case 'expirationYear':
        const yearResult = validateExpirationYear(text);
        this.setState(state => ({
          expirationYear: yearResult,
          ...checkValidity({...state, expirationYear: yearResult}),
        }));
        break;
      case 'cvv':
        const cvvResult = validateCVV(text);
        this.setState(state => ({
          cvv: cvvResult,
          ...checkValidity({...state, cvv: cvvResult}),
        }));
        break;
      case 'postalCode':
        const codeResult = validatePostalCode(text);
        this.setState(state => ({
          postalCode: codeResult,
          ...checkValidity({...state, postalCode: codeResult}),
        }));
        break;
      default:
        break;
    }
  };

  render() {
    const {children, render} = this.props;
    const {isValid, isPotentiallyValid, ...values} = this.state;
    return (
      <Fragment>
        {children
          ? children({
              values,
              isValid,
              isPotentiallyValid,
              // validate: this.validate,
              onChangeText: this.onChangeText,
            })
          : render({
              values,
              isValid,
              isPotentiallyValid,
              // validate: this.validate,
              onChangeText: this.onChangeText,
            })}
      </Fragment>
    );
  }
}

export {CreditCard};
