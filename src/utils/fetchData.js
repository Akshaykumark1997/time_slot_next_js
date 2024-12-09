export const fetchCacheData = async (key) => {
  try {
    const response = await fetch(`/api/getCacheData?key=${key}`);
    const result = await response.json();
    if (result.success) {
      return result.data;
    } else {
      console.error(result.message);
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch cache data:", error);
    return null;
  }
};
