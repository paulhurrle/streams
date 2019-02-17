import {
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
  GET_STREAM,
  GET_ALL_STREAMS,
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_STREAM:
      // [action.payload.id] is ES6 key interpolation
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      // same as above because we are updating state with what is RETURNED
      // from the action creator, which in this case is also a single record
      return { ...state, [action.payload.id]: action.payload };
    case GET_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      const { [action.payload]: values, ...rest } = state;
      return rest;
    case GET_ALL_STREAMS:
      const newState = {};
      action.payload.forEach(stream => {
        newState[stream.id] = stream;
      });
      return { ...state, ...newState };
    default:
      return state;
  }
};