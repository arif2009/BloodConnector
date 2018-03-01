import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { H1, H2, H3, Badge } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { CardSection, Card } from './common';
var styles = require('./styles');

class ListItem extends Component {
  /*onRowPress() {
    Actions.employeeEdit({ employee: this.props.employee });
  }*/

  render() {
    const { groupSymbole, numberOfGroupUser } = this.props.group;
    return (
      <TouchableWithoutFeedback>
          <CardSection style={{justifyContent: 'space-around', paddingTop: 10, paddingBottom: 10, backgroundColor:'#fff', borderColor: '#ffcccc'}}>
            <H2> { groupSymbole } </H2>
            <Badge primary><Text style={styles.budgetTxt}> { numberOfGroupUser } </Text></Badge>
          </CardSection>
      </TouchableWithoutFeedback>
    );
  }
}

export default ListItem;