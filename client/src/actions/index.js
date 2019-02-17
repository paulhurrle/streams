import streams from '../apis/streams';
import history from '../history';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
  GET_STREAM,
  GET_ALL_STREAMS,
} from './types';

export const signIn = (id) => ({ type: SIGN_IN, payload: id });

export const signOut = () => ({ type: SIGN_OUT });

export const createStream = (formData) => async (dispatch, getState) => {
  const userId = getState().auth.currentUser;
  const response = await streams.post('/streams', { ...formData, userId });
  dispatch({ type: CREATE_STREAM, payload: response.data });
  // programmatically navigate user to the root route
  history.push('/');
};

export const editStream = (id, formData) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formData);
  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push('/');
};

export const deleteStream = (id) => async dispatch => {
  await streams.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
};

export const getStream = (id) => async dispatch => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({ type: GET_STREAM, payload: response.data });
};

export const getAllStreams = () => async dispatch => {
  const response = await streams.get('/streams');
  dispatch({ type: GET_ALL_STREAMS, payload: response.data });
};