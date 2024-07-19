/**
 * Changes the extension of a filename to a new extension.
 * If the filename doesn't have an extension, the new extension is appended to the filename.
 *
 * @param {string} filename - The original filename.
 * @param {string} newExtension - The new extension to replace the existing extension.
 * @returns {string} The filename with the new extension.
 */
export function changeExtension(filename: string, newExtension: string): string {
  const lastDot = filename.lastIndexOf('.');

  if (lastDot === -1) {
    return filename + '.' + newExtension;
  }

  return filename.slice(0, lastDot) + '.' + newExtension;
}
