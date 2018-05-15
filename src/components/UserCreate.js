import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Footer, FooterTab, Icon } from 'native-base';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import UserCreateForm from './common/UserCreateForm';
import { userUpdate, userCreate } from '../actions';
import We from '../utills/we';
var styles = require('./styles');

export default class UserCreate extends Component {
  render() {
    return (
			<Container style={styles.bgColor}>
				<Content>
          <UserCreateForm />
				</Content>
				<Footer>
					<FooterTab style={styles.footerBg}>
					  <Text style={styles.selfAlignCenter}>© 2017-{We.twoLetterYear} - BloodConnector {We.version}</Text>
					</FooterTab>
				</Footer>
			</Container>
    );
  }
}

/*const mapStateToProps = (state) => {
  const { name, phone, sex } = state.userForm;

  return { name, phone, sex };
};

export default connect(mapStateToProps, {
  userUpdate, userCreate
})(UserCreate);
*/