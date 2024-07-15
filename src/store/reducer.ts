import { Action, State } from '../types/store.types';
import * as actionTypes from './actionTypes';

export const initialState: State = {
  files: [],
  viewingFile: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case actionTypes.ADD_FILES: {
      // check whether the file is already in the state
      const fileExists = state.files?.some((file) => file.name === action.payload.name);

      // if the file is not in the state, add it
      if (!fileExists) {
        return {
          ...state,
          files: [...state.files, action.payload],
        };
      }

      // if the file is already in the state, update it
      return {
        ...state,
        files: state.files.map((file) => (file.name === action.payload.name ? action.payload : file)),
      };
    }
    case actionTypes.UPDATE_FILE: {
      return {
        ...state,
        files: state.files.map((file) => (file.name === action.payload.name ? action.payload : file)),
      };
    }
    case actionTypes.DELETE_FILE: {
      return {
        ...state,
        files: state.files.filter((file) => file.name !== action.payload),
      };
    }
    case actionTypes.SET_VIEWING_FILE: {
      return {
        ...state,
        viewingFile: action.payload,
      };
    }
    default:
      console.log('Unknown action type:', action);
      return state;
  }
}

export default reducer;
