import React from 'react';
import {Text} from 'react-native';
import Communications from 'react-native-communications';
import {H1} from 'native-base';
import {txtMedium, mb5, txtRed, txtBold, txtBlue, mbSm} from '../styles';

export const InfoModal = ({
  bloodGroup,
  fullName,
  bloodGiven,
  phoneNumber,
  email,
}) => {
  return (
    <>
      <Text> </Text>
      <H1 style={[txtRed, txtBold]}>{bloodGroup}</H1>
      <Text style={[txtMedium, mb5]}>{fullName}</Text>
      {bloodGiven > 0 && (
        <Text style={mb5}>Given blood {bloodGiven} times</Text>
      )}
      <Text
        style={[txtBlue, mb5]}
        onPress={() => Communications.phonecall(phoneNumber, true)}>
        {phoneNumber}
      </Text>
      <Text
        style={[txtBlue, mbSm]}
        onPress={() =>
          Communications.email(
            [email],
            null,
            null,
            `Need ${bloodGroup} blood`,
            null,
          )
        }>
        {email}
      </Text>
    </>
  );
};
