import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import AuthReducer from './AuthReducer';
import UserFormReducer from './UserFormReducer';
import BloodReducer from './BloodReducer';
import UserLoadingReducer from './UserLoadingReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, AuthReducer);

export default combineReducers({
  persistedStore: persistedReducer,
  userForm: UserFormReducer,
  blood: BloodReducer,
  userLoading: UserLoadingReducer,
  form: formReducer,
});
