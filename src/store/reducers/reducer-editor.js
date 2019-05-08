
const initialState = {
    projectBody: 'test'
};

export default function editor(state = initialState, action) {
    switch (action.type) {
        case 'SET_PROJECT_BODY':
            return {
                ...state,
                projectBody: action.payload.text
            };
        case 'CHANGE_PROJECT_TEXT':
            return {
                ...state,
                projectBody: action.payload.text
            };
        default:
            return state;
    }
};