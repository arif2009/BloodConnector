import {USERS_FETCHING} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  //console.log("UserActionReducer",action);
  switch (action.type) {
    case USERS_FETCHING:
      return {...state, loading: true, error: ''};
    default:
      return state;
  }
};
