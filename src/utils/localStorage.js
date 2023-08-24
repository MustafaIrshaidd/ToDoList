// Set an item in local storage
export const setLocalStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Error setting local storage:", error);
    return false;
  }
};

// Get an item from local storage
export const getLocalStorageItem = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error getting local storage:", error);
    return null;
  }
};

// Remove an item from local storage
export const removeLocalStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error removing local storage:", error);
    return false;
  }
};

// Add a new object to a local storage array or indicate adding a new object with id -1
export const addOrUpdateObjectToLocalStorageArray = (
  localStorageKey,
  newObject,
  isNew,
  id=1
) => {
  const existingArray = getLocalStorageItem(localStorageKey) || [];

  if (isNew) {
    existingArray.push(newObject);
  } else {
    existingArray[id - 1] = newObject;
  }

  setLocalStorageItem(localStorageKey, existingArray);
};
