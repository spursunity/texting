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
                let errorCode = error.code;
                let errorMessage = error.message;
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
    return (dispatch) => {
        firebase.handlerUserAuth()
            .then((authData) => {
                if (authData !== null) {
                    dispatch(changeUserStatus(authData, 1));
                } else {
                    const emptyData = {
                        uid: '',
                        displayName: ''
                    };
                    dispatch(changeUserStatus(emptyData, -1));
                }
            } )
            .catch((err) => console.log(err.message) )
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

function changeUserStatus(authData, status) {
    if (authData) {
        return {
            type: 'CHANGE_USER_STATUS',
            payload: {
                uid: authData.uid || '',
                uName: authData.displayName || '',
                isUserAuthorized: status
            }
        }
    }
}