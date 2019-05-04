
const initialState = {
    userProjectsIds: [],
    ownProjectsFreeData: [],
    otherProjectsFreeData: []
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
              ownProjectsFreeData: action.payload,
              otherProjectsFreeData: action.payload
          };
      default:
          return state;
  }
}