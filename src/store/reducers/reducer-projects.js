
const initialState = {
    userProjectsIds: [],
    ownProjectsFreeData: [],
    otherProjectsFreeData: [],
    ownProjectsPage: {
        title: 'Your own projects',
        buttons: [
            {
                text: 'Edit',
                link: '/editor/',
                dynamicLink: true
            },
            {
                text: 'Leave',
                link: ''
            },
            {
                text: 'Invite',
                link: '/invitations/',
                dynamicLink: true
            }
        ],
        changeProjectListButton: {
            text: 'See other projects',
            link: '/other-projects'
        }
    },
    otherProjectsPage: {
        title: 'Projects of other users',
        buttons: [
            {
                text: 'Request',
                link: '/request/',
                dynamicLink: true
            }
        ],
        changeProjectListButton: {
            text: 'See your own projects',
            link: '/own-projects'
        }
    },
    selectedId: ''
};

export default function projects(state = initialState, action) {
  switch (action.type) {
      case 'SET_OWN_PROJECTS_IDS':
          return {
              ...state,
              userProjectsIds: action.payload
          };
      case 'SET_PROJECTS_FREE_DATA':
          return {
              ...state,
              ownProjectsFreeData: action.payload.own,
              otherProjectsFreeData: action.payload.other
          };
      case 'SET_SELECTED_PROJECT':
          return {
              ...state,
              selectedId: action.payload.selectedId
          };
      default:
          return state;
  }
}
