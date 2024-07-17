const generateUniqueId = () => {
  return Date.now().toString() + Math.random().toString(36).substring(2, 7);
};

export default generateUniqueId;
