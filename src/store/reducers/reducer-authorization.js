
const initialState = {
    userName: '',
    userEmail: '',
    userPassword: '',
    isUserAuthorized: 0,
    uid: 0,
    uName: ''
};

export default function authorization(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_NAME':
            return {
                ...state,
                userName: action.payload.userName
            };
        case 'CHANGE_EMAIL':
            return {
                ...state,
                userEmail: action.payload.userEmail
            };
        case 'CHANGE_PASSWORD':
            return {
                ...state,
                userPassword: action.payload.userPassword
            };
        case 'CLEAR_INPUTS':
            return {
                ...state,
                userName: action.payload.userName,
                userEmail: action.payload.userEmail,
                userPassword: action.payload.userPassword
            };
        case 'CHANGE_USER_STATUS':
            return {
                ...state,
                uid: action.payload.uid,
                isUserAuthorized: action.payload.isUserAuthorized,
                uName: action.payload.uName
            };
        default:
            return state;
    }
}