
const initialState = {
    nameProject: 'Name Project',
    descriptionProject: 'It\'s my project...'
};

export default function creating(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_NAME_PROJECT':
            return {
                ...state,
                nameProject: action.payload.nameProject
            };
        case 'CHANGE_DESCRIPTION_PROJECT':
            return {
                ...state,
                descriptionProject: action.payload.descriptionProject
            };
        default:
            return state;
    }
};