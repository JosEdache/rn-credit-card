import React from 'react';
import {CreditCard} from '@josedache/rn-credit-card';
import CardInputs from './CardInputs';

function ValidateCreditCard() {
  return <CreditCard>{props => <CardInputs {...props} />}</CreditCard>;
}

export default ValidateCreditCard;
