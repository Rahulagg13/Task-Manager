export const getData = (storageName) => {
  return JSON.parse(localStorage.getItem(storageName));
};

export const setData = (storageName, value) => {
  return localStorage.setItem(storageName, JSON.stringify(value));
};

export const deleteData = (storageName) => {
  return localStorage.removeItem(storageName);
};
