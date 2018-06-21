import React, { Component } from 'react';
import { Text, ListView, View, StatusBar, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Footer, FooterTab, Spinner, H2 } from 'native-base';
import { loadBloodGroups } from '../actions';
import ListItem from './ListItem';
import { CardSection } from './common';
import We from '../utills/we';
import { bgColor, footerBg, selfAlignCenter, txtBlue, homeTitle } from './styles';

class Home extends Component {
	constructor(props){
		super(props);
		this.props.loadBloodGroups();
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
		return (
			<Container style={bgColor}>
				<StatusBar backgroundColor="#324291" barStyle="light-content" />
				<Content>
					{this.renderGroups()}
				</Content>

				<Footer>
					<FooterTab style={footerBg}>
					<View style={{justifyContent:'center'}}>
						<Text style={selfAlignCenter}>© 2017-{We.twoLetterYear} - BloodConnector {We.version}</Text>
						<Text>Website <Text style={txtBlue} onPress={() => Linking.openURL('http://www.bloodconnector.org')}>www.bloodconnector.org</Text></Text>
					</View>
					</FooterTab>
				</Footer>
			</Container>
		);
	}
}

const mapStateToProps = ({ blood }) => {
	const { error, loading, loaded, bloodInfo } = blood;
	return { error, loading, loaded, bloodInfo };
};

export default connect(mapStateToProps, { loadBloodGroups })(Home);