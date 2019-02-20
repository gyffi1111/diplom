export const setPhones = (phones) => ({
    type: 'SET_PHONES',
    payload: phones
});

export const setIsLoadingList = (setLoading) => ({
    type: 'SET_IS_LOADING_LIST',
    payload: setLoading
});

export const setStatusCreatePhone = (status) => ({
    type: 'SET_STATUS_CREATE_PHONE',
    payload: status
});

export const setFilter = (filterBy) => ({
    type: 'SET_FILTER',
    payload: filterBy
});

export const setSearchQuery = value => ({
    type: 'SET_QUERY',
    payload: value,
});