import React, {Component, useEffect} from 'react';
import {StatusBar} from 'react-native';
import ListView from 'deprecated-react-native-listview';
import {connect, useSelector} from 'react-redux';
import {Container, Content, Fab, Icon, Spinner, H2, Button} from 'native-base';
import Share from 'react-native-share';
import {loadBloodGroups} from '../../actions';
import ListItem from '../ListItem';
import {CardSection} from '../common';
import {appLink} from '../../utills/we';
import {
  bgColor,
  bgFb,
  bgSoftRed,
  bgTwitter,
  bgWhatsApp,
  txtColor,
  ml,
  mr,
} from '../styles';

import styles from './styles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.props.loadBloodGroups();

    this.state = {activeShare: false};
  }

  createDataSource(bloodGroups, totalUser) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.dataSource = ds.cloneWithRows(bloodGroups);
    this.dataSource.totalNumberOfUser = totalUser;
  }

  renderGroups() {
    if (this.props.loading) {
      return <Spinner color="blue" />;
    }

    if (this.props.loaded) {
      this.createDataSource(
        this.props.bloodInfo.groups,
        this.props.bloodInfo.totalNumberOfUser,
      );
      return (
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
          renderHeader={this.renderHeader}
        />
      );
    }
  }

  renderRow(group) {
    return <ListItem group={group} />;
  }

  renderHeader() {
    return (
      <CardSection style={styles.homeTitle}>
        <H2> NUMBER OF DONOR : {this.dataSource.totalNumberOfUser}</H2>
      </CardSection>
    );
  }

  render() {
    let shareOptions = {
      title: 'Blood Connector',
      message: "Its an awesome app for blood donor's and receiver's",
      url: appLink,
      subject: "Awesome app for blood donor's and receiver's", //  for email
    };

    return (
      <Container style={bgColor}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#ff8080"
          translucent={false}
        />
        <Content>{this.renderGroups()}</Content>

        <Fab
          active={this.state.activeShare}
          direction="right"
          containerStyle={{}}
          style={bgSoftRed}
          position="bottomLeft"
          onPress={() => this.setState({activeShare: !this.state.activeShare})}>
          <Icon type="Entypo" name="share" />

          <Button
            style={bgWhatsApp}
            onPress={() => {
              this.setState({activeShare: !this.state.activeShare});
              setTimeout(() => {
                Share.shareSingle(
                  Object.assign(shareOptions, {
                    social: 'whatsapp',
                  }),
                );
              }, 300);
            }}>
            <Icon type="FontAwesome" name="whatsapp" />
          </Button>
          <Button
            style={bgFb}
            onPress={() => {
              this.setState({activeShare: !this.state.activeShare});
              setTimeout(() => {
                Share.shareSingle(
                  Object.assign(shareOptions, {
                    social: 'facebook',
                  }),
                );
              }, 300);
            }}>
            <Icon type="Foundation" name="social-facebook" />
          </Button>
          <Button
            style={bgSoftRed}
            onPress={() => {
              this.setState({activeShare: !this.state.activeShare});
              setTimeout(() => {
                Share.shareSingle(
                  Object.assign(shareOptions, {
                    social: 'email',
                  }),
                );
              }, 300);
            }}>
            <Icon type="Entypo" name="mail" />
          </Button>
          <Button
            style={bgTwitter}
            onPress={() => {
              this.setState({activeShare: !this.state.activeShare});
              setTimeout(() => {
                Share.shareSingle(
                  Object.assign(shareOptions, {
                    social: 'twitter',
                  }),
                );
              }, 300);
            }}>
            <Icon type="FontAwesome" name="twitter" />
          </Button>
        </Fab>
      </Container>
    );
  }
}

const mapStateToProps = ({blood}) => {
  const {error, loading, loaded, bloodInfo} = blood;
  return {error, loading, loaded, bloodInfo};
};

export default connect(mapStateToProps, {loadBloodGroups})(Home);

export const HomeOptions = (nav) => {
  const {isLogedIn} = useSelector((state) => state.persistedStore);

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
    headerRight: () => {
      return !isLogedIn ? (
        <Icon
          type="Entypo"
          name="add-user"
          style={[txtColor, mr]}
          onPress={() => nav.navigation.openDrawer()}
        />
      ) : null;
    },
  };
};
