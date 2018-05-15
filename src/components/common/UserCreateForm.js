import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import submit from './submit';
//Validation
const required = value => value ? undefined : 'Required';
const maxLength15 = value => value && value.length > 15 ? `Must be 15 characters or less` : undefined;
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

const renderField = ({ label, keyboardType, placeholder, meta: { touched, error, warning }, input: { onChange, ...restInput }}) => {
    return (<View style={{ flexDirection: 'column', height: 70, alignItems: 'flex-start' }}>
        <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', width: 80 }}>{label}</Text>
            <TextInput style={{ borderColor: 'steelblue', borderWidth: 1, height: 37, width: 220, padding: 5 }}
                keyboardType={keyboardType} onChangeText={onChange} {...restInput} placeholder={placeholder} autoCapitalize='none'
            >
            </TextInput>
        </View>
        {touched && ((error && <Text style={{ color: 'red' }}>{error}</Text>) ||
                (warning && <Text style={{ color: 'orange' }}>{warning}</Text>))}
    </View>);
};

/*const submit = values => {
    alert(JSON.stringify(values))
}*/

const UserComponent = props => {
    const { handleSubmit, submitting, reset } = props;
    console.log(`submitting = ${submitting}`);
    return (
        <View style={{ flex: 1, flexDirection: 'column', margin: 40, justifyContent: 'flex-start', }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', width: 200, textAlign: 'center', margin: 10 }}>Redux-form example</Text>
            <Text>username: must be hoang, hoangnd, or ndhoang</Text>
            <Text>email: must be sunlight4d@gmail.com</Text>

            <Field name="username" keyboardType="default" label="Username: " placeholder="Enter name" component={renderField} 
                validate={[required, maxLength15]}
            />
            <Field name="email" keyboardType="email-address" label="Email: " placeholder="Enter email" component={renderField} 
                validate={isValidEmail}
                warn={isYahooMail}
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
            <TouchableOpacity onPress={reset} style={{ margin: 10, alignItems: 'center' }} disabled={submitting}>
                <Text style={{
                    backgroundColor: 'powderblue', color: 'black', fontSize: 16,
                    height: 37, width: 200, textAlign: 'center', padding: 10
                }}>Clear</Text>
            </TouchableOpacity>
        </View>
    );
}

const UserCreateForm = reduxForm({
    form: 'frmUser' // a unique identifier for this form
})(UserComponent);

export default UserCreateForm;