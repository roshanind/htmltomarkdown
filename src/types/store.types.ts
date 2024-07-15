import * as actionTypes from '@store/actionTypes';
import { FileContent } from './files.types';

export type State = {
  files: FileContent[];
  viewingFile: string | null;
};

export type Action =
  | {
      type: typeof actionTypes.ADD_FILES;
      payload: FileContent;
    }
  | {
      type: typeof actionTypes.SET_VIEWING_FILE;
      payload: string;
    }
  | {
      type: typeof actionTypes.DELETE_FILE;
      payload: string;
    }
  | {
      type: typeof actionTypes.UPDATE_FILE;
      payload: FileContent;
    };
