import firebase from '../../firebase/firebase';

export function changeMotivation(event) {
    return {
        type: 'CHANGE_MOTIVATION',
        payload: {
            motivation: event.target.value
        }
    };
}

export function checkExistingRequests(projectId) {
    return async (dispatch) => {
        try {
            const data = await firebase.checkExistingRequests(projectId);
            const requests = data.val();

            dispatch(addRequest(projectId, requests));

        } catch (err) {
            console.log('Error: ' + err.message);
        }
    }
}

function addRequest(projectId) {
    return async (dispatch, getState) => {
        try {
            const requestState = getState().request,
                authorizationState = getState().authorization,
                motivation = requestState.motivation,
                uid = authorizationState.uid,
                uName = authorizationState.uName,
                ownRequest = {
                uName,
                motivation
            }
            ;

            const response = await firebase.sendRequest(projectId, uid, ownRequest);

            dispatch(setInitialState());
        } catch (err) {
            console.log(err.message);
        }

    }
}

export function setInitialState() {
    const InitialText = 'I am the best...';

    return {
        type: 'SET_INITIAL_STATE',
        payload: {
            motivation: InitialText
        }
    }
}