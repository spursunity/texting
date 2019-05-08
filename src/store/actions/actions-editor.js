import firebase from '../../firebase/firebase';

export function getProjectBody(projectId) {
    return async (dispatch) => {
        const data = await firebase.getMainData(projectId);

        dispatch(setProjectBody(data.val()));
    }
}

export function changeProjectText(event) {
    return {
        type: 'CHANGE_PROJECT_TEXT',
        payload: {
            text: event.target.value
        }
    }
}

export function pushProjectChanges(id) {
    return async (dispatch, getState) => {
        const editorState = getState().editor;
        const body = editorState.projectBody;
        const resolve = await firebase.updateProjectBody(id, body);

        console.log(resolve);
    }
}

function setProjectBody(text) {
    return {
        type: 'SET_PROJECT_BODY',
        payload: {
            text
        }
    };
}