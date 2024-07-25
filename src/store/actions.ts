import { FileId, MDFile } from '@type/files.types';
import * as actionTypes from './actionTypes';
import { Dispatch } from 'react';
import { Action } from '@type/store.types';

export const actionsFactory = (dispatch: Dispatch<Action>) => ({
  addFile: (file: MDFile) =>
    dispatch({
      type: actionTypes.ADD_FILE,
      payload: file,
    }),
  updateFile: (file: Partial<MDFile>) =>
    dispatch({
      type: actionTypes.UPDATE_FILE,
      payload: file,
    }),
  deleteFile: (fileId: FileId) =>
    dispatch({
      type: actionTypes.DELETE_FILE,
      payload: fileId,
    }),
  bulkUpdateFiles: (files: MDFile[]) =>
    dispatch({
      type: actionTypes.BULK_UPDATE_FILES,
      payload: files,
    }),
  setViewingFile: (fileId: FileId) =>
    dispatch({
      type: actionTypes.SET_VIEWING_FILE,
      payload: fileId,
    }),
  loadFromLocalStorage: (files: MDFile[]) =>
    dispatch({
      type: actionTypes.LOAD_FROM_LOCAL_STORAGE,
      payload: files,
    }),
});
