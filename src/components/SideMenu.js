import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import { H1, H2, H3, Badge } from 'native-base';
import FontAwesome, { Icons } from 'react-native-fontawesome';
//import RNRestart from 'react-native-restart';
import { CardSection } from './common';
var styles = require('./styles');

const contextTypes = {
  drawer: PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string,
};

class SideMenu extends Component {
  state = { 
    isLogedIn: false,
    fullName: "",
    bloodGroup: "",
    similarBlood: 0 
  };

  componentDidMount() {
    AsyncStorage.getItem('@auth:userData', (error, result) => {
      var hasObj = !!result;
      var userInfo = JSON.parse(result);
      //console.log("userInfo",userInfo);
      this.setState({ 
        isLogedIn: hasObj,
        fullName: hasObj? userInfo.userName : this.state.fullName
       });
    });
  }

  logout(){
    AsyncStorage.clear(()=>{
      this.setState({
        isLogedIn: false,
        fullName: "",
        bloodGroup: "",
        similarBlood: 0
      });
      Actions.home();
    });
  }

  render() {
    return (
      <View style={[styles.drawerContainer, this.props.sceneStyle]}>

        {!this.state.isLogedIn && <CardSection style={{padding: 25}}>
          <Button onPress={() => { Actions.userCreate(); }}>
            Please SignUp to join with us !
          </Button>
        </CardSection>}

        {this.state.isLogedIn && <View style={styles.drawerHeader}>
          <Text style={[styles.txtBolder,styles.selfAlignCenter]}>{this.state.fullName}</Text>
          <H1 style={[styles.selfAlignCenter, styles.txtBlue]}>{this.state.bloodGroup}</H1>
          <Text style={[styles.txtBolder,styles.selfAlignCenter]}>Similar Blood : <H2 style={styles.txtBlue}>{this.state.similarBlood}</H2></Text>
        </View>}
        
        <CardSection style={styles.drawerBtnContainer}>
          <Button style={styles.drawerBtnTxt} onPress={() => { Actions.home(); }}>
            <FontAwesome style={styles.drawerIcon}>{Icons.home}</FontAwesome> Home Page
          </Button>
        </CardSection>

        {this.state.isLogedIn && <CardSection style={styles.drawerBtnContainer}>
          <Button style={styles.drawerBtnTxt} onPress={() => { Actions.userCreate(); }}>
            <FontAwesome style={styles.drawerIcon}>{Icons.signIn}</FontAwesome> Join With Us
          </Button>
        </CardSection>}

        {this.state.isLogedIn && <CardSection style={styles.drawerBtnContainer}>
          <Button style={styles.drawerBtnTxt} onPress={() => { Actions.drList(); }}>
            <FontAwesome style={styles.drawerIcon}>{Icons.odnoklassniki}</FontAwesome> Our Donors
          </Button>
        </CardSection>}
        
        {!this.state.isLogedIn && <CardSection style={styles.drawerBtnContainer}>
          <Button style={styles.drawerBtnTxt} onPress={() => { Actions.login(); }}>
            <FontAwesome style={styles.drawerIcon}>{Icons.signIn}</FontAwesome> Log In
          </Button>
        </CardSection>}

        {this.state.isLogedIn && <CardSection style={styles.drawerBtnContainer}>
          <Button style={styles.drawerBtnTxt} onPress={() => { this.logout(); }}>
            <FontAwesome style={styles.drawerIcon}>{Icons.signOut}</FontAwesome> Log Out
          </Button>
        </CardSection>}

        <CardSection style={[styles.drawerBtnContainer, {borderBottomWidth: 0}]}>
          <Button style={styles.drawerBtnTxt} onPress={() => { Actions.about(); }}>
            <FontAwesome style={styles.drawerIcon}>{Icons.infoCircle}</FontAwesome> About
          </Button>
        </CardSection>
      </View>
    );
  }
}

SideMenu.contextTypes = contextTypes;
SideMenu.propTypes = propTypes;

export default SideMenu;