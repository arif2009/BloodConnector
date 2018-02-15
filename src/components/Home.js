import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
//import { emailChanged, passwordChanged, loginUser } from '../actions';
import { loadBloodGroups } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class Home extends Component {

	renderGroups() {
		if(this.props.loading){
			return <Spinner size="large" />
		}

        //this.props.loginUser({email, password});
        this.props.loadBloodGroups();
	}

	render() {
		return (
			<Card>
				<Text style={styles.errorTextStyle}>
					{ this.props.error }
				</Text>

				<CardSection>
					{this.renderGroups()}
				</CardSection>
			</Card>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
};

const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading } = auth;

	return { email, password, error, loading };
};

export default connect(mapStateToProps, { loadBloodGroups })(Home);