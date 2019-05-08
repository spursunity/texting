import firebase from '../../firebase/firebase';

export function setIdsAndFreeData() {
    return async (dispatch, getState) => {
        const usersIds = await firebase.getUsersIds(),
            projectsIds = usersIds.val(),
            uid = getState().authorization.uid
        ;
        let ownProjectsIds = [];

        for (let key in projectsIds) {
            const usersIds = projectsIds[key].usersIds || [];

            if (projectsIds.hasOwnProperty(key) && usersIds.includes(uid)) {
                ownProjectsIds.push(key);
            }
        }

        dispatch(pushProjectsIdsToState(ownProjectsIds));
        dispatch(setFreeData(ownProjectsIds));
    }
}

function setFreeData(ownProjectsIds) {
    return async (dispatch) => {
        const freeData = await firebase.getFreeData(),
            projectsFreeData = freeData.val()
        ;
        let ownProjectsData = [],
            otherProjectsData = []
        ;

        for (let key in projectsFreeData) {
            if (projectsFreeData.hasOwnProperty(key)) {
                projectsFreeData[key]['id'] = key;

                if (ownProjectsIds.includes(key)) {
                    ownProjectsData.push(projectsFreeData[key]);
                } else {
                    otherProjectsData.push(projectsFreeData[key]);
                }
            }
        }
        dispatch(pushFreeDataToState(ownProjectsData, otherProjectsData));
    }
}

function pushProjectsIdsToState(projectsIds) {
    return {
        type: 'SET_OWN_PROJECTS_IDS',
        payload: projectsIds
    }
}

function pushFreeDataToState(ownProjectsFreeData, otherProjectsData) {
    return {
        type: 'SET_PROJECTS_FREE_DATA',
        payload: {
            own: ownProjectsFreeData,
            other: otherProjectsData
        }
    }
}

export function selectProject(projectId) {
    return {
        type: 'SET_SELECTED_PROJECT',
        payload: {
            selectedProjectId: projectId
        }
    };
}

export function removeUserFromProject(projectId) {
    return async (dispatch, getState) => {
        const authState = getState().authorization,
            uid = authState.uid,
            uName = authState.uName,
            responseUserIds = await firebase.getUsersIds(projectId),
            projectUsersIds = responseUserIds.val().usersIds,
            updatedUsersIds = projectUsersIds.filter((id) => {
                return id !== uid;
            });
        let updatedProjectFreeData = [];

        if (updatedUsersIds.length === 0) {
            const body = [];

            await firebase.updateProjectBody(projectId, body);
        } else {
            const responseFreeData = await firebase.getFreeData(projectId),
                projectFreeData = responseFreeData.val(),
                usersNames = [...projectFreeData.usersNames],
                updatedUsersNames = usersNames.filter((name) => {
                    return uName !== name;
                })
                ;
            updatedProjectFreeData = {
                ...projectFreeData,
                usersNames: updatedUsersNames
            };
        }


        await firebase.updateUsersInProject(projectId, updatedUsersIds, updatedProjectFreeData);
        dispatch(setIdsAndFreeData());
    }
}