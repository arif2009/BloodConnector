import axios from 'axios';
import {apiOrigin} from '../utills/we';
import {USER_UPDATE, USERS_FETCHING} from './types';

export const userUpdate = ({prop, value}) => {
  return {
    type: USER_UPDATE,
    payload: {prop, value},
  };
};

export const userFetch = ({token}) => {
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
