import React, { Component } from 'react';
import {View, Text, Image, TouchableOpacity, DrawerLayoutAndroid} from 'react-native';
import { Drawer } from 'native-base';
import { Scene, Stack, Router, Actions } from 'react-native-router-flux';
import Home from './src/components/Home';
import LoginForm from './src/components/LoginForm';
import UserList from './src/components/UserList';
import UserCreate from './src/components/UserCreate';
import LeftSidebar from './src/components/LeftSidebar';

export default class RouterComponent extends Component {

    render(){

        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
              <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
            </View>
          );

        return(
            <DrawerLayoutAndroid
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
                <Router>
                    <Scene key="root">
                        <Scene key="home" hideNavBar={false} component={Home} title="Blood Connector" titleStyle={{ alignSelf: 'center' }} initial />
                    </Scene>
                </Router>

            </DrawerLayoutAndroid>
    /*         <Router>
                <Scene key="root">
    
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
            </Router> */
        );
    }
}