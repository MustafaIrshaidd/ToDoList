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

// Add a new object to a local storage array
export const addNewObjectToLocalStorageArray = (localStorageKey, newObject) => {
  const existingArray = getLocalStorageItem(localStorageKey) || [];
  existingArray.push(newObject);
  setLocalStorageItem(localStorageKey, existingArray);
};
