import { FileContent } from '@type/files.types';
import * as actionTypes from './actionTypes';
import { Dispatch } from 'react';
import { Action } from '@type/store.types';

export const actionsFactory = (dispatch: Dispatch<Action>) => ({
  addContent: (content: FileContent) =>
    dispatch({
      type: actionTypes.ADD_FILES,
      payload: content,
    }),
  updateContent: (content: FileContent) =>
    dispatch({
      type: actionTypes.UPDATE_FILE,
      payload: content,
    }),
  deleteFile: (fileName: string) =>
    dispatch({
      type: actionTypes.DELETE_FILE,
      payload: fileName,
    }),
  bulkUpdateFiles: (files: FileContent[]) =>
    dispatch({
      type: actionTypes.BULK_UPDATE_FILES,
      payload: files,
    }),
  setViewingFile: (fileName: string) =>
    dispatch({
      type: actionTypes.SET_VIEWING_FILE,
      payload: fileName,
    }),
  loadFromLocalStorage: (files: FileContent[]) =>
    dispatch({
      type: actionTypes.LOAD_FROM_LOCAL_STORAGE,
      payload: files,
    }),
});
