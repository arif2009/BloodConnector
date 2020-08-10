'use strict';
import _ from 'lodash';
import {reqMsg, maxLength, minValue} from '../../utills/we';
module.exports = {
  //Validation
  required: (value) => (value ? undefined : reqMsg),
  in1To8: (value) => (_.inRange(value, 1, 9) ? undefined : reqMsg),
  is0Or1: (value) => (_.inRange(value, 0, 2) ? undefined : reqMsg),

  number: (value) =>
    value && isNaN(Number(value)) ? 'Must be a number' : undefined,

  maxLength12: maxLength(12),
  maxLength40: maxLength(40),

  minValue6: minValue(6),

  isValidEmail: (value) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? 'Invalid email address'
      : undefined,

  confirmValidators: (value, values) =>
    value === values.Password
      ? undefined
      : "Confirm password doesn't match with password!",

  acceptTerms: (value) =>
    value ? undefined : 'You must accept this terms and conditions!!',

  //Warning
  over70YearsOld: (value) =>
    value && value > 70 ? 'You might be too old for using this' : undefined,
  isYahooMail: (value) =>
    value && /.+@yahoo\.com/.test(value)
      ? 'Really? You still use yahoo mail ?'
      : undefined,
};
