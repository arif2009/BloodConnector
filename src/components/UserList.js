import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Text, View, ListView } from 'react-native';
import { Container, Content, Footer, FooterTab, Spinner, Header, Item, Input, Icon, H1 } from 'native-base';
import Communications from 'react-native-communications';
import { Col, Row, Grid } from "react-native-easy-grid";
import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
import { userFetch } from '../actions'
import { twoLetterYear, version} from '../utills/we';
import { 
    hRed, txtColor, errorTextStyle, modal, detailsmodal, txtRed, txtBold, txtBlue, txtMedium, borderLeft,
    borderRight, bloodStyle, bgColor, footerBg, selfAlignCenter, mbSm, p, mt, ml5, mr5, mb5
} from './styles';

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: props.error,
            loading: props.loading,
            waiting: true,
            userList: [],
            showModal: false,
            userListDs: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])
        };
    }

    componentDidMount(){
        const { token } = this.props;
        //console.log("token",token);
        this.props.userFetch({token})
            .then((result) => {
                //console.log("result",result);
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
            const itemData = item.bloodGroup.toUpperCase()
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
            this.setState({
                fullName: user.fullName,
                bloodGiven: user.bloodGiven,
                phoneNumber: user.phoneNumber,
                bloodGroup: user.bloodGroup,
                email: user.email
            });
            //console.log(user);
            this.refs.detailsModal.open();
            //console.log(this);
        };
        return(
            <Grid style={[ml5, mr5, mb5]} onPress={() => _userDetails(person)}>
                <Col size={20} style={[hRed, borderLeft]}>
                    <View style={bloodStyle}>
                        <H1 style={txtColor}>{person.bloodGroup}</H1>
                    </View>
                </Col>
                <Col size={80} style={[{backgroundColor: '#fff', padding:5}, borderRight]}>
                    <Row>
                        <Text style={txtMedium} ellipsizeMode='tail' numberOfLines={1}>{person.fullName}</Text>
                    </Row>
                    <Row>
                        <Text>{person.addressM}</Text>
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
                <Text style={errorTextStyle}>
                    {this.state.error}
                </Text>
            );
        }
        else if(!!this.state.userList){
            return(
                <View>
                    <Header searchBar rounded style={hRed}>
                        <Item>
                            <Icon name="ios-search" />
                            <Input
                                onChangeText={this.searchFilter.bind(this)}
                                value={this.text}
                                placeholder="Search your donor" />
                            <Icon name="ios-people" />
                        </Item>
                    </Header>

                    <ListView enableEmptySections={true} dataSource={this.state.userListDs}
                        //renderSeparator= {this.ListViewItemSeparator}
                        renderRow={this.renderRow.bind(this)} renderFooter = {this.renderFooter.bind(this)}
                        onEndReached={this.onEndReached.bind(this)} style={{ marginTop: 10 }} />

                    <Modal style={[modal, detailsmodal, p]} position={"top"} 
                        ref={"detailsModal"} entry='top' coverScreen={true} animationDuration={300}>
                        <H1 style={[txtRed, txtBold]}>{this.state.bloodGroup}</H1>
                        <Text style={[txtMedium, mb5]}>{this.state.fullName}</Text>
                        {this.state.bloodGiven > 0 && <Text style={mb5}>Given blood {this.state.bloodGiven} times</Text>}
                        <Text style={[txtBlue, mb5]} onPress={() => Communications.phonecall(this.state.phoneNumber, true)}>
                            {this.state.phoneNumber}
                        </Text>
                        <Text style={[txtBlue, mbSm]} onPress={() => Communications.email([this.state.email],null,null,`Need ${this.state.bloodGroup} blood`,null)}>
                            {this.state.email}
                        </Text>
                        <Button style={mt} onPress={() =>{this.refs.detailsModal.close()}}>Ok</Button>
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
			<Container style={bgColor}>
				<Content>
					{this.renderList()}
				</Content>

				<Footer>
					<FooterTab style={footerBg}>
                        <View style={{justifyContent:'center'}}>
                            <Text style={selfAlignCenter}>© 2017-{twoLetterYear} - BloodConnector {version}</Text>
                            <Text>Website <Text style={txtBlue} onPress={() => Linking.openURL('http://www.bloodconnector.org')}>www.bloodconnector.org</Text></Text>
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