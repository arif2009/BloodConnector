import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { Scene, Stack, Router, Actions } from 'react-native-router-flux';
import LoginForm from './src/components/LoginForm';
import UserList from './src/components/UserList';
import UserCreate from './src/components/UserCreate';

const RouterComponent = () => {
    return(
        <Router>
            <Scene key="root">

                <Scene key="auth" hideNavBar={true}>
                    <Scene key="login" hideNavBar={false} component={LoginForm} title="Please Login" titleStyle={{ alignSelf: 'center' }} initial />
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
        </Router>
    );
};

export default RouterComponent;

