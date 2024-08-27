const LocalStorageGet = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

const LocalStorageSet = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
const LocalStorageRemove = (key) => {
  localStorage.removeItem(key);
};
export { LocalStorageGet, LocalStorageSet, LocalStorageRemove };
