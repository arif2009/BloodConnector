import React from 'react';
import { Scene, Stack, Router } from 'react-native-router-flux';
import LoginForm from './src/components/LoginForm';
import UserList from './src/components/UserList';

const RouterComponent = () => {
    return(
        <Router>
            <Stack key="root">
                <Scene key="login" component={LoginForm} title="Please Login" />
                <Scene key="userList" component={UserList} title="NUMBER OF DONOR : XX" />
            </Stack>
        </Router>
    );
};

export default RouterComponent;

