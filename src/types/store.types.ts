import * as actionTypes from '@store/actionTypes';
import { FileContent } from './files.types';

export type State = {
  files: FileContent[];
};

export type Action =
  | {
      type: typeof actionTypes.ADD_FILES;
      payload: FileContent;
    }
  | {
      type: typeof actionTypes.DELETE_FILE;
      payload: string;
    }
  | {
      type: typeof actionTypes.UPDATE_FILE;
      payload: FileContent;
    }
  | {
      type: typeof actionTypes.SET_VIEWING_FILE;
      payload: string | null;
    }
  | {
      type: typeof actionTypes.LOAD_FROM_LOCAL_STORAGE;
      payload: FileContent[];
    }
  | {
      type: typeof actionTypes.BULK_UPDATE_FILES;
      payload: FileContent[];
    };
