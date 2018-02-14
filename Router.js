import React, { Component } from 'react';
import {View, Text, Image, TouchableOpacity, DrawerLayoutAndroid} from 'react-native';
import { Drawer } from 'native-base';
import { Scene, Stack, Router, Actions } from 'react-native-router-flux';
import Home from './src/components/Home';
import LoginForm from './src/components/LoginForm';
import UserList from './src/components/UserList';
import UserCreate from './src/components/UserCreate';
import SideMenu from './src/components/SideMenu';

export default class RouterComponent extends Component {

    render(){

        return(
            /*
             <Router>
                <Scene key="root" drawer={true}>
    
                    <Scene key="auth" hideNavBar={true}>
                        <Scene key="home" hideNavBar={false} component={Home} title="Blood Connector" titleStyle={{ alignSelf: 'center' }} initial />
                        <Scene key="login" hideNavBar={false} component={LoginForm} title="Please Login" titleStyle={{ alignSelf: 'center' }} />
                    </Scene>
    
                    <Scene key="main" hideNavBar={true}>
                        <Scene 
                            onRight={() => Actions.userCreate()}
                            hideNavBar={false}
                            rightTitle="Join"
                            key="userList" 
                            component={UserList} 
                            title="NUMBER OF DONOR : XX" 
                            titleStyle={{ alignSelf: 'center' }} initial />
    
                        <Scene key="userCreate" hideNavBar={false} component={UserCreate} title="Create User" titleStyle={{ alignSelf: 'center' }} />
                    </Scene>
                </Scene>
            </Router>*/

            <Router>
            <Scene overlay>
                <Scene key="lightbox" lightbox leftButtonTextStyle={{ color: 'green' }} backButtonTextStyle={{ color: 'red' }} initial>
                    <Scene key="modal" modal hideNavBar>
                        <Scene key="drawer" drawer contentComponent={SideMenu}>
                            <Scene key="main">
                                <Scene 
                                    key="home" 
                                    component={Home} 
                                    title="Blood Connector" 
                                    titleStyle={{ alignSelf: 'center' }} 
                                    initial
                                />

                                <Scene 
                                    onRight={() => Actions.userCreate()}
                                    rightTitle="Join"
                                    key="userList" 
                                    component={UserList} 
                                    title="NUMBER OF DONOR : XX" 
                                    titleStyle={{ alignSelf: 'center' }}
                                />

                                <Scene 
                                    key="userCreate"
                                    component={UserCreate} 
                                    title="Create User" 
                                    titleStyle={{ alignSelf: 'center' }} 
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