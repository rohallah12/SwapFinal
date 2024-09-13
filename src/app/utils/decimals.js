export const fixedPoint = (amount, points) => {
  let count;
  let number = "";
  for (let i = 0; i < amount.length; i++) {
    if (amount.charAt(i) == `.`) {
      count = true;
    }
    if (count) {
      if (points == 0) {
        return number;
      }
      points -= 1;
    }
    number += amount.charAt(i);
  }
  return number;
};
