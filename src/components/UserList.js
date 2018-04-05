import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Text, StyleSheet, View, ListView, 
    TextInput, ActivityIndicator, Alert, AsyncStorage 
} from 'react-native';
import { userFetch } from '../actions'
import We from '../utills/we';
var styles = require('./styles');

class UserList extends Component {

    constructor(props) {
        super(props);

        const { token } = this.props;
        this.props.userFetch({token});
        
        /*AsyncStorage.getItem('@auth:userData', (error, result) => {
            var hasObj = !!result;
            var userInfo = JSON.parse(result);
            console.log("userInfo",userInfo);
            if(hasObj){
                //this.props.userFetch()
            }
        });*/
    }

    renderList() {
		if(this.props.loading){
			return <Spinner color='blue' />
        }
        
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

    render(){
        return (
			<Container style={styles.bgColor}>
				<StatusBar backgroundColor="#e60000" barStyle="light-content" />
				<Content>
					{this.renderList()}
				</Content>

				<Footer>
					<FooterTab style={styles.footerBg}>
						<Text style={styles.selfAlignCenter}>© 2017-{We.twoLetterYear} - BloodConnector {We.version}</Text>
					</FooterTab>
				</Footer>
			</Container>
		);
    }
}

const mapStateToProps = ({ action }) => {
	const { error, loading, userList } = action;

	return { error, loading, userList };
};

export default connect(mapStateToProps, { userFetch })(UserList);