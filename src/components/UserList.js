import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Text, View, ListView, TouchableOpacity } from 'react-native';
import { Container, Content, Footer, FooterTab, Spinner, Header, Item, Input, Icon, H1, Button, H2 } from 'native-base';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Communications from 'react-native-communications';
import { Col, Row, Grid } from "react-native-easy-grid";
import Modal from 'react-native-modalbox';
import { userFetch } from '../actions'
import { 
    hRed, txtColor, errorTextStyle, modal, detailsmodal, txtRed, txtBold, txtBlue, 
    txtSuccess, txtMedium, borderLeft, txtDanger, borderRight, bloodStyle, bgColor, 
    nabBg, txtBolder, selfAlignCenter, footerIcon, mbSm, p, mt, ml5, mr5, mb5, row
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
            selectedGroup: '',
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
                //console.log("Catch > ",errors);
        });
    }

    searchFilter(text){
        //console.log(text);
        const newData = this.state.userList.filter(function(item){
            const itemData = (item.bloodGroup + ' ' + item.bloodGroupName + ' ' + item.addressM).toLowerCase();
            const searchText = text.toLowerCase();
            //console.log(item.bloodGroup);
            return itemData.indexOf(searchText) > -1;
        });
        this.createDataSource(newData);
        this.text = text;
    }

    groupBy(groupName){
        const newData = this.state.userList.filter(function(item){
            return item.bloodGroup === groupName;
        });
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.setState({
           userListDs: ds.cloneWithRows(newData),
           noGroupData: newData.length == 0,
           selectedGroup: groupName
        });
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
        //console.log(this.state.userList)
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
        else if(this.state.noGroupData){
            return (
               <Text style={[selfAlignCenter, txtBolder, txtDanger, mt]}>No donor found</Text>
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
                        onEndReached={this.onEndReached.bind(this)} style={mt} />

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
                        <Button style={selfAlignCenter} transparent onPress={() =>{this.refs.detailsModal.close()}}>
                            <Text style={[txtBolder, txtSuccess]}>Ok</Text>
                        </Button>
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
					<FooterTab style={nabBg}>
                        {(this.state.selectedGroup === 'A+') && <Button bordered light active>
                          <TouchableOpacity style={row} onPress={()=>{this.groupBy('A+')}}>
                            <FontAwesome style={footerIcon}>{Icons.font}</FontAwesome>
                            <FontAwesome style={txtColor}>{Icons.plus}</FontAwesome>
                          </TouchableOpacity>
                        </Button>}
                        {(this.state.selectedGroup !== 'A+') && <Button bordered light>
                          <TouchableOpacity style={row} onPress={()=>{this.groupBy('A+')}}>
                            <FontAwesome style={footerIcon}>{Icons.font}</FontAwesome>
                            <FontAwesome style={txtColor}>{Icons.plus}</FontAwesome>
                          </TouchableOpacity>
                        </Button>}

                        {(this.state.selectedGroup === 'A-') && <Button bordered light active>
                          <TouchableOpacity style={row} onPress={()=>{this.groupBy('A-')}}>
                            <FontAwesome style={footerIcon}>{Icons.font}</FontAwesome>
                            <FontAwesome style={txtColor}>{Icons.minus}</FontAwesome>
                          </TouchableOpacity>
                        </Button>}
                        {(this.state.selectedGroup !== 'A-') && <Button bordered light>
                          <TouchableOpacity style={row} onPress={()=>{this.groupBy('A-')}}>
                            <FontAwesome style={footerIcon}>{Icons.font}</FontAwesome>
                            <FontAwesome style={txtColor}>{Icons.minus}</FontAwesome>
                          </TouchableOpacity>
                        </Button>}

                        {(this.state.selectedGroup === 'B+') && <Button bordered light active>
                           <TouchableOpacity style={row} onPress={()=>{this.groupBy('B+')}}>
                            <FontAwesome style={footerIcon}>{Icons.bold}</FontAwesome>
                            <FontAwesome style={txtColor}>{Icons.plus}</FontAwesome>
                           </TouchableOpacity>
                        </Button>}
                        {(this.state.selectedGroup !== 'B+') && <Button bordered light>
                          <TouchableOpacity style={row} onPress={()=>{this.groupBy('B+')}}>
                            <FontAwesome style={footerIcon}>{Icons.bold}</FontAwesome>
                            <FontAwesome style={txtColor}>{Icons.plus}</FontAwesome>
                           </TouchableOpacity>
                        </Button>}

                        {(this.state.selectedGroup === 'B-') && <Button bordered light active>
                          <TouchableOpacity style={row} onPress={()=>{this.groupBy('B-')}}>
                            <FontAwesome style={footerIcon}>{Icons.bold}</FontAwesome>
                            <FontAwesome style={txtColor}>{Icons.minus}</FontAwesome>
                          </TouchableOpacity>
                        </Button>}
                        {(this.state.selectedGroup !== 'B-') && <Button bordered light>
                          <TouchableOpacity style={row} onPress={()=>{this.groupBy('B-')}}>
                            <FontAwesome style={footerIcon}>{Icons.bold}</FontAwesome>
                            <FontAwesome style={txtColor}>{Icons.minus}</FontAwesome>
                          </TouchableOpacity>
                        </Button>}

                        {(this.state.selectedGroup === 'AB+') && <Button bordered light active>
                          <TouchableOpacity style={row} onPress={()=>{this.groupBy('AB+')}}>
                            <FontAwesome style={footerIcon}>{Icons.font}</FontAwesome>
                            <FontAwesome style={footerIcon}>{Icons.bold}</FontAwesome>
                            <FontAwesome style={txtColor}>{Icons.plus}</FontAwesome>
                          </TouchableOpacity>
                        </Button>}
                        {(this.state.selectedGroup !== 'AB+') && <Button bordered light>
                          <TouchableOpacity style={row} onPress={()=>{this.groupBy('AB+')}}>
                            <FontAwesome style={footerIcon}>{Icons.font}</FontAwesome>
                            <FontAwesome style={footerIcon}>{Icons.bold}</FontAwesome>
                            <FontAwesome style={txtColor}>{Icons.plus}</FontAwesome>
                          </TouchableOpacity>
                        </Button>}

                        {(this.state.selectedGroup === 'AB-') && <Button bordered light active>
                          <TouchableOpacity style={row} onPress={()=>{this.groupBy('AB-')}}>
                            <FontAwesome style={footerIcon}>{Icons.font}</FontAwesome>
                            <FontAwesome style={footerIcon}>{Icons.bold}</FontAwesome>
                            <FontAwesome style={txtColor}>{Icons.minus}</FontAwesome>
                          </TouchableOpacity>
                        </Button>}
                        {(this.state.selectedGroup !== 'AB-') && <Button bordered light>
                          <TouchableOpacity style={row} onPress={()=>{this.groupBy('AB-')}}>
                            <FontAwesome style={footerIcon}>{Icons.font}</FontAwesome>
                            <FontAwesome style={footerIcon}>{Icons.bold}</FontAwesome>
                            <FontAwesome style={txtColor}>{Icons.minus}</FontAwesome>
                          </TouchableOpacity>
                        </Button>}

                        {(this.state.selectedGroup === 'O+') && <Button bordered light active>
                          <TouchableOpacity style={row} onPress={()=>{this.groupBy('O+')}}>
                            <FontAwesome style={footerIcon}>{Icons.circleO}</FontAwesome><Text>{' '}</Text>
                            <FontAwesome style={txtColor}>{Icons.plus}</FontAwesome>
                          </TouchableOpacity>
                        </Button>}
                        {(this.state.selectedGroup !== 'O+') && <Button bordered light>
                          <TouchableOpacity style={row} onPress={()=>{this.groupBy('O+')}}>
                            <FontAwesome style={footerIcon}>{Icons.circleO}</FontAwesome><Text>{' '}</Text>
                            <FontAwesome style={txtColor}>{Icons.plus}</FontAwesome>
                          </TouchableOpacity>
                        </Button>}

                        {(this.state.selectedGroup === 'O-') && <Button bordered light active>
                          <TouchableOpacity style={row} onPress={()=>{this.groupBy('O-')}}>
                            <FontAwesome style={footerIcon}>{Icons.circleO}</FontAwesome><Text>{' '}</Text>
                            <FontAwesome style={txtColor}>{Icons.minus}</FontAwesome>
                          </TouchableOpacity>
                        </Button>}
                        {(this.state.selectedGroup !== 'O-') && <Button bordered light>
                          <TouchableOpacity style={row} onPress={()=>{this.groupBy('O-')}}>
                            <FontAwesome style={footerIcon}>{Icons.circleO}</FontAwesome><Text>{' '}</Text>
                            <FontAwesome style={txtColor}>{Icons.minus}</FontAwesome>
                          </TouchableOpacity>
                        </Button>}
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