import axios from 'axios';
import {SubmissionError} from 'redux-form';
import {AsyncStorage, Alert} from 'react-native';
//import {Actions} from 'react-native-router-flux';
import {LOGIN_USER_FAIL, LOGIN_USER_SUCCESS} from '../../actions/types';
import {apiOrigin, processModelstateError} from '../../utills/we';

const submitLoginForm = (values, dispatch) => {
  const {email, password} = values;

  const data = `grant_type=password&username=${encodeURIComponent(
    email,
  )}&password=${encodeURIComponent(password)}`;
  const header = {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  };
  const url = `${apiOrigin}token`;

  return axios
    .post(url, data, header)
    .then((tokenInfo) => loginUserSuccess(dispatch, tokenInfo))
    .catch((error) => loginUserFail(dispatch, error));
};

const loginUserFail = (dispatch, error) => {
  dispatch({type: LOGIN_USER_FAIL});
  let errors = processModelstateError(error);
  errors['_error'] = 'Invalid Email or Password!';
  throw new SubmissionError(errors);
};

const loginUserSuccess = (dispatch, tokenInfo) => {
  AsyncStorage.setItem('@auth:userData', JSON.stringify(tokenInfo.data), () => {
    console.log('Stored auth info');
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: tokenInfo.data,
    });
    //Actions.userList({token: tokenInfo.data.access_token, rightTitle: ''});
  });
};

export default submitLoginForm;
