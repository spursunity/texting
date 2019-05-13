
const initialState = {
    invitationPage: {
        title: 'Invite other user into your projects',
        buttons: [],
        changeProjectListButton: {
            text: 'See your own projects',
            link: '/own-projects'
        }
    },
    projectRequests: [],
    selectedProject: '',
    selectedRequest: null
};

export default function invitation(state = initialState, action) {
    switch (action.type) {
        case 'SET_PROJECT_REQUESTS':
            return {
                ...state,
                projectRequests: action.payload.projectRequests
            };
        case 'SET_REQUEST':
            return {
                ...state,
                selectedRequest: action.payload.selectedRequest
            };
        case 'SET_INVITATION_PROJECT':
            return {
                ...state,
                selectedProject: action.payload.selectedProject
            };
        default:
            return state;
    }
}