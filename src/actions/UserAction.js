import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  USER_UPDATE, USER_CREATE, USERS_FETCHING,
  USERS_FETCH_ERROR, USERS_FETCH_SUCCESS, 
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

export const userFetch = ({ authToken }) => {
	return (dispatch) => {
		dispatch({ type: USERS_FETCHING });
    axios({
      method:'get',
      url:'http://bloodconnector.org/api/users',
      headers: { 'Authorization': 'bearer ' + authToken },
      responseType:'json'
    })
    .then(result => userFetchSuccess(dispatch, result))
    .catch((error) => userFetchFail(dispatch, error));
	};
};

const userFetchFail = (dispatch, error) => {
	dispatch({ type: USERS_FETCH_ERROR});
};

const userFetchSuccess = (dispatch, result) => {
	dispatch({
    type: USERS_FETCH_SUCCESS, 
    payload: result.data
  });
  //Actions.home({rightTitle: ''});
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
