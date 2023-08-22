export const formatDate = (formatType) => {
  return new Date().toLocaleString(formatType, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};
