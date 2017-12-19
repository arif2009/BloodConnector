import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	render() {
		return (
			<Card>
				<CardSection>
					<Input
						label="Email"
						placeholder="email@gmail.com"
						onChangeText={this.onEmailChange.bind(this)}
						value={this.props.email}
					/>
				</CardSection>

				<CardSection>
					<Input
						secureTextEntry
						label="Password"
						placeholder="password"
					/>
				</CardSection>

				<CardSection>
					<Button>
                        Login
                    </Button>
				</CardSection>
			</Card>
		);
	}
}

export default connect(null, {
	emailChanged
})(LoginForm);