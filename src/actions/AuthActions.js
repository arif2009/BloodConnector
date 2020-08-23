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

export const loginUser = (values, dispatch, navigation) => {
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
    .then((tokenInfo) => loginUserSuccess(dispatch, navigation, tokenInfo))
    .catch((error) => loginUserFail(dispatch, error));
};

const loginUserFail = (dispatch, error) => {
  console.log('failed login', error);
  dispatch({type: LOGIN_USER_FAIL});
  let errors = processModelstateError(error);
  errors._error = 'Invalid Email or Password!';
  throw new SubmissionError(errors);
};

const loginUserSuccess = (dispatch, navigation, tokenInfo) => {
  console.log('no failed login');
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: tokenInfo.data,
  });
  return navigation.navigate('UserList');
};
