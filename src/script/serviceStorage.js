export const getStorage = (key) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : [];
};

export const setStorage = (key, obj) => {
  const currentStorage = getStorage(key);
  currentStorage.push(obj);
  localStorage.setItem(key, JSON.stringify(currentStorage));
};

export const removeStorage = (phone) => {
  const key = 'contacts';
  const data = getStorage(key);
  const updatedData = data.filter(contact => contact.phone !== phone);
  localStorage.setItem(key, JSON.stringify(updatedData));
};

export const saveSortState = (field, order) => {
  const sortState = {field, order};
  localStorage.setItem('sortState', JSON.stringify(sortState));
};

export const getSortState = () => {
  const sortState = localStorage.getItem('sortState');
  return sortState ? JSON.parse(sortState) : null;
};
