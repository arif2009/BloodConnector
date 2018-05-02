import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Footer, FooterTab, Icon } from 'native-base';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { userUpdate, userCreate } from '../actions';
import We from '../utills/we';
var styles = require('./styles');

class UserCreate extends Component {

  onButtonPress() {
    const { name, phone, sex } = this.props;

    this.props.userCreate({ name, phone, sex: sex || '1' });
  }
  render() {
    return (
			<Container style={styles.bgColor}>
				<Content>
          <Form>
            <Item style={[styles.itemStyle]}>
              <Icon type="FontAwesome" name='user' />
              <Input placeholder="Your Name" />
            </Item>
            <Item style={[styles.itemStyle]}>
              <Icon type="FontAwesome" name='envelope' />
              <Input placeholder="E-mail" />
            </Item>
            <Item style={[styles.itemStyle]}>
              <Icon type="FontAwesome" name='volume-control-phone' />
              <Input placeholder="Contact Number" />
            </Item>
            <Button
              containerStyle={[styles.btnBlock]}
              disabledContainerStyle={{backgroundColor: 'grey'}}
              style={{fontSize: 20, color: '#fff'}}>
              Create!
          </Button>
          </Form>
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

const mapStateToProps = (state) => {
  const { name, phone, sex } = state.userForm;

  return { name, phone, sex };
};

export default connect(mapStateToProps, {
  userUpdate, userCreate
})(UserCreate);
