import React from 'react';
import {BackgroundLogo, BackgroundLogoProps} from './background';
import {NoBackgroundLogo, NoBackgroundLogoProps} from './no-background';

export * from './background';
export * from './no-background';

export interface LogoProps extends BackgroundLogoProps, NoBackgroundLogoProps {
  type?: 'background' | 'no-background';
  numberResult?: any;
}

export function Logo(props: LogoProps) {
  const {type, numberResult, ...others} = props;
  const logo =
    (numberResult && numberResult.card && numberResult.card.type) || undefined;
  switch (type) {
    case 'no-background':
      return <NoBackgroundLogo logo={logo} {...others} />;
    default:
      return <BackgroundLogo logo={logo} {...others} />;
  }
}

Logo.defaultProps = {
  type: 'background',
};

export default Logo;
