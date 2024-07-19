/**
 * Generates a unique ID by combining the current timestamp with a random string.
 * @returns {string} The generated unique ID.
 */
export const generateUniqueId = () => {
  return Date.now().toString() + Math.random().toString(36).substring(2, 7);
};
