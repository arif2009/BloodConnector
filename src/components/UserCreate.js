import React, { Component } from 'react';
import {Text} from 'react-native';
import { connect } from 'react-redux';
//import { employeeUpdate, employeeCreate } from '../actions';
//import { Card, CardSection, Button } from './common';
//import EmployeeForm from './EmployeeForm';

class UserCreate extends Component {
  /*onButtonPress() {
    const { name, phone, shift } = this.props;

    this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
  }
*/
  render() {
    return (
      <Text> User Reg Form</Text>
    );
  }
}
export default UserCreate;
/*const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};*/

/*export default connect(mapStateToProps, {
  employeeUpdate, employeeCreate
})(UserCreate);*/
