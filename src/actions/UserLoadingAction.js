import axios from 'axios';
import {apiOrigin} from '../utills/we';
import {USERS_FETCHING} from './types';

export const userFetch = (token) => {
  //console.log('token', token);
  return (dispatch) => {
    dispatch({type: USERS_FETCHING});

    const url = `${apiOrigin}api/users`;
    return axios({
      method: 'get',
      url: url,
      timeout: 10000,
      headers: {Authorization: 'bearer ' + token},
      responseType: 'json',
    });
  };
};
