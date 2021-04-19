export const sortDate = (data) => {
  data.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
};
