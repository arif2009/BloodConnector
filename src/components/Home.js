import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { loadBloodGroups } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class Home extends Component {

	constructor(props){
		super(props);
		
		this.props.loadBloodGroups();
	}

	renderGroups() {
		if(this.props.loading){
			return <Spinner size="large" />
		}
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

const mapStateToProps = ({ blood }) => {
	const { error, loading } = blood;

	return { error, loading };
};

export default connect(mapStateToProps, { loadBloodGroups })(Home);