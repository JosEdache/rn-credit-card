import React from 'react';
import {TextInput, Text, StyleSheet, View, ScrollView} from 'react-native';
import {RenderProps} from '../src/types';
import {Logo} from '@josedache/rn-credit-card';

function CardInputs(props: RenderProps) {
  const {values, onChangeText, isPotentiallyValid, isValid} = props;
  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <Text>Card</Text>
        <Text>
          isPotentiallyValid:
          {isPotentiallyValid ? 'True' : 'False'}
        </Text>
        <Text>isValid: {isValid ? 'True' : 'False'}</Text>
        <View style={{flexDirection: 'row'}}>
          <Logo numberResult={values.number} />
          <Logo numberResult={values.number} type="no-background" />
        </View>
      </View>
      <ScrollView>
        <CardInput
          title="Number"
          value={values.number.value}
          onChangeText={onChangeText('number')}
          isValid={values.number.isValid}
          isPotentiallyValid={values.number.isPotentiallyValid}
        />
        <CardInput
          title="Exp Date"
          value={values.expirationDate.value}
          onChangeText={onChangeText('expirationDate')}
          isValid={values.expirationDate.isValid}
          isPotentiallyValid={values.expirationDate.isPotentiallyValid}
        />
        <CardInput
          title="Exp Month"
          value={values.expirationMonth.value}
          onChangeText={onChangeText('expirationMonth')}
          isValid={values.expirationMonth.isValid}
          isPotentiallyValid={values.expirationMonth.isPotentiallyValid}
        />
        <CardInput
          title="Exp Year"
          value={values.expirationYear.value}
          onChangeText={onChangeText('expirationYear')}
          isValid={values.expirationYear.isValid}
          isPotentiallyValid={values.expirationYear.isPotentiallyValid}
        />
        <CardInput
          title="CVV"
          value={values.cvv.value}
          onChangeText={onChangeText('cvv')}
          isValid={values.cvv.isValid}
          isPotentiallyValid={values.cvv.isPotentiallyValid}
        />
        <CardInput
          title="Postal Code"
          value={values.postalCode.value}
          onChangeText={onChangeText('postalCode')}
          isValid={values.postalCode.isValid}
          isPotentiallyValid={values.postalCode.isPotentiallyValid}
        />
      </ScrollView>
    </View>
  );
}

type CardInputProps = {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  isValid: boolean;
  isPotentiallyValid: boolean;
};
export function CardInput(props: CardInputProps) {
  const {title, value, isPotentiallyValid, isValid, onChangeText} = props;
  return (
    <View style={styles.inputContainer}>
      <Text>{title}</Text>
      <TextInput
        style={[styles.input]}
        value={value}
        onChangeText={onChangeText}
      />
      <Text>
        isPotentiallyValid:
        {isPotentiallyValid ? 'True' : 'False'}
      </Text>
      <Text>isValid: {isValid ? 'True' : 'False'}</Text>
    </View>
  );
}

export default CardInputs;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputContainer: {
    margin: 16,
    elevation: 4,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 4,
  },
  input: {
    backgroundColor: 'lightgrey',
    borderRadius: 4,
    marginVertical: 8,
  },
  number: {},
});
