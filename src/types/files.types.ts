export type FileContent = {
  name: string;
  content: string;
  fileExtension?: string;
  originalContent?: string;
  lastEditedContent?: string;
  modified?: boolean;
  isViewing?: boolean;
};
