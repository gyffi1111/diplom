const initState = {
    isLoading: false,
    items: [],
    isAddPhone: false,
    setLoading: false,
    filterBy: 'all',
    searchQuery: ''
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'SET_PHONES':
            return {
                ...state,
                items: action.payload,
                isLoading: true
            };
        case 'SET_FILTER':
            return {
                ...state,
                filterBy: action.payload,
            };
        case 'SET_QUERY':
            return {
                ...state,
                searchQuery: action.payload,
            };
        case 'SET_STATUS_CREATE_PHONE':
            return {
                ...state,
                isAddPhone: action.payload
            };
        case 'SET_IS_LOADING_LIST':
            return {
                ...state,
                setLoading: action.payload
            };
        default:
            return state;
    }
};