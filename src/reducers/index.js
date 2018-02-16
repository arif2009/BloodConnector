import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserFormReducer from './UserFormReducer';
import BloodReducer from './BloodReducer';

export default combineReducers({
	auth: AuthReducer,
	userForm: UserFormReducer,
	blood: BloodReducer
});