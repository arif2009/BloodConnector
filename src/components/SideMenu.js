import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import { CardSection } from './common';

const contextTypes = {
  drawer: PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    padding: 15,
    height: 45,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  textStyle: {
    fontSize: 18,
    color: '#555',
  },
  nameContainer: {
    padding: 15,
    height: 45,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  name: {
    fontSize: 22,
    color: '#555',
    fontWeight: '400',
  }
});

class SideMenu extends Component {
  render() {
    return (
      <View style={[styles.viewContainer, this.props.sceneStyle]}>
        <CardSection style={{ flexDirection: 'column', padding: 30 }}>
          <Button
            containerStyle={styles.container}
            style={styles.name}
            onPress={() => { Actions.profile(); }}
          >User Name</Button>
        </CardSection>
        <CardSection style={{ flexDirection: 'column' }}>
          <Button
            containerStyle={styles.container}
            style={styles.textStyle}
            onPress={() => { Actions.home(); }}
          >Home Page</Button>
        </CardSection>
        <CardSection style={{ flexDirection: 'column', borderBottomWidth: 0, }}>
          <Button
            containerStyle={styles.container}
            style={styles.textStyle}
            onPress={() => Actions.settings()}
          >Settings</Button>
          <Button
            containerStyle={styles.container}
            style={styles.textStyle}
            onPress={() => Actions.auth()}
          >Log Out</Button>
        </CardSection>
      </View>
    );
  }
}

SideMenu.contextTypes = contextTypes;
SideMenu.propTypes = propTypes;

export default SideMenu;