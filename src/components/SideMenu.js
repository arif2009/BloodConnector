import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ViewPropTypes, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import { H1, H2, Icon } from 'native-base';
import axios from 'axios';
import { apiOrigin } from '../utills/we';
import { CardSection } from './common';
import { 
  drawerContainer, drawerHeader, txtBolder, selfAlignCenter,txtBlue,drawerBtnContainer,
  drawerBtnTxt,txtColor,drawerIcon 
} from './styles';

const contextTypes = {
  drawer: PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string,
};

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      isLogedIn: false,
      fullName: "",
      bloodGroup: "",
      similarBlood: 0,
      accessTolen: ""
    };
    this.setProperState();
    console.log("= Sidebar loaded =")
  }

  setProperState() {
    AsyncStorage.getItem('@auth:userData', (error, result) => {
      var hasObj = !!result;
      var userInfo = JSON.parse(result);
      this.setState({ 
        isLogedIn: hasObj,
        fullName: hasObj? userInfo.fullName : this.state.fullName,
        bloodGroup: hasObj? userInfo.bloodGroup : this.state.bloodGroup,
        similarBlood: hasObj? userInfo.similarBlood: this.state.similarBlood,
        accessTolen: hasObj? userInfo.access_token: this.state.accessTolen
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
      Actions.home({rightTitle: <Icon style={txtColor} type="Entypo" name="add-user" />});

      const url = `${apiOrigin}api/Account/Logout`;
      axios.post(url);
    });
  }

  render() {
    return (
      <View style={[drawerContainer, this.props.sceneStyle]}>

        {!this.state.isLogedIn && <CardSection style={{padding: 25}}>
          <Button onPress={() => { Actions.userCreate(); }}>
            Please SignUp to join with us !
          </Button>
        </CardSection>}

        {this.state.isLogedIn && <View style={drawerHeader}>
          <Text style={[txtBolder,selfAlignCenter]}>{this.state.fullName}</Text>
          <H1 style={[selfAlignCenter, txtBlue]}>{this.state.bloodGroup}</H1>
          <Text style={[txtBolder,selfAlignCenter]}>Similar Blood : <H2 style={txtBlue}>{this.state.similarBlood}</H2></Text>
        </View>}
        
        <CardSection style={drawerBtnContainer}>
          <Button style={drawerBtnTxt} onPress={() => { Actions.home({ rightTitle: this.state.isLogedIn ? '': <Icon style={txtColor} type="Entypo" name="add-user" /> }); }}>
            <Icon style={drawerIcon} type="FontAwesome" name="home" /> Home Page
          </Button>
        </CardSection>

        {!this.state.isLogedIn && <CardSection style={drawerBtnContainer}>
          <Button style={drawerBtnTxt} onPress={() => { Actions.userCreate(); }}>
            <Icon style={drawerIcon} type="FontAwesome" name="user-plus" /> Sign Up
          </Button>
        </CardSection>}

        {this.state.isLogedIn && <CardSection style={drawerBtnContainer}>
          <Button style={drawerBtnTxt} onPress={() => { Actions.userList({token: this.state.accessTolen}); }}>
            <Icon style={drawerIcon} type="FontAwesome" name="odnoklassniki" /> Our Donors
          </Button>
        </CardSection>}
        
        {!this.state.isLogedIn && <CardSection style={drawerBtnContainer}>
          <Button style={drawerBtnTxt} onPress={() => { Actions.login(); }}>
            <Icon style={drawerIcon} type="FontAwesome" name="sign-in" /> Log In
          </Button>
        </CardSection>}

        {this.state.isLogedIn && <CardSection style={drawerBtnContainer}>
          <Button style={drawerBtnTxt} onPress={() => { this.logout(); }}>
            <Icon style={drawerIcon} type="FontAwesome" name="sign-out" /> Log Out
          </Button>
        </CardSection>}

        <CardSection style={[drawerBtnContainer, {borderBottomWidth: 0}]}>
          <Button style={drawerBtnTxt} onPress={() => { Actions.help(); }}>
          <Icon style={drawerIcon} type="FontAwesome" name="question" /> Help
          </Button>
        </CardSection>
      </View>
    );
  }
}

SideMenu.contextTypes = contextTypes;
SideMenu.propTypes = propTypes;

export default SideMenu;