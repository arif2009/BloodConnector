import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  USER_UPDATE, USER_CREATE, USERS_FETCHING,
  USER_SAVE_SUCCESS
} from './types';

export const userUpdate = ({ prop, value }) => {
  return {
    type: USER_UPDATE,
    payload: { prop, value }
  };
};

export const userCreate = ({ name, phone, sex }) => {
  return () => {
    console.log(name, phone, sex);
  };
  
  /*const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_CREATE });
        Actions.employeeList({ type: 'reset' });
      });
  };*/
};

export const userFetch = ({ token }) => {
	return (dispatch) => {
		dispatch({ type: USERS_FETCHING });
   return axios({
      method:'get',
      url:'http://www.bloodconnector.org/api/users',
      timeout: 5000,
      headers: { 'Authorization': 'bearer ' + token },
      responseType:'json'
    });
	};
};

/*export const employeesFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const employeeSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
        Actions.employeeList({ type: 'reset' });
      });
  };
};

export const employeeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(() => {
        Actions.employeeList({ type: 'reset' });
      });
  };
};*/
