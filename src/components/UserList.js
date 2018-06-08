import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, Footer, FooterTab, Spinner, Header, Item, Input, Icon, H1 } from 'native-base';
import Communications from 'react-native-communications';
import { Col, Row, Grid } from "react-native-easy-grid";
import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
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
            waiting: true,
            userList: [],
            showModal: false,
            userListDs: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
            fname:""
        };
    }

    componentDidMount(){
        const { token } = this.props;
        //console.log("token",token);
        this.props.userFetch({token})
            .then((result) => {
                //console.log("Then",result);
                this.setState({
                    error: false,
                    loading: false,
                    userList: result.data.users
                });
                this.createDataSource(result.data.users);
            })
            .catch((errors)=>{
                this.setState({
                    error: 'Loading failed',
                    loading: false,
                    userList: []
                });
                console.log("Catch > ",errors);
        });
    }

    searchFilter(text){
        //console.log(text);
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
        _userDetails = (user) => {
            //let msg = `<Text>My Alert Msg ${person.fullName}</Text>`;
            //Alert.alert(`Blood Group: ${person.bloodGroup}`,msg);
            this.setState({
                fullName:user.fullName,
                phoneNumber: user.phoneNumber
            });
            //console.log(user);
            this.refs.termsModal.open();
            //console.log(this);
        };
        //onPress={() => _userDetails()} of Grid
        return(
            <Grid style={{marginLeft:5, marginRight:5, marginBottom: 5}} onPress={() => _userDetails(person)}>
                <Col size={20} style={[styles.hRed, {borderBottomLeftRadius: 5, borderTopLeftRadius:5}]}>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <H1 style={[styles.txtColor]}>{person.bloodGroup}</H1>
                    </View>
                </Col>
                <Col size={80} style={{backgroundColor: '#fff', padding:5, borderBottomRightRadius: 5, borderTopRightRadius:5}}>
                    <Row>
                        <Text style={[styles.txtMedium]} ellipsizeMode='tail' numberOfLines={1}>{person.fullName}</Text>
                    </Row>
                    <Row>
                        <Col size={40}><Text ellipsizeMode='tail' numberOfLines={1}>{person.phoneNumber}</Text></Col>
                        <Col size={60}><Text ellipsizeMode='tail' numberOfLines={1}>{person.email}</Text></Col>
                    </Row>
                </Col>
            </Grid>
        );
    }

    renderList() {
        //console.log("!!this.state.error", !!this.state.error)
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
                                placeholder="Search your donor" />
                            <Icon name="ios-people" />
                        </Item>
                    </Header>

                    <ListView
                        enableEmptySections={true}
                        dataSource={this.state.userListDs}
                        //renderSeparator= {this.ListViewItemSeparator}
                        renderRow={this.renderRow.bind(this)}
                        renderFooter = {this.renderFooter.bind(this)}
                        onEndReached={this.onEndReached.bind(this)}
                        style={{ marginTop: 10 }} />
                            <Modal style={[styles.modal, styles.detailsmodal, styles.pL, styles.pR]} position={"top"} 
        ref={"termsModal"} entry='top'>
        <Text style={styles.txtMedium}>Terms and Conditions</Text>
        <Text onPress={() => Communications.phonecall(this.state.phoneNumber, true)}>
            {this.state.phoneNumber}
        </Text>
        <Button style={styles.mt} onPress={() =>{this.refs.termsModal.close()}}>Ok</Button>
    </Modal>
                </View>
            );
        }
    }

    onEndReached() {
        //if (!this.state.waiting) {
            this.setState({waiting: false});
            //this.fetchData() // fetching new data, ended with this.setState({waiting: false});
        //}
    }

    renderFooter() {
        if (this.state.waiting) {
            return <Spinner color='blue' />;
        } else {
            return <Text></Text>;
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
                        <View style={{justifyContent:'center'}}>
                            <Text style={styles.selfAlignCenter}>© 2017-{We.twoLetterYear} - BloodConnector {We.version}</Text>
                            <Text>Website <Text style={styles.txtBlue} onPress={() => Linking.openURL('http://www.bloodconnector.org')}>www.bloodconnector.org</Text></Text>
                        </View>
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