const defaultOptions = {
  method: "GET",
  mode: "cors",
  cache: "default",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
};

export const apiUtils = {
  request: async (url, options = {}) => {
    try {
      const response = await fetch(url, { ...defaultOptions, ...options });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },

  get: async (url, options = {}) => {
    return apiUtils.request(url, { method: "GET", ...options });
  },

  post: async (url, data, options = {}) => {
    return apiUtils.request(url, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    });
  },

  put: async (url, data, options = {}) => {
    return apiUtils.request(url, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    });
  },

  delete: async (url, options = {}) => {
    return apiUtils.request(url, { method: "DELETE", ...options });
  },
};
