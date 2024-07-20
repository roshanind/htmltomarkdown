/**
 * Reads a file and returns its contents as a string with progress tracking.
 *
 * @param file - The file to read.
 * @param onProgress - A callback function to track the progress of the file reading operation.
 * @returns A Promise that resolves with the contents of the file as a string.
 */
export type ReaderOutput = [string, File];
export type ReadSingleFileReturnType = Promise<ReaderOutput>;
export type ReadMultipleFilesReturnType = Promise<ReaderOutput[]>;
type FileReadOnProgress = (progress: number, file: File) => void;

export const readFiles = (
  files: File | File[],
  onProgress?: FileReadOnProgress
): ReadMultipleFilesReturnType | ReadSingleFileReturnType => {
  if (Array.isArray(files)) {
    const promises: ReadSingleFileReturnType[] = [];
    files.forEach((file) => {
      promises.push(readSingleFile(file, onProgress));
    });
    return Promise.all(promises);
  } else {
    return readSingleFile(files, onProgress);
  }
};

const readSingleFile = (file: File, onProgress?: FileReadOnProgress): ReadSingleFileReturnType => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        resolve([event.target.result as string, file]);
      }
    };
    reader.onerror = (event) => {
      reject(event);
    };
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress?.(progress, file);
      }
    };
    reader.readAsText(file);
  });
};
