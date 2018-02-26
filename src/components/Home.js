import React, { Component } from 'react';
import { Text, ListView, View } from 'react-native';
import { connect } from 'react-redux';
import { 
	Container, Header, Title, Content, Footer, 
	FooterTab, Button, Left, Right, Body, Icon, Spinner 
} from 'native-base';
import We from '../utills/we';
import { loadBloodGroups } from '../actions';
import ListItem from './ListItem';

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
			return <Spinner />
		}

		if(this.props.loaded){
			return <ListView enableEmptySections
				dataSource={this.dataSource}
				renderRow={this.renderRow} />
		}
	}

	renderRow(group) {
		return <ListItem group={group} />;
	}

	render() {
		return (
			<Container>
				<Content>
				<Text>
					This is Content Section
				</Text>
				</Content>

				<Footer>
				<FooterTab>
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