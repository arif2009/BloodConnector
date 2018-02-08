import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { userUpdate, userCreate } from '../actions';
import { Card, CardSection, Button, Input } from './common';
//import userForm from './EmployeeForm';

class UserCreate extends Component {
  onButtonPress() {
    const { name, phone, shift } = this.props;

    this.props.userCreate({ name, phone, shift: shift || 'Male' });
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="Arifur Rahman"
            value={this.props.name}
            onChangeText={value => this.props.userUpdate({prop: 'name', value})}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Phone"
            placeholder="+880XXXXXXXXXX"
            value={this.props.phone}
            onChangeText={value => this.props.userUpdate({prop: 'phone', value})}
          />
        </CardSection>

        <CardSection>
          <Text style={styles.PickerTextStyle}>Gender :</Text>
          <Picker
            style={{flex:1}}
            selectedValue={this.props.sex}
            onValueChange={value => this.props.userUpdate({prop: 'sex', value})}>
            <Picker.Item label="Male" value="1" />
            <Picker.Item label="Female" value="0" />
          </Picker>
        </CardSection>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  PickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const mapStateToProps = (state) => {
  const { name, phone, sex } = state.userForm;

  return { name, phone, sex };
};

export default connect(mapStateToProps, {
  userUpdate, userCreate
})(UserCreate);
