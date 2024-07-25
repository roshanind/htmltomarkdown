import { MDFile } from '@type/files.types';
import { Action, State } from '../types/store.types';
import * as actionTypes from './actionTypes';

export const initialState: State = {
  files: [],
  viewingFile: null,
};

/**
 * Reducer function that handles state updates based on dispatched actions.
 * @param state - The current state.
 * @param action - The dispatched action.
 * @returns The updated state.
 */
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case actionTypes.ADD_FILE: {
      // check whether the file is already in the state
      const fileExists = state.files?.some((file) => file.id === action.payload.id);

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
        files: state.files.map((file) => (file.id === action.payload.id ? action.payload : file)),
      };
    }
    case actionTypes.UPDATE_FILE: {
      const { files } = state;
      const currentFileIndex = files.findIndex((file) => file.id === action.payload.id);
      const currentFile = files[currentFileIndex];

      const updatedFile: MDFile = {
        ...currentFile,
        ...action.payload,
        lastEditedContent: currentFile.content,
        modified: currentFile.content !== action.payload.content || currentFile.name !== action.payload.name,
      };

      return {
        ...state,
        files: [...files.slice(0, currentFileIndex), updatedFile, ...files.slice(currentFileIndex + 1)],
      };
    }
    case actionTypes.DELETE_FILE: {
      return {
        ...state,
        files: state.files.filter((file) => file.id !== action.payload),
      };
    }
    case actionTypes.BULK_UPDATE_FILES: {
      return {
        ...state,
        files: action.payload,
      };
    }
    case actionTypes.SET_VIEWING_FILE: {
      let viewingFile: MDFile | null = null;

      const files = state.files.map((file) => {
        if (file.id === action.payload) {
          viewingFile = file;
          return {
            ...file,
            isViewing: true,
          };
        } else if (file.isViewing) {
          return {
            ...file,
            isViewing: false,
          };
        }

        return file;
      });

      return {
        ...state,
        files,
        viewingFile,
      };
    }
    case actionTypes.LOAD_FROM_LOCAL_STORAGE: {
      return {
        ...state,
        files: action.payload,
      };
    }
    default:
      console.log('Unknown action type:', action);
      return state;
  }
}

export default reducer;
