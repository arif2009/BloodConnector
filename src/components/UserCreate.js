import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import UserCreateForm from './UserForm/UserCreateForm';
import { bgColor, bgWhite } from './styles';

export default class UserCreate extends Component {
  render() {
    return (
			<Container style={bgWhite}>
				<Content>
          <UserCreateForm />
				</Content>
			</Container>
    );
  }
}