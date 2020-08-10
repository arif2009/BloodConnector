import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import AuthReducer from './AuthReducer';
import UserFormReducer from './UserFormReducer';
import BloodReducer from './BloodReducer';
import UserActionReducer from './UserActionReducer';

export default combineReducers({
  auth: AuthReducer,
  userForm: UserFormReducer,
  blood: BloodReducer,
  action: UserActionReducer,
  form: formReducer,
});
