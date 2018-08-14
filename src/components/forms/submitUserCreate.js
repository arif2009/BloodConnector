import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { AsyncStorage, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CREATED_ACC } from '../../actions/types';
import { apiOrigin, processModelstateError } from '../../utills/we';

const submitUserCreate = (values, dispatch) => {
    
    const data = JSON.stringify(values);
    const header = { headers: { 'Content-Type': 'application/json' } };
    const url = `${apiOrigin}api/account/app_register`;
    const {Email, Password} = values;

    const register = axios.post(url, data, header);
    return register.then(() => {
        const data = `grant_type=password&username=${encodeURIComponent(Email)}&password=${encodeURIComponent(Password)}`;
        const header = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
        const url = `${apiOrigin}token`;

        Alert.alert(
            'Congratulations!!',
            'You are joined successfully with us.',
            [{text: 'OK'}],
            {cancelable: false}
        );
        
        axios.post(url, data, header)
            .then(tokenInfo => {
                AsyncStorage.setItem('@auth:userData', JSON.stringify(tokenInfo.data), () => {
                    dispatch({ type: CREATED_ACC });
                    Actions.userList({ token: tokenInfo.data.access_token, rightTitle: '' });
                });
            })
            .catch((error) => {
                console.log(error);
            });
    })
    .catch((error) => {
        let errors = processModelstateError(error);
        errors['_error'] = 'Registration Failed!'
        throw new SubmissionError(errors);
    });
};
export default submitUserCreate;