import uuid from 'uuid/v1';
import moment from 'moment';

export const TOOGLE_SELECT_ALL = 'TOOGLE_SELECT_ALL';
export const TOGGLE_SELECT_BY_ID = 'TOGGLE_SELECT_BY_ID';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILURE = 'GET_ITEMS_FAILURE';

export const DELETE_ITEMS_REQUEST = 'DELETE_ITEMS_REQUEST';
export const DELETE_ITEMS_SUCCESS = 'DELETE_ITEMS_SUCCESS';
export const DELETE_ITEMS_FAILURE = 'DELETE_ITEMS_FAILURE';

export const SAVE_ITEM_REQUEST = 'SAVE_ITEM_REQUEST';
export const SAVE_ITEM_SUCCESS = 'SAVE_ITEM_SUCCESS';
export const SAVE_ITEM_FAILURE = 'SAVE_ITEM_FAILURE';

export const UPDATE_SORT_BY = 'UPDATE_SORT_BY';

export const toggleSelectAll = () => ({
	type: TOOGLE_SELECT_ALL
});

export const toggleSelectById = (id) => ({
	type: TOGGLE_SELECT_BY_ID,
	payload: id
});

export const getItems = () => ({
	type: GET_ITEMS_REQUEST
});

export const deleteItems = () => ({
	type: DELETE_ITEMS_REQUEST
});

export const saveItem = (id, text, title) => ({
	type: SAVE_ITEM_REQUEST,
	payload: {
		id: id == null ? uuid() : id,
		date: moment().format('YYYY-MM-DD'),
		text,
		title
	}
});

export const updateSortBy = (payload) => ({
	type: UPDATE_SORT_BY,
	payload
});
