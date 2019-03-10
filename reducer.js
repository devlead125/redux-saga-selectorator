import { normalize, schema } from 'normalizr';
import { formValueSelector } from 'redux-form';
import { createSelector } from 'selectorator';
import moment from 'moment';
import {
  TOOGLE_SELECT_ALL,
  TOGGLE_SELECT_BY_ID,
  GET_ITEMS_SUCCESS,
  SAVE_ITEM_SUCCESS,
  DELETE_ITEMS_SUCCESS,
  UPDATE_SORT_BY,
  DELETE_ITEM_SUCCESS,
  AUTO_SAVE_ITEM_SUCCESS
} from './actions';

const initialState = {
  selectAllChecked: false,
  items: {},
  selectedIds: [],
  sortBy: 'date'
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOOGLE_SELECT_ALL:
      return {
        ...state,
        selectAllChecked: !state.selectAllChecked,
        selectedIds: state.selectAllChecked ? [] : Object.keys(state.items)
      };
    case TOGGLE_SELECT_BY_ID:
      return {
        ...state,
        selectedIds: state.selectedIds.includes(payload)
          ? state.selectedIds.filter(id => id !== payload)
          : [...state.selectedIds, payload]
      };
    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        items: normalize(payload, [new schema.Entity('items')]).entities.items
      };
    case DELETE_ITEMS_SUCCESS:
      return { ...state, items: state.items.filter(item => !state.selectedIds.include(item.id)), selectedIds: [] };
    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.filter(item => item.id !== payload),
        selectedIds: state.selectedIds.filter(id => id !== payload)
      };
    case SAVE_ITEM_SUCCESS:
    case AUTO_SAVE_ITEM_SUCCESS:
      return { ...state, items: { ...state.items, [payload.id]: payload } };
    case UPDATE_SORT_BY: {
      return { ...state, sortBy: state.sortBy === payload ? `-${payload}` : payload };
    }
    default:
      return state;
  }
};

export const getItems = createSelector(
  ['items', 'items'],
  ['itmes', 'selectedIds'],
  ['itmes', 'sortBy'],
  state => formValueSelector('search')(state, 'search'),
  (items, selectedIds, sortBy, search) =>
    items &&
    Object.values(items)
      .map(item => ({
        ...item,
        date: moment(item.date).format('D MMMM, YYYY'),
        selected: selectedIds.includes(item.id)
      }))
      .filter(({ title, date, text }) => title.includes(search) || date.includes(search) || text.includes(search))
      .sort((a, b) =>
        sortBy.includes('-')
          ? b[sortBy.substring(1)].localeCompare(a[sortBy.substring(1)])
          : a[sortBy].localeCompare(b[sortBy])
      )
);
