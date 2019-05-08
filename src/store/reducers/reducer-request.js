
const initialState = {
    motivation: 'I am the best...'
};

export default function request(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_MOTIVATION':
            return {
                ...state,
                motivation: action.payload.motivation
            };
        case 'SET_INITIAL_STATE':
            return {
                ...state,
                motivation: action.payload.motivation
            };
        default:
            return state;
    }
};