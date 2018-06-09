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
            <H3 style={[styles.selfAlignCenter, styles.mt]}>Help</H3>
            <Text><Icon style={[styles.txtWarning, {fontSize: 22}]} type="FontAwesome" name="bell" /> Password recovery & Update information
            options are missing in this app. It will be added later version. If you need, you can do it using our 
            web application <Text style={styles.txtBlue} onPress={() => Linking.openURL('http://www.bloodconnector.org')}>www.bloodconnector.org</Text></Text>

            <H3 style={[styles.selfAlignCenter, styles.mtLg]}>Developed By</H3>
            <Grid style={styles.msm}>
                  <Col size={25}>
                    <Image style={styles.bgContainer} resizeMode='cover' source={require('../images/arif.png')} />
                  </Col>
                  <Col size={75}>
                    <View style={styles.ml}>
                        <Text style={[styles.txtBold, styles.mbSm]}>Arifur Rahman (Sazal)</Text>
                        <Text style={styles.mbSm}>Sr. Software Engineer.</Text>
                        <Text style={styles.mbSm}>Graduated from <Text style={styles.txtBlue} onPress={() => Linking.openURL('http://www.duet.ac.bd')}>DUET</Text></Text>
                        <Text style={[styles.txtBlue, styles.mbSm]} onPress={() => Communications.phonecall('+8801721654450', true)}>
                          +8801721654450
                        </Text>
                        <Text style={styles.txtBlue} onPress={() => Communications.email(['arif.rahman2009@gmail.com'],null,null,'Bloodconnector: Issue or Openion',null)}>
                          arif.rahman2009@gmail.com
                        </Text>
                    </View>
                  </Col>
              </Grid>
              <H3 style={[styles.selfAlignCenter, styles.mtLg]}>Inspaired By</H3>
              <Grid style={styles.msm}>
                <Col>
                  <Text style={styles.txtBold}>Mafi Islam (Mafi)</Text>
                  <Text style={[styles.txtBold, {marginBottom:4}]}>(TV News Anchor/Reporter at Ekattor)</Text>
                  <Text style={styles.txtBlue} onPress={() => Communications.email(['mafi30th@yahoo.com'],null,null,'Bloodconnector: Openion',null)}>
                    mafi30th@yahoo.com
                  </Text>
                </Col>
                <Col>
                  <Text style={styles.txtBold}>Jahangir Alam (Jahangir)</Text>
                  <Text style={[styles.txtBold, {marginBottom:4}]}>(Work at Flora Limited)</Text>
                  <Text style={styles.txtBlue} onPress={() => Communications.email(['jahangirantar@gmail.com'],null,null,'Bloodconnector: Openion',null)}>
                    jahangirantar@gmail.com
                  </Text>
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
