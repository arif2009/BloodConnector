import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Home from './src/components/Home';
import LoginForm from './src/components/LoginForm';
import UserList from './src/components/UserList';
import UserCreate from './src/components/UserCreate';
import SideMenu from './src/components/SideMenu';
import Help from './src/components/Help';
import hamburger from './src/images/hamburger-48.png';
import { nabBg, txtBolder, txtColor, sceneTitle  } from './src/components/styles';

class RouterComponent extends Component {
    constructor(props){
        super(props);
        this.state = { key: 'in-router' }
    }
    render(){
        return(
        <Router key={this.state.key} navigationBarStyle={nabBg} titleStyle={txtColor}>
            <Scene overlay>
                <Scene key="lightbox" lightbox initial>
                    <Scene key="modal" modal hideNavBar>
                        <Scene key="drawer" type="overlay" drawer contentComponent={SideMenu}
                            drawerImage={hamburger}>
                            <Scene key="main">
                                <Scene 
                                    key="home"
                                    component={Home} 
                                    title="Blood Connector"
                                    rightTitle={''}
                                    onRight={() => Actions.userCreate()}
                                    rightButtonTextStyle = {[txtBolder, txtColor]} 
                                    titleStyle={sceneTitle} 
                                    initial
                                />

                                <Scene
                                    key="userList" 
                                    component={UserList} 
                                    title="Our donor's & receiver's" 
                                    titleStyle={sceneTitle}
                                />

                                <Scene 
                                    key="userCreate"
                                    component={UserCreate} 
                                    title="Create Account" 
                                    titleStyle={sceneTitle} 
                                />

                                <Scene 
                                    key="login"
                                    component={LoginForm} 
                                    title="Please Login" 
                                    titleStyle={sceneTitle} 
                                />

                                <Scene 
                                    key="help"
                                    component={Help} 
                                    title="Help" 
                                    titleStyle={sceneTitle} 
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
	const { key } = auth;
	return { key };
};

export default connect(mapStateToProps)(RouterComponent);