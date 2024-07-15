export function changeExtension(filename: string, newExtension: string): string {
  // get the file extension
  const lastDot = filename.lastIndexOf('.');

  if (lastDot === -1) {
    return filename + '.' + newExtension;
  }

  return filename.slice(0, lastDot) + '.' + newExtension;
}
