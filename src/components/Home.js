import React, { Component } from 'react';
import { Text, ListView, View } from 'react-native';
import { connect } from 'react-redux';
import { loadBloodGroups } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
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
			return <Spinner size="large" />
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
			<View>
				{this.renderGroups()}
			</View>
		);
	}
}

const mapStateToProps = ({ blood }) => {
	const { error, loading, loaded, bloodInfo } = blood;
	return { error, loading, loaded, bloodInfo };
};

export default connect(mapStateToProps, { loadBloodGroups })(Home);