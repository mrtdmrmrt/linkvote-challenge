export const sortPoint = (data) => {
  data.sort(function (a, b) {
    if (a.points < b.points) {
      return 1;
    }
    if (a.points > b.points) {
      return -1;
    }
    return 0;
  });
};
