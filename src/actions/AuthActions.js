import axios from 'axios';
import {SubmissionError} from 'redux-form';
import {LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, LOG_OUT} from './types';
import {apiOrigin, processModelstateError} from '../utills/we';

export const logOut = (dispatch, navigation) => {
  const url = `${apiOrigin}api/Account/Logout`;
  axios.post(url);
  dispatch({type: LOG_OUT});

  return navigation.navigate('Home');
};

export const loginUser = (values, dispatch, {navigation}) => {
  const {email, password} = values;
  console.log('values', values, 'navigation', navigation);

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
  console.log('Stored auth info');
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: tokenInfo.data,
  });
  /*AsyncStorage.setItem('@auth:userData', JSON.stringify(tokenInfo.data), () => {
    //Actions.userList({token: tokenInfo.data.access_token, rightTitle: ''});
  });*/
};

/*export const authInfo = () => {
  return (dispatch) => {
    dispatch({type: AUTH_INFO});
    AsyncStorage.getItem('@auth:userData', (error, result) =>
      dispatchUserData(dispatch, error, result),
    );
  };
};

const dispatchUserData = (dispatch, error, result) => {
  dispatch({
    type: AUTH_INFO_DISPATCHED,
    payload: JSON.parse(result),
  });
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text,
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text,
  };
};

*/
