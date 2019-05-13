import firebase from '../../firebase/firebase';

export function setProjectRequests(projectId) {
    return async (dispatch) => {
        try {
            const response = await firebase.getProjectRequests(projectId),
                projectRequests = response.val() || []
            ;
            
            if (!projectRequests.length) {
                const requests = [];
                for (let key in projectRequests) {
                     if (projectRequests.hasOwnProperty(key)) {
                         let objectRequest = { ...projectRequests[key] };
                         objectRequest.uid = key;
                         requests.push(objectRequest);
                     }
                }
                dispatch(setStateRequests(requests));
                return ;
            }

            dispatch(setStateRequests(projectRequests));
        } catch (err) {
            console.log(err.message);
        }  
        
    }
}

function setStateRequests(projectRequests) {
    return {
        type: 'SET_PROJECT_REQUESTS',
        payload: {
            projectRequests
        }
    }
}

export function findRequest(requests, id) {
    const selectedRequestInArray = requests.filter((request) => {
            return id === request.uid;
        }),
        selectedRequest = selectedRequestInArray[0] || null
    ;

    return {
        type: 'SET_REQUEST',
        payload: {
            selectedRequest
        }
    }
}

export function setProjectForInvitation(id) {
    return {
        type: 'SET_INVITATION_PROJECT',
        payload: {
            selectedProject: id
        }
    }
}

export function removeRequest() {
    return async (dispatch, getState) => {
        try {
            const invitationState = getState().invitation,
                projectsState = getState().projects,
                projectId = invitationState.selectedProject,
                uid = projectsState.selectedId
            ;

            await firebase.removeRequest(projectId, uid);
            await dispatch(setProjectRequests(projectId));
        } catch (err) {
            console.log(err.message);
        }
    }
}

export function acceptUser() {
    return async (dispatch, getState) => {
        try {
            const invitationState = getState().invitation,
                projectId = invitationState.selectedProject,
                { uid, uName } = invitationState.selectedRequest,
                responseIds = await firebase.getUsersIds(projectId),
                { usersIds } = responseIds.val(),
                responseFreeData = await firebase.getFreeData(projectId),
                projectFreeData = responseFreeData.val()
            ;

            usersIds.push(uid);
            projectFreeData.usersNames = [...projectFreeData.usersNames, uName];

            await firebase.updateUsersInProject(projectId, usersIds, projectFreeData);
            await dispatch(removeRequest());
        } catch (err) {
            console.log(err.message);
        }
    }
}