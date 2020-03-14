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
// import hiper from './unknown.svg';
// import hipercard from './unknown.svg';
import unknown from './unknown.svg';
import {SvgProps} from 'react-native-svg';

export const NO_BACKGROUND_LOGOS = {
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
  hiper: unknown,
  hipercard: unknown,
  unknown,
};

export interface NoBackgroundLogoProps extends SvgProps {
  logo?: keyof typeof NO_BACKGROUND_LOGOS;
}

export function NoBackgroundLogo(props: NoBackgroundLogoProps) {
  const {logo, ...others} = props;
  const Card = NO_BACKGROUND_LOGOS[logo!];
  return <Card {...others} />;
}

NoBackgroundLogo.defaultProps = {
  logo: 'unknown',
};

export default NoBackgroundLogo;
