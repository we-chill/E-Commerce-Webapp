export const getAuthExpiredDate = () => {
  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + 2);
  return currentDate;
};
