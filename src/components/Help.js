import React, { Component } from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import { H1, H2, H3, Icon, View, Text } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import Communications from 'react-native-communications';
import { Card, CardSection, Button, Input } from './common';
var styles = require('./styles');

class Help extends Component {
  render() {
    return (
      <View style={{padding:15}}>
        <H2 style={styles.selfAlignCenter}>Help</H2>
        <Text><Icon style={[styles.txtWarning, {fontSize: 22}]} type="FontAwesome" name="bell" /> Password recovery 
        option is missing in this app. It will be added later version. If you need, you can recover password using our 
        web application <Text style={styles.txtBlue} onPress={() => Linking.openURL('http://www.bloodconnector.org')}>www.bloodconnector.org</Text></Text>

        <H2 style={[styles.selfAlignCenter, styles.mtLg]}>About</H2>
        <Grid style={{marginLeft:5, marginRight:5, marginBottom: 5}}>
              <Col size={20}>
                  <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                      <H1>AB</H1>
                  </View>
              </Col>
              <Col size={80}>
                  <Row>
                      <Text>Arifur Rahman (Sazal)</Text>
                  </Row>
                  <Row>
                      <Col>
                          <TouchableOpacity onPress={() => Communications.phonecall('+8801721654450', true)}>
                              <Text>+8801721654450</Text>
                          </TouchableOpacity>
                      </Col>
                      <Col><Text ellipsizeMode='tail'>arif.rahman2009@gmail.com</Text></Col>
                  </Row>
              </Col>
          </Grid>
      </View>
    );
  }
}

export default Help;
