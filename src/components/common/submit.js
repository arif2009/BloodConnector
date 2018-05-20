import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { Actions } from 'react-native-router-flux';
import We from '../../utills/we';
//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const submit = values => {

    const data = JSON.stringify(values);
    const header = { headers: { 'Content-Type': 'application/json' } };
    const url = `${We.apiOrigin}api/account/app_register`;
    const register = axios.post(url, data, header);

    return register
    .then(result => {
        console.log("Success", result);
        //Actions.userList()
    })
    .catch((error) => {
        console.log("Error",error);
    });

    /*return sleep(1000).then(() => {
        if (!['hoang', 'hoangnd', 'ndhoang'].includes(values.username)) {
            throw new SubmissionError({
                username: 'User does not exist',
                _error: 'Login failed!',
            });
        } else if (values.email !== 'sunlight4d@gmail.com') {
            throw new SubmissionError({
                email: 'Wrong email',
                _error: 'Login failed!',
            });
        } else {
            alert(`Validation success. Values = ${JSON.stringify(values)}`);
        }
    });*/
};
export default submit;