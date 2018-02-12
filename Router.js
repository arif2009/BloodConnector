import React, { Component } from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { Drawer } from 'native-base';
import { Scene, Stack, Router, Actions } from 'react-native-router-flux';
import Home from './src/components/Home';
import LoginForm from './src/components/LoginForm';
import UserList from './src/components/UserList';
import UserCreate from './src/components/UserCreate';
import LeftSidebar from './src/components/LeftSidebar';

export default class RouterComponent extends Component {
    closeDrawer() {
        this.drawer._root.close()
      };
      openDrawer() {
        this.drawer._root.open()
      };

    render(){
        return(
            <Drawer
                type="static"
                content={<LeftSidebar navigator={this._navigator} />}
                onClose={() => this.closeDrawer()}
                ref={ (ref) => this.drawer = ref}>
                <Router>
                    <Scene key="root">
                        <Scene key="home" hideNavBar={false} component={Home} title="Blood Connector" titleStyle={{ alignSelf: 'center' }} initial />
                    </Scene>
                </Router>
            </Drawer>
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