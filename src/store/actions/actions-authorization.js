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
        const stateAuthorization = getState().authorization,
            { userName, userEmail, userPassword, authStatuses } = stateAuthorization
        ;
        firebase.register(userName, userEmail, userPassword)
            .then((response) => {
                const authData = response.user;

                dispatch(changeUserStatus(authData, authStatuses.userIsAuthorized));
                dispatch(clearInputs());
            })
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
        const stateAuthorization = getState().authorization,
            { userEmail, userPassword, authStatuses } = stateAuthorization
        ;
        firebase.signIn(userEmail, userPassword)
            .then((response) => {
                const authData = response.user;

                dispatch(changeUserStatus(authData, authStatuses.userIsAuthorized));
                dispatch(clearInputs());
            })
            .catch((err) => {
                console.log('Data: ' + err.message);
                dispatch(clearInputs())
            })
    }
}

export function signOut() {
    return async (dispatch, getState) => {
        try {
            await firebase.signOut();
            const emptyData = {
                uid: '',
                displayName: ''
            },
                stateAuthorization = getState().authorization,
                { authStatuses } = stateAuthorization
            ;

            dispatch(changeUserStatus(emptyData, authStatuses.userIsUnauthorized));
        } catch (err) {
            console.log(err.message);
        }
    }
}

export function setAuthHandler() {
    return (dispatch, getState) => {
        const stateAuthorization = getState().authorization,
            { authStatuses } = stateAuthorization
        ;
        firebase.handlerUserAuth()
            .then((authData) => {
                if (authData !== null) {
                    dispatch(changeUserStatus(authData, authStatuses.userIsAuthorized));
                } else {
                    const emptyData = {
                        uid: '',
                        displayName: ''
                    };
                    dispatch(changeUserStatus(emptyData, authStatuses.userIsUnauthorized));
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