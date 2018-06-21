import React, { Component } from 'react';
import { Linking, Image, View, Text } from 'react-native';
import { Container, H3, Icon, Content, Footer, FooterTab } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";
import Communications from 'react-native-communications';
import arifImage from '../images/arif.png';
import { twoLetterYear, version } from '../utills/we';
import { 
  bgColor, selfAlignCenter, txtWarning, txtBlue, bgContainer, txtBold, footerBg,
  mlLg, mt, mtLg, msm, ml, mbSm
} from './styles';

class Help extends Component {
  render() {
    return (
      <Container style={bgColor}>
        <Content style={mlLg}>
          <View>
            <H3 style={[selfAlignCenter, mt]}>Help</H3>
            <Text><Icon style={[txtWarning, {fontSize: 22}]} type="FontAwesome" name="bell" /> Password recovery & Update information
            options are missing in this app. It will be added later version. If you need, you can do it using our 
            web application <Text style={txtBlue} onPress={() => Linking.openURL('http://www.bloodconnector.org')}>www.bloodconnector.org</Text></Text>

            <H3 style={[selfAlignCenter, mtLg]}>Developed By</H3>
            <Grid style={msm}>
                  <Col size={25}>
                    <Image style={bgContainer} resizeMode='cover' source={arifImage} />
                  </Col>
                  <Col size={75}>
                    <View style={ml}>
                        <Text style={[txtBold, mbSm]}>Arifur Rahman (Sazal)</Text>
                        <Text style={mbSm}>Sr. Software Engineer.</Text>
                        <Text style={mbSm}>Graduated from <Text style={txtBlue} onPress={() => Linking.openURL('http://www.duet.ac.bd')}>DUET</Text></Text>
                        <Text style={[txtBlue, mbSm]} onPress={() => Communications.phonecall('+8801721654450', true)}>
                          +8801721654450
                        </Text>
                        <Text style={txtBlue} onPress={() => Communications.email(['arif.rahman2009@gmail.com'],null,null,'Bloodconnector: Issue or Openion',null)}>
                          arif.rahman2009@gmail.com
                        </Text>
                    </View>
                  </Col>
              </Grid>
              <H3 style={[selfAlignCenter, mtLg]}>Inspaired By</H3>
              <Grid style={msm}>
                <Col>
                  <Text style={txtBold}>Mafi Islam (Mafi)</Text>
                  <Text style={[txtBold, {marginBottom:4}]}>(TV News Anchor/Reporter at Ekattor)</Text>
                  <Text style={txtBlue} onPress={() => Communications.email(['mafi30th@yahoo.com'],null,null,'Bloodconnector: Openion',null)}>
                    mafi30th@yahoo.com
                  </Text>
                </Col>
                <Col>
                  <Text style={txtBold}>Jahangir Alam (Jahangir)</Text>
                  <Text style={[txtBold, {marginBottom:4}]}>(Work at Flora Limited)</Text>
                  <Text style={txtBlue} onPress={() => Communications.email(['jahangirantar@gmail.com'],null,null,'Bloodconnector: Openion',null)}>
                    jahangirantar@gmail.com
                  </Text>
                </Col>
              </Grid>
          </View>
        </Content>
        <Footer>
					<FooterTab style={footerBg}>
            <View style={{justifyContent:'center'}}>
              <Text style={selfAlignCenter}>© 2017-{twoLetterYear} - BloodConnector {version}</Text>
              <Text>Website <Text style={txtBlue} onPress={() => Linking.openURL('http://www.bloodconnector.org')}>www.bloodconnector.org</Text></Text>
            </View>
					</FooterTab>
				</Footer>
      </Container>
    );
  }
}

export default Help;
