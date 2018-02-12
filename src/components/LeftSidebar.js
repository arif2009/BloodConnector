import React, { Component } from 'react';
import { Text, View} from 'react-native';
import { Content } from 'native-base';

class LeftSidebar extends Component {
    render(){
        return(
            <Content style={{backgroundColor:'#ffffff'}}>
                <Text>Left Sidebar</Text>
            </Content>
        );
    }
}

export default LeftSidebar;