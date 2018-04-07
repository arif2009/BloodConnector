import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { 
    Text, StyleSheet, View, ListView, TextInput, 
    ActivityIndicator, Alert, AsyncStorage, StatusBar
} from 'react-native';
import { 
	Container, Content, Footer, FooterTab, Spinner 
} from 'native-base';
import { userFetch } from '../actions'
import We from '../utills/we';
var styles = require('./styles');

class UserList extends Component {

    constructor(props) {
        super(props);

        const { token } = this.props;
        this.props.userFetch({token});
    }

    searchFilter(text){
        const newData = this.props.listOfUser.filter(function(item){
            const itemData = item.fullName.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1;
        })
        console.log(newData);
        this.createDataSource(newData);
        this.text = text;
    }

    createDataSource(userList) {
		const ds = new ListView.DataSource({
		  rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.dataSource = ds.cloneWithRows(userList);
        console.log("dataSource", this.dataSource);
	}

    renderList() {
		if(this.props.loading){
			return <Spinner color='blue' />
        }
        else if(!!this.props.error){
            return(
                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>
            );
        }
        else if(this.props.listOfUser.length > 0){
            this.createDataSource(this.props.listOfUser);
            return(
                <View>
                    <TextInput 
                        style={{textAlign: 'center',height: 40,borderWidth: 1,borderColor: '#009688',borderRadius: 7 ,backgroundColor : "#FFFFFF"}}
                        onChangeText={(text) => this.searchFilter(text)}
                        value={this.text}
                        underlineColorAndroid='transparent'
                        placeholder="Search Here" />
                <ListView
                    dataSource={this.dataSource}
                    //renderSeparator= {this.ListViewItemSeparator}
                    renderRow={(rowData) => <Text style={{fontSize: 17, padding: 10}}>{rowData.fullName}</Text>}
                    enableEmptySections={true}
                    style={{marginTop: 10}} />
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
	const { error, loading, listOfUser } = action;
	return { error, loading, listOfUser };
};

export default connect(mapStateToProps, { userFetch })(UserList);