import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Footer, FooterTab, Icon } from 'native-base';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import UserCreateForm from './UserForm/UserCreateForm';
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
						<View style={{justifyContent:'center'}}>
							<Text style={styles.selfAlignCenter}>© 2017-{We.twoLetterYear} - BloodConnector {We.version}</Text>
							<Text>Website <Text style={styles.txtBlue} onPress={() => Linking.openURL('http://www.bloodconnector.org')}>www.bloodconnector.org</Text></Text>
						</View>
					</FooterTab>
				</Footer>
			</Container>
    );
  }
}