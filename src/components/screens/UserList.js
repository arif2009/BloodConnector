import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import ListView from 'deprecated-react-native-listview';
import {
  Container,
  Content,
  Spinner,
  Item,
  Input,
  Icon,
  H1,
  Button,
  Fab,
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Modal from 'react-native-modalbox';
import {InfoModal} from '../common/InfoModal';
import {userFetch} from '../../actions';
import {
  modal,
  detailsmodal,
  txtSuccess,
  txtMedium,
  borderLeft,
  txtDanger,
  borderRight,
  bloodStyle,
  txtColor,
  errorTextStyle,
  hRed,
  bgColor,
  bgSoftRed,
  txtBolder,
  selfAlignCenter,
  bgWhite,
  font12,
  font15,
  ml,
  p,
  mt,
  ml5,
  mr5,
  mb5,
  msm,
} from '../styles';
import styles from './styles';

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
      active: false,
      userListDs: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }).cloneWithRows([]),
    };
  }

  componentDidMount() {
    const {userInfo} = this.props;

    if (userInfo?.access_token) {
      const {access_token} = userInfo;
      this.props
        .userFetch(access_token)
        .then((result) => {
          //console.log("result",result);
          this.setState({
            error: false,
            loading: false,
            userList: result.data.users,
          });
          this.createDataSource(result.data.users);
        })
        .catch((errors) => {
          this.setState({
            error: 'Loading failed',
            loading: false,
            userList: [],
          });
          //console.log("Catch > ",errors);
        });
    }
  }

  searchFilter(text) {
    //console.log(text);
    const newData = this.state.userList.filter(function (item) {
      const itemData = (
        item.bloodGroup +
        ' ' +
        item.bloodGroupName +
        ' ' +
        item.addressM
      ).toLowerCase();
      const searchText = text.toLowerCase();
      return itemData.indexOf(searchText) > -1;
    });
    this.createDataSource(newData);
    this.text = text;
  }

  groupBy(groupName) {
    const newData = this.state.userList.filter(function (item) {
      return item.bloodGroup === groupName;
    });
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.setState({
      userListDs: ds.cloneWithRows(newData),
      noGroupData: newData.length === 0,
      active: !this.state.active,
      selectedGroup: groupName,
    });
  }

  createDataSource(userList) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      userListDs: ds.cloneWithRows(userList),
    });
  }

  renderRow(person) {
    //console.log(person);
    const _userDetails = (user) => {
      this.setState({
        fullName: user.fullName,
        bloodGiven: user.bloodGiven,
        phoneNumber: user.phoneNumber,
        bloodGroup: user.bloodGroup,
        email: user.email,
      });
      //console.log(user);
      this.refs.detailsModal.open();
      //console.log(this);
    };
    return (
      <Grid style={[ml5, mr5, mb5]} onPress={() => _userDetails(person)}>
        <Col size={20} style={[hRed, borderLeft]}>
          <View style={bloodStyle}>
            <H1 style={txtColor}>{person.bloodGroup}</H1>
          </View>
        </Col>
        <Col size={80} style={[styles.colBg, borderRight]}>
          <Row>
            <Text style={txtMedium} ellipsizeMode="tail" numberOfLines={1}>
              {person.fullName}
            </Text>
          </Row>
          <Row>
            <Text>{person.addressM}</Text>
          </Row>
        </Col>
      </Grid>
    );
  }

  renderList() {
    console.log('props', this.props);
    if (this.state.loading) {
      return <Spinner color="blue" />;
    } else if (this.state.error) {
      return <Text style={errorTextStyle}>{this.state.error}</Text>;
    } else if (this.state.noGroupData) {
      return (
        <Text style={[selfAlignCenter, txtBolder, txtDanger, mt]}>
          No donor found
        </Text>
      );
    } else if (this.state.userList) {
      return (
        <View>
          <View style={hRed}>
            <Item style={[bgWhite, msm]} rounded>
              <Icon type="FontAwesome" name="search" />
              <Input
                onChangeText={this.searchFilter.bind(this)}
                value={this.text}
                placeholder="Search your donor"
              />
              <Icon type="MaterialIcons" name="people" />
            </Item>
          </View>

          <ListView
            enableEmptySections={true}
            dataSource={this.state.userListDs}
            //renderSeparator= {this.ListViewItemSeparator}
            renderRow={this.renderRow.bind(this)}
            renderFooter={this.renderFooter.bind(this)}
            onEndReached={this.onEndReached.bind(this)}
            style={mt}
          />

          <Modal
            style={[modal, detailsmodal, p]}
            position={'top'}
            ref={'detailsModal'}
            entry="top"
            coverScreen={true}
            animationDuration={250}>
            <InfoModal
              bloodGroup={this.state.bloodGroup}
              fullName={this.state.fullName}
              bloodGiven={this.state.bloodGiven}
              phoneNumber={this.state.phoneNumber}
              email={this.state.email}
            />
            <Button
              style={selfAlignCenter}
              transparent
              onPress={() => {
                this.refs.detailsModal.close();
              }}>
              <Text style={[txtBolder, txtSuccess]}>Ok</Text>
            </Button>
          </Modal>
        </View>
      );
    }
  }

  onEndReached() {
    this.setState({waiting: false});
  }

  renderFooter() {
    if (this.state.waiting) {
      return <Spinner color="blue" />;
    } else {
      return <Text />;
    }
  }

  render() {
    return (
      <Container style={bgColor}>
        <Content>{this.renderList()}</Content>

        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={bgSoftRed}
          position="bottomRight"
          onPress={() => this.setState({active: !this.state.active})}>
          <Icon type="Entypo" name="water" />

          {this.state.selectedGroup === 'O+' && (
            <Button
              onPress={() => {
                this.groupBy('O+');
              }}
              style={hRed}>
              <Icon type="FontAwesome" name="circle-o" style={font15} />
              <Text> </Text>
              <Icon type="FontAwesome" name="plus" style={font12} />
            </Button>
          )}
          {this.state.selectedGroup !== 'O+' && (
            <Button
              style={bgSoftRed}
              onPress={() => {
                this.groupBy('O+');
              }}>
              <Icon type="FontAwesome" name="circle-o" style={font15} />
              <Text> </Text>
              <Icon type="FontAwesome" name="plus" style={font12} />
            </Button>
          )}

          {this.state.selectedGroup === 'O-' && (
            <Button
              style={hRed}
              onPress={() => {
                this.groupBy('O-');
              }}>
              <Icon type="FontAwesome" name="circle-o" style={font15} />
              <Text> </Text>
              <Icon type="FontAwesome" name="minus" style={font12} />
            </Button>
          )}
          {this.state.selectedGroup !== 'O-' && (
            <Button
              style={bgSoftRed}
              onPress={() => {
                this.groupBy('O-');
              }}>
              <Icon type="FontAwesome" name="circle-o" style={font15} />
              <Text> </Text>
              <Icon type="FontAwesome" name="minus" style={font12} />
            </Button>
          )}

          {this.state.selectedGroup === 'AB+' && (
            <Button
              style={hRed}
              onPress={() => {
                this.groupBy('AB+');
              }}>
              <Icon type="FontAwesome" name="font" style={font12} />
              <Icon type="FontAwesome" name="bold" style={font12} />
              <Text> </Text>
              <Icon type="FontAwesome" name="plus" style={font12} />
            </Button>
          )}
          {this.state.selectedGroup !== 'AB+' && (
            <Button
              style={bgSoftRed}
              onPress={() => {
                this.groupBy('AB+');
              }}>
              <Icon type="FontAwesome" name="font" style={font12} />
              <Icon type="FontAwesome" name="bold" style={font12} />
              <Text> </Text>
              <Icon type="FontAwesome" name="plus" style={font12} />
            </Button>
          )}

          {this.state.selectedGroup === 'AB-' && (
            <Button
              style={hRed}
              onPress={() => {
                this.groupBy('AB-');
              }}>
              <Icon type="FontAwesome" name="font" style={font12} />
              <Icon type="FontAwesome" name="bold" style={font12} />
              <Text> </Text>
              <Icon type="FontAwesome" name="minus" style={font12} />
            </Button>
          )}
          {this.state.selectedGroup !== 'AB-' && (
            <Button
              style={bgSoftRed}
              onPress={() => {
                this.groupBy('AB-');
              }}>
              <Icon type="FontAwesome" name="font" style={font12} />
              <Icon type="FontAwesome" name="bold" style={font12} />
              <Text> </Text>
              <Icon type="FontAwesome" name="minus" style={font12} />
            </Button>
          )}
          {this.state.selectedGroup === 'B+' && (
            <Button
              style={hRed}
              onPress={() => {
                this.groupBy('B+');
              }}>
              <Icon type="FontAwesome" name="bold" style={font15} />
              <Text> </Text>
              <Icon type="FontAwesome" name="plus" style={font12} />
            </Button>
          )}
          {this.state.selectedGroup !== 'B+' && (
            <Button
              style={bgSoftRed}
              onPress={() => {
                this.groupBy('B+');
              }}>
              <Icon type="FontAwesome" name="bold" style={font15} />
              <Text> </Text>
              <Icon type="FontAwesome" name="plus" style={font12} />
            </Button>
          )}

          {this.state.selectedGroup === 'B-' && (
            <Button
              style={hRed}
              onPress={() => {
                this.groupBy('B-');
              }}>
              <Icon type="FontAwesome" name="bold" style={font15} />
              <Text> </Text>
              <Icon type="FontAwesome" name="minus" style={font12} />
            </Button>
          )}
          {this.state.selectedGroup !== 'B-' && (
            <Button
              style={bgSoftRed}
              onPress={() => {
                this.groupBy('B-');
              }}>
              <Icon type="FontAwesome" name="bold" style={font15} />
              <Text> </Text>
              <Icon type="FontAwesome" name="minus" style={font12} />
            </Button>
          )}
          {this.state.selectedGroup === 'A-' && (
            <Button
              style={hRed}
              onPress={() => {
                this.groupBy('A-');
              }}>
              <Icon type="FontAwesome" name="font" style={font15} />
              <Icon type="FontAwesome" name="minus" style={font12} />
            </Button>
          )}
          {this.state.selectedGroup !== 'A-' && (
            <Button
              style={bgSoftRed}
              onPress={() => {
                this.groupBy('A-');
              }}>
              <Icon type="FontAwesome" name="font" style={font15} />
              <Icon type="FontAwesome" name="minus" style={font12} />
            </Button>
          )}
          {this.state.selectedGroup === 'A+' && (
            <Button
              style={hRed}
              onPress={() => {
                this.groupBy('A+');
              }}>
              <Icon type="FontAwesome" name="font" style={font15} />
              <Icon type="FontAwesome" name="plus" style={font12} />
            </Button>
          )}
          {this.state.selectedGroup !== 'A+' && (
            <Button
              style={bgSoftRed}
              onPress={() => {
                this.groupBy('A+');
              }}>
              <Icon type="FontAwesome" name="font" style={font15} />
              <Icon type="FontAwesome" name="plus" style={font12} />
            </Button>
          )}
        </Fab>
      </Container>
    );
  }
}

const mapStateToProps = ({persistedStore: {userInfo}, userLoading}) => {
  const {error, loading} = userLoading;
  return {error, loading, userInfo};
};

export default connect(mapStateToProps, {userFetch})(UserList);

export const UserListOptions = (nav) => {
  return {
    headerTitle: 'Blood Connector',
    headerLeft: () => (
      <Icon
        type="Entypo"
        name="menu"
        style={[txtColor, ml]}
        onPress={() => nav.navigation.openDrawer()}
      />
    ),
  };
};
