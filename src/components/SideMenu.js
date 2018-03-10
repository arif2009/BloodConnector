import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import { H1, H2, H3, Badge } from 'native-base';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { CardSection } from './common';
var styles = require('./styles');

const contextTypes = {
  drawer: PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string,
};

class SideMenu extends Component {
  render() {
    return (
      <View style={[styles.drawerContainer, this.props.sceneStyle]}>

        <View style={styles.drawerHeader}>
          <Text style={[styles.txtBolder,styles.selfAlignCenter]}>Arifur Rahman</Text>
          <H1 style={[styles.selfAlignCenter, styles.txtBlue]}>B+</H1>
          <Text style={[styles.txtBolder,styles.selfAlignCenter]}>Similar Blood : <H2 style={styles.txtBlue}>10</H2></Text>
        </View>

        <CardSection style={styles.drawerBtnContainer}>
          <Button style={styles.drawerBtnTxt} onPress={() => { Actions.home(); }}>
            <FontAwesome style={styles.drawerIconFont}>{Icons.home}</FontAwesome> Home Page
          </Button>
        </CardSection>

        <CardSection style={styles.drawerBtnContainer}>
          <Button style={styles.drawerBtnTxt} onPress={() => { Actions.login(); }}>
            <FontAwesome style={styles.drawerIconFont}>{Icons.signIn}</FontAwesome> Log In
          </Button>
        </CardSection>

        <CardSection style={[styles.drawerBtnContainer, {borderBottomWidth: 0}]}>
          <Button style={styles.drawerBtnTxt} onPress={() => { Actions.about(); }}>
            <FontAwesome style={styles.drawerIconFont}>{Icons.infoCircle}</FontAwesome> About
          </Button>
        </CardSection>
      </View>
    );
  }
}

SideMenu.contextTypes = contextTypes;
SideMenu.propTypes = propTypes;

export default SideMenu;