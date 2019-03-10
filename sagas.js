import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILURE,
  SAVE_ITEM_REQUEST,
  SAVE_ITEM_SUCCESS,
  SAVE_ITEM_FAILURE,
  DELETE_ITEMS_REQUEST,
  DELETE_ITEMS_SUCCESS,
  DELETE_ITEMS_FAILURE
} from './actions';
import { push } from 'connected-react-router';
import { getToken, getEmail } from '../Main/reducer';
import { get, post, del } from '../../utils/api';
import { getSelectedIds } from './reducer';
import swal from 'sweetalert';

function* getItems() {
  try {
    const token = yield select(getToken);
    const email = yield select(getEmail);
    const { data } = yield call(get, `/users/${email}/items`, token);
    yield put({ type: GET_ITEMS_SUCCESS, payload: JSON.parse(data) });
  } catch (error) {
    yield put({ type: GET_ITEMS_FAILURE, payload: error.message });
    swal(error.message);
  }
}

function* saveItem({ payload }) {
  try {
    const token = yield select(getToken);
    const email = yield select(getEmail);
    yield call(
      post,
      `/users/${email}/items`,
      { Id: payload.id, Text: payload.text, Title: payload.title, UtcUpdateDate: payload.date },
      token
    );
    yield put(push('/'));
    yield put({ type: SAVE_ITEM_SUCCESS, payload });
  } catch (error) {
    yield put({ type: SAVE_ITEM_FAILURE, payload: error.message });
    swal(error.message);
  }
}

function* deleteItems() {
  try {
    const token = yield select(getToken);
    const email = yield select(getEmail);
    const selectedIds = yield select(getSelectedIds);
    yield all(selectedIds.map(selectedId => call(del, `/users/${email}/items`, selectedId, token)));
    yield put({ type: DELETE_ITEMS_SUCCESS });
  } catch (error) {
    yield put({ type: DELETE_ITEMS_FAILURE, payload: error.message });
    swal(error.message);
  }
}

export default [
  takeLatest(GET_ITEMS_REQUEST, getItems),
  takeLatest(SAVE_ITEM_REQUEST, saveItem),
  takeLatest(DELETE_ITEMS_REQUEST, deleteItems)
];
