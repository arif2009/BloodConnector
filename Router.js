import React, { Component } from 'react';
import {
    View, Text, Image, TouchableOpacity, 
    DrawerLayoutAndroid, AsyncStorage
} from 'react-native';
import { Drawer } from 'native-base';
import { Scene, Stack, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Home from './src/components/Home';
import LoginForm from './src/components/LoginForm';
import UserList from './src/components/UserList';
import UserCreate from './src/components/UserCreate';
import SideMenu from './src/components/SideMenu';
var styles = require('./src/components/styles');

class RouterComponent extends Component {
    render(){

        return(
        <Router navigationBarStyle={styles.nabBg} titleStyle={styles.txtColor}>
            <Scene overlay>
                <Scene key="lightbox" lightbox initial>
                    <Scene key="modal" modal hideNavBar>
                        <Scene key="drawer" drawer contentComponent={SideMenu}
                            drawerImage={require('./src/images/hamburger-48.png')}>
                            <Scene key="main">
                                <Scene 
                                    key="home" 
                                    component={Home} 
                                    title="Blood Connector"
                                    rightTitle="Join"
                                    onRight={() => Actions.userCreate()}
                                    rightButtonTextStyle = {[styles.txtBolder, styles.txtColor]} 
                                    titleStyle={styles.sceneTitle} 
                                    initial
                                />

                                <Scene 
                                    onRight={() => Actions.userCreate()}
                                    rightTitle="Join"
                                    key="userList" 
                                    component={UserList} 
                                    title="NUMBER OF DONOR : XX" 
                                    titleStyle={styles.sceneTitle}
                                />

                                <Scene 
                                    key="login"
                                    component={LoginForm} 
                                    title="Please Login" 
                                    titleStyle={styles.sceneTitle} 
                                />

                                <Scene 
                                    key="userCreate"
                                    component={UserCreate} 
                                    title="Create User" 
                                    titleStyle={styles.sceneTitle} 
                                />
                            </Scene>
                        </Scene>
                    </Scene>
                </Scene>
            </Scene>
        </Router>
        );
    }
}

const mapStateToProps = ({ auth }) => {
	const { isLogedIn } = auth;

	return { isLogedIn };
};

export default connect(mapStateToProps)(RouterComponent);