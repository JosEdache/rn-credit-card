import React from 'react';
import visa from './visa.svg';
import mastercard from './mastercard.svg';
import americanexpress from './americanexpress.svg';
import dinersclub from './dinnersclub.svg';
import discover from './discover.svg';
import jcb from './jcb.svg';
import unionpay from './unionpay.svg';
import maestro from './maestro.svg';
import mir from './unknown.svg';
import elo from './elo.svg';
import hiper from './unknown.svg';
import hipercard from './unknown.svg';
import unknown from './unknown.svg';

const CARD_TYPES = {
  visa,
  mastercard,
  'american-express': americanexpress,
  'diners-club': dinersclub,
  discover,
  jcb,
  unionpay,
  maestro,
  mir,
  elo,
  hiper,
  hipercard,
  unknown,
};

interface LogoProps {
  type: keyof typeof CARD_TYPES;
}

function Logos(props: LogoProps) {
  const {type, ...others} = props;
  const Card = CARD_TYPES[type || 'unknown'];
  return <Card {...others} />;
}

Logos.defaultProps = {
  type: 'unknown',
};

export default Logos;
