import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserFormReducer from './UserFormReducer';
import BloodReducer from './BloodReducer';
import UserActionReducer from './UserActionReducer';

export default combineReducers({
	auth: AuthReducer,
	userForm: UserFormReducer,
	blood: BloodReducer,
	action: UserActionReducer
});