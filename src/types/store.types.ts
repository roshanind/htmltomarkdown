import * as actionTypes from '@store/actionTypes';
import { FileId, MDFile } from './files.types';

export type State = {
  files: MDFile[];
  viewingFile: MDFile | null;
};

export type Action =
  | {
      type: typeof actionTypes.ADD_FILE;
      payload: MDFile;
    }
  | {
      type: typeof actionTypes.DELETE_FILE;
      payload: string;
    }
  | {
      type: typeof actionTypes.UPDATE_FILE;
      payload: Partial<MDFile>;
    }
  | {
      type: typeof actionTypes.SET_VIEWING_FILE;
      payload: FileId | null;
    }
  | {
      type: typeof actionTypes.LOAD_FROM_LOCAL_STORAGE;
      payload: MDFile[];
    }
  | {
      type: typeof actionTypes.BULK_UPDATE_FILES;
      payload: MDFile[];
    };
