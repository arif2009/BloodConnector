import React, { Component } from 'react';
import { H1, Icon, View } from 'native-base';
import { Card, CardSection, Button, Input } from './common';

class About extends Component {
  render() {
    return (
      <View style={{paddingTop:20}}>
        <H1 style={{textAlign: 'center'}}>Under Construction...</H1>
        <Icon style={{alignSelf: 'center'}} type="FontAwesome" name="gavel" />
      </View>
    );
  }
}

export default About;
