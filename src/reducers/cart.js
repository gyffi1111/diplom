const initState = {
    items: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                items: [
                    ...state.items,
                    action.payload
                ]
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(v => v.id !== action.payload)
            };
        default:
            return state;
    }
};