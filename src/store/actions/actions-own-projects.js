import firebase from '../../firebase/firebase';

export function getIdsOwnProjects() {
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

        dispatch(setProjectsIds(ownProjectsIds));

        const freeData = await firebase.getFreeData(),
            projectsFreeData = freeData.val()
        ;
        let ownProjectsData = [],
            otherProjectsData = []
        ;

        for (let key in projectsFreeData) {
            if (projectsFreeData.hasOwnProperty(key)) {
                if (ownProjectsIds.includes(key)) {
                    ownProjectsData.push(projectsFreeData[key]);
                } else {
                    otherProjectsData.push(projectsFreeData[key]);
                }

            }
        }

        dispatch(setProjectsFreeData(ownProjectsData, otherProjectsData));
    }
}

function setProjectsIds(projectsIds) {
    return {
        type: 'SET_OWN_PROJECTS_IDS',
        payload: projectsIds
    }
}

function setProjectsFreeData(ownProjectsFreeData, otherProjectsData) {
    return {
        type: 'SET_PROJECTS_FREE_DATA',
        payload: {
            own: ownProjectsFreeData,
            other: otherProjectsData
        }
    }
}