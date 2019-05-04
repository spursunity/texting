import firebase from '../../firebase/firebase';


export function changeName(event) {
    return {
        type: 'CHANGE_NAME',
        payload: { userName: event.target.value }
    };
}

export function changeEmail(event) {
    return {
        type: 'CHANGE_EMAIL',
        payload: { userEmail: event.target.value }
    };
}

export function changePassword(event) {
    return {
        type: 'CHANGE_PASSWORD',
        payload: { userPassword: event.target.value }
    };
}

export function signUp() {
    return (dispatch, getState) => {
        const stateAuthorization = getState().authorization;
        const name = stateAuthorization.userName;
        const email = stateAuthorization.userEmail;
        const password = stateAuthorization.userPassword;
        firebase.register(name, email, password)
            .then(() => dispatch(clearInputs()))
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
                dispatch(clearInputs());
            })
    }
}

export function signIn() {
    return (dispatch, getState) => {
        const stateAuthorization = getState().authorization;
        const email = stateAuthorization.userEmail;
        const password = stateAuthorization.userPassword;
        firebase.signIn(email, password)
            .then(() => dispatch(clearInputs()))
            .catch((err) => {
                console.log(err.message);
                dispatch(clearInputs())
            })
    }
}

export function setAuthHandler() {
    return async (dispatch) => {
        const userAuth = await firebase.handlerUserAuth();

        dispatch(changeUserStatus(userAuth));
    }
}

function clearInputs() {
  return {
      type: 'CLEAR_INPUTS',
      payload: {
          userName: '',
          userEmail: '',
          userPassword: ''
      }
  };
}

function changeUserStatus(userStatus) {
    if (userStatus) {
        return {
            type: 'CHANGE_USER_STATUS',
            payload: {
                uid: userStatus.uid,
                uName: userStatus.displayName,
                isUserAuthorized: !!userStatus
            }
        }
    }
}