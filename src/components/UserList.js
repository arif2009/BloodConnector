import React, {Component} from 'react';
import { Text, StyleSheet, View, ListView, 
    TextInput, ActivityIndicator, Alert, AsyncStorage } from 'react-native';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            bearerToken: '',
            text: ''
        }

        AsyncStorage.getItem('@auth:userData', (error, result) => {
            var hasObj = !!result;
            var userInfo = JSON.parse(result);
            this.setState({
                bearerToken: hasObj? 'bearer ' + userInfo.access_token : ''
            });
        });

        this.arrayholder = [] ;
    }

    render(){
        return(
            <View>
                <Text>User List</Text>
                <Text>User List</Text>
                <Text>User List</Text>
                <Text>User List</Text>
                <Text>User List</Text>
                <Text>User List</Text>
            </View>
        );
    }
}

export default UserList;