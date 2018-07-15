import React, { Component } from 'react';
import { ListView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Fab, Icon, Spinner, H2, Button } from 'native-base';
import Share from 'react-native-share';
import { loadBloodGroups } from '../actions';
import ListItem from './ListItem';
import { CardSection } from './common';
import { appLink } from '../utills/we';
import { bgColor, bgFb, bgSoftRed, bgTwitter, bgWhatsApp, homeTitle } from './styles';

class Home extends Component {
	constructor(props){
		super(props);
		this.props.loadBloodGroups();
		
		this.state = {activeShare: false}
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

	render() {
		let shareOptions = {
			title: "Blood Connector",
			message: "Its an awesome app for blood donor's and receiver's",
			url: appLink,
			subject: "Awesome app for blood donor's and receiver's" //  for email
		  };
		  
		return (
			<Container style={bgColor}>
				<StatusBar backgroundColor="#324291" barStyle="light-content" />
				<Content>
					{this.renderGroups()}
				</Content>

				<Fab
					active={this.state.activeShare}
					direction="right"
					containerStyle={{ }}
					style={bgSoftRed}
					position="bottomLeft"
					onPress={() => this.setState({ activeShare: !this.state.activeShare })}>
					<Icon name="share" />

					<Button style={bgWhatsApp} onPress={()=>{
						this.setState({activeShare: !this.state.activeShare});
						setTimeout(() => {
							Share.shareSingle(Object.assign(shareOptions, {
							"social": "whatsapp"
							}));
						},300);
						}}>
						<Icon name="logo-whatsapp" />
					</Button>
					<Button style={bgFb} onPress={()=>{
						this.setState({activeShare: !this.state.activeShare});
						setTimeout(() => {
							Share.shareSingle(Object.assign(shareOptions, {
							"social": "facebook"
							}));
						},300);}}>
						<Icon name="logo-facebook" />
					</Button>
					<Button style={bgSoftRed} onPress={()=>{
						this.setState({activeShare: !this.state.activeShare});
						setTimeout(() => {
							Share.shareSingle(Object.assign(shareOptions, {
							"social": "email"
							}));
						},300);
						}}>
						<Icon name="mail" />
					</Button>
					<Button style={bgTwitter} onPress={()=>{
						this.setState({activeShare: !this.state.activeShare});
						setTimeout(() => {
							Share.shareSingle(Object.assign(shareOptions, {
								"social": "twitter"
							}));
						},300);
						}}>
						<Icon type="FontAwesome" name="twitter" />
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