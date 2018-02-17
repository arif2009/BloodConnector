import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ListItem extends Component {
  /*onRowPress() {
    Actions.employeeEdit({ employee: this.props.employee });
  }*/

  render() {
    const { groupSymbole, numberOfGroupUser } = this.props.group;
    return (
      <TouchableWithoutFeedback>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}> { groupSymbole }</Text>
            <Text style={styles.titleStyle}> { numberOfGroupUser }</Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default ListItem;