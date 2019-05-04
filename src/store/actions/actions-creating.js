import firebase from '../../firebase/firebase';

export function changeNameProject(event) {
    return {
        type: 'CHANGE_NAME_PROJECT',
        payload: { nameProject: event.target.value }
    }
}

export function changeDescriptionProject(event) {
    return {
        type: 'CHANGE_DESCRIPTION_PROJECT',
        payload: { descriptionProject: event.target.value }
    }
}

export function setNewProject() {
    return async (dispatch, getState) => {
        const stateCreating = getState().creating,
            name = stateCreating.nameProject,
            description = stateCreating.descriptionProject,
            stateAuthorization = getState().authorization,
            uid = stateAuthorization.uid,
            uName = stateAuthorization.uName
        ;

        const response = await firebase.createNewProject(uid, uName, name, description);
        console.log(response);
    }
}