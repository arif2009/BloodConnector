import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { H2 } from 'native-base';
import { USER_CREATE_FORM } from '../../actions/types';
import submit from './submit';
var styles = require('../../components/styles');

//Validation
const required = value => value ? undefined : 'Required';
const maxLength40 = value => value && value.length > 40 ? `Must be 40 characters or less` : undefined;
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined;
const minValue18 = minValue(18);
const isValidEmail = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;

//Warning
const over70YearsOld = value =>
    value && value > 70 ? 'You might be too old for using this' : undefined;
const isYahooMail = value =>
value && /.+@yahoo\.com/.test(value) ?'Really? You still use yahoo mail ?' : undefined;

const renderField = ({ label, requiredMarker, keyboardType, placeholder, meta: { touched, error, warning }, input: { onChange, ...restInput }}) => {
    return (
    <View>
        <Text style={styles.txtMedium}>{label}<Text style={styles.txtDanger}>{requiredMarker}</Text></Text>
        <TextInput style={{ padding: 5 }}
                keyboardType={keyboardType} onChangeText={onChange} {...restInput} placeholder={placeholder} autoCapitalize='none'>
        </TextInput>
        {touched && ((error && <Text style={styles.txtDanger}>{error}</Text>) ||
                (warning && <Text style={styles.txtWarning}>{warning}</Text>))}
    </View>);
};

/*const submit = values => {
    alert(JSON.stringify(values))
}*/

const UserComponent = props => {
    const { handleSubmit, submitting, reset } = props;
    console.log(`submitting = ${submitting}`);
    return (
        <View style={{ flex: 1, flexDirection: 'column', margin: 20, justifyContent: 'flex-start', }}>

            <Field name="name" keyboardType="default" label="Name: " requiredMarker="*" placeholder="FirstName LastName NikeName" component={renderField} 
                validate={[required, maxLength40]}
            />
            <Field name="email" keyboardType="email-address" label="Email: " requiredMarker="*" placeholder="Enter email" component={renderField} 
                validate={isValidEmail}
                warn={isYahooMail}
            />
            <Field name="phoneNumber" keyboardType="numeric" label="Contact Number: " requiredMarker="*" placeholder="FirstName LastName NikeName" component={renderField} 
                validate={[required, maxLength40]}
            />
            <Field name="age" keyboardType="numeric" label="Age: " placeholder="Enter age" component={renderField} 
                validate={[required, number, minValue18]}
                warn={over70YearsOld}
            />
            <TouchableOpacity onPress={handleSubmit(submit)} style={{ margin: 10, alignItems: 'center' }} disabled={submitting}>
                <Text style={{
                    backgroundColor: 'steelblue', color: 'white', fontSize: 16,
                    height: 37, width: 200, textAlign: 'center', padding: 10
                }}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const UserCreateForm = reduxForm({
    form: USER_CREATE_FORM // a unique identifier for this form
})(UserComponent);

export default UserCreateForm;