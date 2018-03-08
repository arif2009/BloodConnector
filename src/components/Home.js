import React, { Component } from 'react';
import { Text, ListView, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { 
	Container, Header, Title, Content, Footer, 
	FooterTab, Button, Left, Right, Body, Icon, Spinner 
} from 'native-base';
import We from '../utills/we';
import { loadBloodGroups } from '../actions';
import ListItem from './ListItem';
import { CardSection } from './common';
import { H1, H2, H3, Badge } from 'native-base';
var styles = require('./styles');

class Home extends Component {

	componentWillMount(){
		this.props.loadBloodGroups();

		if(this.props.bloodInfo){
			this.createDataSource(this.props.bloodInfo.groups);
		}
		
	}

	componentWillReceiveProps(nextProps) {
		// nextProps are the next set of props that this component
		// will be rendered with
		// this.props is still the old set of props
		if(nextProps.bloodInfo){
			this.createDataSource(nextProps.bloodInfo.groups);
		}
	  }

	createDataSource(bloodGroups) {
		const ds = new ListView.DataSource({
		  rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.dataSource = ds.cloneWithRows(bloodGroups);
	}

	renderGroups() {
		if(this.props.loading){
			return <Spinner color='blue' />
		}

		if(this.props.loaded){
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
			<CardSection style={{justifyContent: 'space-around', paddingTop: 10, paddingBottom: 10, backgroundColor:'#fff', borderColor: '#ffcccc'}}>
				<H2> NUMBER OF DONOR : 24</H2>
			</CardSection>
		);
	}

	render() {
		return (
			<Container style={styles.bgColor}>
				<StatusBar backgroundColor="#e60000" barStyle="light-content" />
				<Content>
					{this.renderGroups()}
				</Content>

				<Footer>
					<FooterTab style={styles.footerBg}>
						<Button full>
							<Text>© {We.currentYear} - BloodConnector {We.version}</Text>
						</Button>
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