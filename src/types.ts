import card from 'card-validator';

/** Card Attributes that can be validated */
export type ValidationType = keyof typeof card;

/**.
 * appends value to each card attribute result of type T
 */
export type CardValueResult<T> = {value: string} & T;

/**
 * Card Attributes type
 */
export type CardValue = {
  [K in keyof typeof card]: CardValueResult<ReturnType<typeof card[K]>>;
};

export type Validate = () => void;

export type OnChangeTextCallback = (
  type: ValidationType,
) => (text: string) => void;

export interface StateChangerOnChangeText {
  <T extends keyof CardState>(type: T, result: CardState[T]): void;
}

/**
 * paremeter of either render/children function props
 */
export interface RenderProps extends card.valid {
  values: CardValue;
  // validate: Validate;
  onChangeText: OnChangeTextCallback;
}

/** type of either render/children function props */
export type Render = (prop: RenderProps) => React.ReactNode;

/** state of the card */
export interface CardState extends CardValue, card.valid {}

/** props of useCreditCard hook */
export interface HookProps {
  initialValues?: {[K in keyof CardValue]: string};
  // validateOnInput: boolean;
  enableReinitialize?: boolean;
  // unifiedDate: boolean;
}

/** props of CreditCard wrapper component */
export interface CardProps extends HookProps {
  children: Render;
  render: Render;
}
