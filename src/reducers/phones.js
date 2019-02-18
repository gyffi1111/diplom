const initState = {
    isLoading: false,
    items: null
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'SET_PHONES':
            return {
                ...state,
                items: action.payload,
                isLoading: true
            };
        case 'SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
};