import React, {Component} from 'react';
import {Text, TouchableWithoutFeedback} from 'react-native';
import {H2, Badge} from 'native-base';
import {CardSection} from './common';
import {budgetTxt, listItem} from './styles';

class ListItem extends Component {
  render() {
    const {groupSymbole, numberOfGroupUser} = this.props.group;
    return (
      <TouchableWithoutFeedback>
        <CardSection style={listItem}>
          <H2> {groupSymbole} </H2>
          <Badge primary>
            <Text style={budgetTxt}> {numberOfGroupUser} </Text>
          </Badge>
        </CardSection>
      </TouchableWithoutFeedback>
    );
  }
}

export default ListItem;
