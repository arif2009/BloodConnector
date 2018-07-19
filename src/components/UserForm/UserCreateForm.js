import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { View, Text, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';
import { Picker, Item, Input, CheckBox, ListItem, Spinner, Icon } from 'native-base';
import Modal from 'react-native-modalbox';
import { Col, Grid } from "react-native-easy-grid";
import { USER_CREATE_FORM } from '../../actions/types';
import submit from './submit';
import { 
    required, in1To8, is0Or1, number, maxLength12, maxLength40, minValue6, isValidEmail, confirmValidators, 
    acceptTerms, isYahooMail
} from '../forms/validations';
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

const renderPicker = ({ iconType, iconName, requiredMarker, meta: { touched, error, warning }, input: { onChange, value, ...inputProps }, children, ...pickerProps }) => {
    return (
        <View>
            <View style={[pickerStyle, mbSm, {borderColor: touched && !!error ?'#DD5144':'#d6d7da'}]}>
                <Grid>
                    <Col size={10} style={drpIconLeft}>
                        <Icon style={{color: touched && !!error ?'#DD5144':'#000'}} type={iconType} name={iconName} />
                    </Col>
                    <Col size={touched && !!error? 80:90}>
                        <Picker selectedValue={value} onValueChange={value => requestAnimationFrame(() => { onChange(value); })} {...inputProps} {...pickerProps} >
                            {children}
                        </Picker>
                    </Col>
                    {touched && !!error && <Col size={10} style={drpIconRight}>
                        <Icon style={[txtDanger, font24]} name='close-circle' />
                    </Col>}
                </Grid>
            </View>
            {touched && ((!!error && <Text style={[txtDanger, selfAlignCenter]}>{error}</Text>))}
        </View>
    );
};

const formatLoanTerm = value => value + '';
const parseLoanTerm = value => parseInt(value);

class UserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {acceptTAndC: false};
    }
      
    render() {
        const { handleSubmit, submitting, reset } = this.props;
        //console.log(submitting);
        return (
            <View style={{ flex: 1, flexDirection: 'column', padding: 20, justifyContent: 'flex-start' }}>

                <Field name="Name" iconType="SimpleLineIcons" iconName="user" secureTextEntry="false" keyboardType="default" placeholder="FirstName LastName NikeName" component={renderField}
                    validate={[required, maxLength40]}
                />
                <Field name="BloodGiven" iconType="FontAwesome" iconName="eyedropper" secureTextEntry="false" keyboardType="numeric" placeholder="Number of times given blood" component={renderField}
                    validate={[number]}
                />
                <Field name="Email" iconType="FontAwesome" iconName="envelope-o" secureTextEntry="false" keyboardType="email-address" placeholder="Your email" component={renderField}
                    validate={[required, isValidEmail]}
                    warn={isYahooMail}
                />
                <Field name="PhoneNumber" iconType="SimpleLineIcons" iconName="phone" secureTextEntry="false" keyboardType="phone-pad" placeholder="Your contact number" component={renderField}
                    validate={[required]}
                />
                <Field name="BloodGroupId" iconType="SimpleLineIcons" iconName="drop" mode="dropdown" component={renderPicker}
                    iosHeader="--Select Blood Group--" format={formatLoanTerm} parse={parseLoanTerm}
                    validate={[in1To8]}>
                    <Item label="--SELECT BLOOD GROUP--" />
                    <Item label="O-" value="1" />
                    <Item label="O+" value="2" />
                    <Item label="A-" value="3" />
                    <Item label="A+" value="4" />
                    <Item label="B-" value="5" />
                    <Item label="B+" value="6" />
                    <Item label="AB-" value="7" />
                    <Item label="AB+" value="8" />
                </Field>
                <Field name="Gender" iconType="FontAwesome" iconName="venus-mars" mode="dropdown" component={renderPicker}
                    iosHeader="--SELECT GENDER--" format={formatLoanTerm} parse={parseLoanTerm}
                    validate={[is0Or1]}>
                    <Item label="--SELECT GENDER--" />
                    <Item label="Male" value="1" />
                    <Item label="Female" value="0" />
                </Field>
                <Field name="Password" iconType="MaterialIcons" iconName="vpn-key" secureTextEntry="true" keyboardType="default" placeholder="Password" component={renderField}
                    validate={[required, minValue6, maxLength12]}
                />
                <Field name="ConfirmPassword" iconType="Foundation" iconName="key" secureTextEntry="true" keyboardType="default" placeholder="Confirm Password" component={renderField}
                    validate={[required, confirmValidators]}
                />

                <Field name="AcceptTAndC" component={(props) => {
                    return (
                        <View>
                            <ListItem>
                                <CheckBox {...props.input} checked={props.input.value ? true : false} onPress={() => {
                                    const val = !props.input.value;
                                    props.input.onChange(val);
                                    this.setState({ acceptTAndC: val });
                                }} />
                                
                                <Text> I accept <Text style={txtBlue} onPress={() => this.refs.termsModal.open()}>this terms and conditions</Text></Text>
                            </ListItem>
                            {props.meta.error && <Text style={[txtDanger, mb, mlLg]}>{props.meta.error}</Text>}
                        </View>
                    )
                }} validate={[acceptTerms]}/>

                <TouchableOpacity disabled={submitting}
                    onPress={this.state.acceptTAndC ? handleSubmit(submit) : null}
                    style={[button, { backgroundColor: this.state.acceptTAndC ? '#337ab7' : '#808080' }]}>
                    <Text style={[txtColor, txtMedium]}>Submit {' '}</Text>
                    {submitting && <Spinner size={25} color="#fff" />}
                </TouchableOpacity>

                <Modal style={[modal, tAndCmodal, p]} position={"center"} 
                    ref={"termsModal"} entry='top' coverScreen={true}>
                    <Text style={txtMedium}>Terms and Conditions</Text>
                    <Text>All the registered user can see your <Text style={txtBold}>Contact Number</Text> and <Text style={txtBold}>E-mail</Text>. So they can call you or send email for blood.</Text>
                    <Button style={mt} onPress={() =>{this.refs.termsModal.close()}}>Ok</Button>
                </Modal>
            </View>
        );
    }
}

const UserCreateForm = reduxForm({
    form: USER_CREATE_FORM // a unique identifier for this form
})(UserComponent);

export default UserCreateForm;