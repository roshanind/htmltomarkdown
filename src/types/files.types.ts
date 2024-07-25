import { SUUID } from 'short-uuid';

export type FileId = SUUID;

export type MDFile = {
  id: FileId;
  name: string;
  content: string;
  fileExtension?: string;
  originalContent?: string;
  lastEditedContent?: string;
  modified?: boolean;
  isViewing?: boolean;
};
