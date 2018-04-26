import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { 
    Text, StyleSheet, View, ListView, TextInput, 
    ActivityIndicator, Alert, AsyncStorage, StatusBar
} from 'react-native';
import { 
    Container, Content, Footer, FooterTab, Spinner,
    Header, Item, Input, Icon
} from 'native-base';
import { CardSection } from './common';
import { userFetch } from '../actions'
import We from '../utills/we';
var styles = require('./styles');

class UserList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: props.error,
            loading: props.loading,
            userList: [],
            userListDs: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])
        };
        console.log("constructor", this.state);
    }

    componentDidMount(){
        const { token } = this.props;
        this.props.userFetch({token})
            .then((result) => {
                this.setState({
                    error: false,
                    loading: false,
                    userList: result.data
                });
                this.createDataSource(result.data);
            })
            .catch((error)=>{
                this.setState({
                    error: 'Loading failed',
                    loading: false,
                    userList: result.data
                });
        });
    }

    searchFilter(text){
        console.log(text);
        const newData = this.state.userList.filter(function(item){
            const itemData = item.fullName.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1;
        });
        this.createDataSource(newData);
        this.text = text;
    }

    createDataSource(userList) {
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
           userListDs: ds.cloneWithRows(userList)
        });
	}

    renderList() {
		if(this.state.loading){
			  return <Spinner color='blue' />
        }
        else if(!!this.state.error){
            return(
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
            );
        }
        else if(!!this.state.userList){
            return(
                <View>
                    <Header searchBar rounded style={styles.bgColor}>
                        <Item>
                            <Icon name="ios-search" />
                            <Input
                                onChangeText={this.searchFilter.bind(this)}
                                value={this.text}
                                placeholder="Search" />
                            <Icon name="ios-people" />
                        </Item>
                    </Header>

                    <ListView
                        dataSource={this.state.userListDs}
                        //renderSeparator= {this.ListViewItemSeparator}
                        renderRow={(rowData) => <Text style={{ fontSize: 17, padding: 10 }}>{rowData.fullName}</Text>}
                        enableEmptySections={true}
                        style={{ marginTop: 10 }} />
                </View>
            );
        }
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
	const { error, loading } = action;
	return { error, loading };
};

export default connect(mapStateToProps, { userFetch })(UserList);