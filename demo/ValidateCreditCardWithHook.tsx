import React from 'react';
import {useCreditCard} from '../src';
import CardInputs from './CardInputs';

function ValidateCreditCardWithHook() {
  const creditCard = useCreditCard({});
  return <CardInputs {...creditCard} />;
}

export default ValidateCreditCardWithHook;
