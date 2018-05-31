import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Picker, Item, Icon, CheckBox, ListItem } from 'native-base';
import _ from 'lodash';
import { USER_CREATE_FORM } from '../../actions/types';
import submit from './submit';
var styles = require('../../components/styles');

//Validation
const reqMsg = 'Required'
const required = value => value ? undefined : reqMsg;
const in1To8 = value => _.inRange(value, 1, 9)? undefined : reqMsg;
const is0Or1 = value => _.inRange(value, 0, 2)? undefined : reqMsg;

const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength12 = maxLength(12);
const maxLength40 = maxLength(40);

const minValue = min => value => value && value.length < min ? `Must be at least ${min}` : undefined;
const minValue6 = minValue(6);

const isValidEmail = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;

const confirmValidators = (value, values) => value === values.password ? undefined : 'Confirm password doesn\'t match with password!';

const acceptTerms = value => value? undefined : 'You must accept the terms conditions!!';

//Warning
const over70YearsOld = value =>
    value && value > 70 ? 'You might be too old for using this' : undefined;
const isYahooMail = value =>
    value && /.+@yahoo\.com/.test(value) ? 'Really? You still use yahoo mail ?' : undefined;

const renderField = ({ secureTextEntry, label, requiredMarker, keyboardType, placeholder, meta: { touched, error, warning }, input: { onChange, ...restInput } }) => {
    return (
        <View>
            <Text style={styles.txtMedium}>
                {label}
                <Text style={styles.txtDanger}>{requiredMarker}</Text>
                {touched && (error && error==reqMsg && <Text style={styles.txtDanger}>{error}</Text>)}
            </Text>
            <TextInput secureTextEntry={JSON.parse(secureTextEntry)} style={{ padding: 5 }} keyboardType={keyboardType}
                onChangeText={onChange} {...restInput} placeholder={placeholder} autoCapitalize='none'>
            </TextInput>
            {touched && ((error && error!=reqMsg && <Text style={styles.txtDanger}>{error}</Text>) ||
                (warning && <Text style={styles.txtWarning}>{warning}</Text>))}
        </View>
    );
};

const renderPicker = ({ label, requiredMarker, meta: { touched, error, warning }, input: { onChange, value, ...inputProps }, children, ...pickerProps }) => {
    return (
        <View>
            <Text style={styles.txtMedium}>
                {label}
                <Text style={styles.txtDanger}>{requiredMarker}</Text>
                {touched && (error && <Text style={styles.txtDanger}>{error}</Text>)}
            </Text>
            <Picker selectedValue={value} onValueChange={value => requestAnimationFrame(() => { onChange(value); })} {...inputProps} {...pickerProps} >
                {children}
            </Picker>
        </View>
    );
};

const formatLoanTerm = value => value + '';
const parseLoanTerm = value => parseInt(value);

class UserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { acceptTAndC: false };
    }
    render() {
        const { handleSubmit, submitting, reset } = this.props;

        return (
            <View style={{ flex: 1, flexDirection: 'column', margin: 20, justifyContent: 'flex-start', }}>

                <Field name="name" secureTextEntry="false" keyboardType="default" label="Name: " requiredMarker="*" placeholder="FirstName LastName NikeName" component={renderField}
                    validate={[required, maxLength40]}
                />
                <Field name="bloodGiven" secureTextEntry="false" keyboardType="numeric" label="Number of times given blood: " placeholder="E.g. 5" component={renderField}
                    validate={[number]}
                />
                <Field name="email" secureTextEntry="false" keyboardType="email-address" label="Email: " requiredMarker="*" placeholder="Enter email" component={renderField}
                    validate={[required, isValidEmail]}
                    warn={isYahooMail}
                />
                <Field name="phoneNumber" secureTextEntry="false" keyboardType="numeric" label="Contact Number: " requiredMarker="*" placeholder="E.g. +8801721654450" component={renderField}
                    validate={[required]}
                />
                <Field mode="dropdown" name="bloodGroupId" label="Blood Group: " requiredMarker="*" component={renderPicker}
                    iosHeader="--SELECT--" format={formatLoanTerm} parse={parseLoanTerm}
                    validate={[in1To8]}>
                    <Item label="--SELECT--" />
                    <Item label="O-" value="1" />
                    <Item label="O+" value="2" />
                    <Item label="A-" value="3" />
                    <Item label="A+" value="4" />
                    <Item label="B-" value="5" />
                    <Item label="B+" value="6" />
                    <Item label="AB-" value="7" />
                    <Item label="AB+" value="8" />
                </Field>
                <Field mode="dropdown" name="gender" label="Gender: " requiredMarker="*" component={renderPicker}
                    iosHeader="--SELECT--" format={formatLoanTerm} parse={parseLoanTerm}
                    validate={[is0Or1]}>
                    <Item label="--SELECT--" />
                    <Item label="Male" value="1" />
                    <Item label="Female" value="0" />
                </Field>
                <Field name="password" secureTextEntry="true" keyboardType="default" label="Password: " requiredMarker="*" placeholder="Password" component={renderField}
                    validate={[required, minValue6, maxLength12]}
                />
                <Field name="confirmPassword" secureTextEntry="true" keyboardType="default" label="Confirm Password: " requiredMarker="*" placeholder="Confirm Password" component={renderField}
                    validate={[required, confirmValidators]}
                />

                <Field name="acceptTAndC" component={(props) => {
                    return (
                        <View>
                            <ListItem>
                                <CheckBox {...props.input} checked={props.input.value ? true : false} onPress={() => {
                                    const val = !props.input.value;
                                    props.input.onChange(val);
                                    this.setState({ acceptTAndC: val });
                                    
                                }} />
                                <Text> I accept this terms and conditions</Text>
                            </ListItem>
                            {props.meta.error && <Text style={[styles.txtDanger, styles.mb, styles.mlLg]}>{props.meta.error}</Text>}
                        </View>
                    )
                }} validate={[acceptTerms]}/>

                <TouchableOpacity disabled={submitting}
                    onPress={this.state.acceptTAndC ? handleSubmit(submit) : null}
                    style={[styles.button, { backgroundColor: this.state.acceptTAndC ? '#337ab7' : '#7aa9d0' }]}>
                    <Text style={[styles.txtColor, styles.txtMedium]}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const UserCreateForm = reduxForm({
    form: USER_CREATE_FORM // a unique identifier for this form
})(UserComponent);

export default UserCreateForm;