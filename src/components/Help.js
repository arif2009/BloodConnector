import React, { Component } from 'react';
import { Linking, TouchableOpacity, Image, View, Text } from 'react-native';
import { Container, H1, H2, H3, Icon, Content, Footer, FooterTab } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import Communications from 'react-native-communications';
import { Card, CardSection, Button, Input } from './common';
import We from '../utills/we';
var styles = require('./styles');

class Help extends Component {
  render() {
    return (
      <Container style={styles.bgColor}>
        <Content style={styles.mlLg}>
          <View>
            <H2 style={styles.selfAlignCenter}>Help</H2>
            <Text><Icon style={[styles.txtWarning, {fontSize: 22}]} type="FontAwesome" name="bell" /> Password recovery 
            option is missing in this app. It will be added later version. If you need, you can recover password using our 
            web application <Text style={styles.txtBlue} onPress={() => Linking.openURL('http://www.bloodconnector.org')}>www.bloodconnector.org</Text></Text>

            <H2 style={[styles.selfAlignCenter, styles.mtLg]}>About</H2>
            <Grid style={styles.msm}>
                  <Col size={20}>
                    <Image style={{width: 75, height: 83}} source={require('../images/arif.png')} />
                  </Col>
                  <Col size={80}>
                    <View style={styles.ml}>
                        <Text style={[styles.txtBold, {marginBottom:4}]}>Arifur Rahman (Sazal)</Text>
                        <Text style={[styles.txtBlue, {marginBottom:4}]} onPress={() => Communications.phonecall('+8801721654450', true)}>
                          +8801721654450
                        </Text>
                        <Text>arif.rahman2009@gmail.com</Text>
                    </View>
                  </Col>
              </Grid>
          </View>
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

export default Help;
