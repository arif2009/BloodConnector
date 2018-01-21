import React from 'react';
import { Scene, Stack, Router } from 'react-native-router-flux';
import LoginForm from './src/components/LoginForm';
import UserList from './src/components/UserList';

const RouterComponent = () => {
    return(
        <Router>
            <Scene key="root">
                <Scene key="login" component={LoginForm} title="Please Login" titleStyle={{ alignSelf: 'center' }} initial />

                    <Scene 
                        onRight={() => console.log('right!!!')}
                        rightTitle="Add"
                        key="userList" 
                        component={UserList} 
                        title="NUMBER OF DONOR : XX" 
                        titleStyle={{ alignSelf: 'center' }} />
            </Scene>
        </Router>
    );
};

export default RouterComponent;

