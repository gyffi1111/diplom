const initState = {
    items: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'ADD_ITEM_TO_CART':
            return {
                ...state,
                items: [
                    ...state.items,
                    action.payload
                ]
            };
        case 'REMOVE_ITEM_FROM_CART':
            return {
                ...state,
                items: state.items.filter(v => v.id !== action.payload)
            };
        default:
            return state;
    }
};