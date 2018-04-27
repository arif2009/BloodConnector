import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert, AsyncStorage } from 'react-native';
import { Container, Content, Footer, FooterTab, Spinner, Header, Item, Input, Icon } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
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
    
    renderRow(person) {
        //console.log(person);
        //return <Text style={{ fontSize: 17, padding: 10 }}>{person.fullName}</Text>;
        return(
            <Grid style={{marginLeft:5, marginRight:5, marginBottom: 5}}>
                <Col size={20} style={{backgroundColor: '#00ff00'}}>
                    <Text>{person.bloodGroup}</Text>
                </Col>
                <Col size={80} style={{backgroundColor: '#fff'}}>
                    <Row>
                        <Text>{person.fullName}</Text>
                    </Row>
                    <Row>
                        <Col><Text>{person.phoneNumber}</Text></Col>
                        <Col><Text>{person.email}</Text></Col>
                    </Row>
                </Col>
            </Grid>
        );
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
                    <Header searchBar rounded style={styles.hRed}>
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
                        renderRow={this.renderRow}
                        enableEmptySections={true}
                        style={{ marginTop: 10 }} />
                </View>
            );
        }
	}

    render(){
        return (
			<Container style={styles.bgColor}>
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