import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { 
    Text, StyleSheet, View, ListView, TextInput, 
    ActivityIndicator, Alert, AsyncStorage, StatusBar
} from 'react-native';
import { 
	Container, Content, Footer, FooterTab, Spinner 
} from 'native-base';
import { userFetch } from '../actions'
import We from '../utills/we';
var styles = require('./styles');

class UserList extends Component {

    constructor(props) {
        super(props);

        const { token } = this.props;
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.props.userFetch({token});
    }

    componentWillReceiveProps(nextProps){
        if(!!nextProps.listOfUser){
            console.log("nextProps", nextProps);
        }
    }

    renderList() {
		if(this.props.loading){
			return <Spinner color='blue' />
        }
        else if(!!this.props.error){
            return(
                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>
            );
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
	const { error, loading, listOfUser } = action;
	return { error, loading, listOfUser };
};

export default connect(mapStateToProps, { userFetch })(UserList);