import React, { Component } from 'react';
import { Text, ListView, View, StatusBar, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Fab, Icon, Spinner, H2, Button } from 'native-base';
import { loadBloodGroups } from '../actions';
import ListItem from './ListItem';
import { CardSection } from './common';
import { bgColor, bgFb, bgSoftRed, bgSoftBlue, bgWhatsApp, homeTitle } from './styles';

class Home extends Component {
	constructor(props){
		super(props);
		this.props.loadBloodGroups();
		
		this.state = {active: false}
	}

	createDataSource(bloodGroups, totalUser) {
		const ds = new ListView.DataSource({
		  rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.dataSource = ds.cloneWithRows(bloodGroups);
		this.dataSource.totalNumberOfUser = totalUser;
	}

	renderGroups() {
		if(this.props.loading){
			return <Spinner color='blue' />
		}

		if(this.props.loaded){
			this.createDataSource(this.props.bloodInfo.groups, this.props.bloodInfo.totalNumberOfUser);
			return <ListView enableEmptySections
				dataSource={this.dataSource}
				renderRow={this.renderRow}
				renderHeader={this.renderHeader} />
		}
	}

	renderRow(group) {
		return <ListItem group={group} />;
	}

	renderHeader() {
		return (
			<CardSection style={homeTitle}>
				<H2> NUMBER OF DONOR : { this.dataSource.totalNumberOfUser }</H2>
			</CardSection>
		);
	}

	shareToWhatsApp = () => {
		this.setState({active: !this.state.active})
		const text = 'https://play.google.com/store/apps/details?id=com.bloodconnector';
		const url = `whatsapp://send?text=${text}`;
		Linking.canOpenURL(url).then(supported => {
			if (!supported) {
			  alert('It seems WhatsApp is not installed.');
			} else {
			  return Linking.openURL(url);
			}
		  }).catch(err => alert('An error occurred', err));
	}

	render() {
		return (
			<Container style={bgColor}>
				<StatusBar backgroundColor="#324291" barStyle="light-content" />
				<Content>
					{this.renderGroups()}
				</Content>

				<Fab
					active={this.state.active}
					direction="right"
					containerStyle={{ }}
					style={bgSoftBlue}
					position="bottomLeft"
					onPress={() => this.setState({ active: !this.state.active })}>
					<Icon name="share" />

					<Button onPress={()=>{this.shareToWhatsApp()}} style={bgWhatsApp}>
						<Icon name="logo-whatsapp" />
					</Button>
					<Button style={bgFb}>
						<Icon name="logo-facebook" />
					</Button>
					<Button disabled style={bgSoftRed}>
						<Icon name="mail" />
					</Button>
				</Fab>
			</Container>
		);
	}
}

const mapStateToProps = ({ blood }) => {
	const { error, loading, loaded, bloodInfo } = blood;
	return { error, loading, loaded, bloodInfo };
};

export default connect(mapStateToProps, { loadBloodGroups })(Home);