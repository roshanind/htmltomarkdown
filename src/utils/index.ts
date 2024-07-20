/**
 * Extracts the name and extension from a given file name.
 *
 * @param fileName - The file name including the extension.
 * @returns An object containing the name and extension of the file.
 */
export const getFileNameAndExtension = (fileName: string) => {
  const lastDot = fileName.lastIndexOf('.');
  const name = fileName.slice(0, lastDot);
  const extension = fileName.slice(lastDot + 1);

  return { name, extension };
};
