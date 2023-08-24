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

// Function to add or update a key-value pair for an object in local storage
export const addOrUpdateKeyInLocalStorage = (localStorageKey, objectId, value) => {
  const storedData = getLocalStorageItem(localStorageKey) || {};

  storedData[objectId] = value;

  setLocalStorageItem(localStorageKey, storedData)
}
