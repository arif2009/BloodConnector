import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Footer, FooterTab, Icon } from 'native-base';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import UserCreateForm from './common/UserCreateForm';
import { userUpdate, userCreate } from '../actions';
import We from '../utills/we';
var styles = require('./styles');

class UserCreate extends Component {

  render() {
    const handleSubmit = values => {    
      alert(`submitting form with values123 = ${values}`);
    };
    return (
			<Container style={styles.bgColor}>
				<Content>
          <UserCreateForm handleSubmit={handleSubmit}/>
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
export default UserCreate;