import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {View, Text, TouchableOpacity} from 'react-native';
import {Item, Input, Spinner, Icon} from 'native-base';
import {USER_LOGIN_FORM} from '../../actions/types';
import styles from './styles';
import {loginUser} from '../../actions/AuthActions';
import {
  required,
  maxLength12,
  minValue6,
  isValidEmail,
  isYahooMail,
} from './validations';
import {
  txtMedium,
  txtDanger,
  txtWarning,
  txtColor,
  bgInfo,
  selfAlignCenter,
  button,
  mbSm,
  mtSm,
} from '../../components/styles';

const renderField = ({
  secureTextEntry,
  iconType,
  iconName,
  keyboardType,
  placeholder,
  meta: {touched, error, warning},
  input,
}) => {
  return (
    <View style={mbSm}>
      <Item error={touched && !!error} rounded>
        <Icon type={iconType} name={iconName} />
        <Input
          {...input}
          secureTextEntry={JSON.parse(secureTextEntry)}
          keyboardType={keyboardType}
          placeholder={placeholder}
          autoCapitalize="none"
        />
        {touched && !!error && <Icon name="close-circle" />}
      </Item>
      {touched &&
        ((!!error && (
          <Text style={[txtDanger, selfAlignCenter]}>{error}</Text>
        )) ||
          (warning && (
            <Text style={[txtWarning, selfAlignCenter]}>{warning}</Text>
          )))}
    </View>
  );
};

const LoginComponent = (props) => {
  const {handleSubmit, submitting, submitFailed, error} = props;

  return (
    <View style={styles.loginContainer}>
      {submitFailed && (
        <Text style={[mbSm, txtDanger, selfAlignCenter]}>{error}</Text>
      )}

      <Field
        name="email"
        iconType="FontAwesome"
        iconName="envelope-o"
        secureTextEntry="false"
        keyboardType="email-address"
        placeholder="Your email"
        component={renderField}
        validate={[required, isValidEmail]}
        warn={isYahooMail}
      />
      <Field
        name="password"
        type="password"
        iconType="SimpleLineIcons"
        iconName="lock-open"
        secureTextEntry="true"
        keyboardType="default"
        placeholder="Password"
        component={renderField}
        validate={[required, minValue6, maxLength12]}
      />

      <TouchableOpacity
        disabled={submitting}
        onPress={handleSubmit(loginUser)}
        style={[button, mtSm, bgInfo]}>
        <Text style={[txtColor, txtMedium]}>Submit </Text>
        {submitting && <Spinner size={25} color="#fff" />}
      </TouchableOpacity>
    </View>
  );
};

const LoginForm = reduxForm({
  form: USER_LOGIN_FORM, // a unique identifier for this form
})(LoginComponent);

export default LoginForm;
