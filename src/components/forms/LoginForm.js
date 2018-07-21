import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { View, Text, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';
import { Picker, Item, Input, CheckBox, ListItem, Spinner, Icon } from 'native-base';
import { USER_LOGIN_FORM } from '../../actions/types';
import { intToString, stringToInt } from '../../utills/we';
import submitLoginForm from './submitLoginForm';
import { 
    required, in1To8, is0Or1, number, maxLength12, maxLength40, minValue6, isValidEmail, 
    confirmValidators, acceptTerms, isYahooMail
} from './validations';
import { 
    txtMedium, txtDanger, txtWarning, txtColor, modal, tAndCmodal, txtBlue, txtBold, pickerStyle, 
    selfAlignCenter, font24, button, drpIconLeft, drpIconRight, mb, mlLg, p, mt, mbSm
} from '../../components/styles';

const renderField = ({ secureTextEntry, iconType, iconName, keyboardType, placeholder, meta: { touched, error, warning }, input: { onChange, ...restInput } }) => {
    return (
        <View style={mbSm}>
            <Item error={touched && !!error} rounded>
                <Icon type={iconType} name={iconName} />
                <Input secureTpickerStyleextEntry={JSON.parse(secureTextEntry)} keyboardType={keyboardType}
                    onChangeText={onChange} {...restInput} placeholder={placeholder} autoCapitalize='none'>
                </Input>
                {touched && !!error && <Icon name='close-circle' />}
            </Item>
                {touched && ((!!error && <Text style={[txtDanger, selfAlignCenter]}>{error}</Text>) ||
                    (warning && <Text style={[txtWarning, selfAlignCenter]}>{warning}</Text>))}
        </View>
    );
};

class UserComponent extends Component {
    constructor(props) {
        super(props);
    }
      
    render() {
        const { handleSubmit, submitting, reset } = this.props;
        //console.log(submitting);
        return (
            <View style={{ flex: 1, flexDirection: 'column', padding: 20, justifyContent: 'flex-start' }}>

                <Field name="Email" iconType="FontAwesome" iconName="envelope-o" secureTextEntry="false" keyboardType="email-address" placeholder="Your email" component={renderField}
                    validate={[required, isValidEmail]}
                    warn={isYahooMail}
                />
                <Field name="Password" iconType="SimpleLineIcons" iconName="lock-open" secureTextEntry="true" keyboardType="default" placeholder="Password" component={renderField}
                    validate={[required, minValue6, maxLength12]}
                />

                <TouchableOpacity disabled={submitting}
                    onPress={handleSubmit(submitLoginForm)}
                    style={[button, { backgroundColor: '#337ab7' }]}>
                    <Text style={[txtColor, txtMedium]}>Submit {' '}</Text>
                    {submitting && <Spinner size={25} color="#fff" />}
                </TouchableOpacity>
            </View>
        );
    }
}

const LoginForm = reduxForm({
    form: USER_LOGIN_FORM // a unique identifier for this form
})(UserComponent);

export default LoginForm;