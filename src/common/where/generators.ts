export const dateInWhereFormat = (date: Date): string => {
  if (date) {
    return `DateTime(${date.getFullYear()}, ${
      date.getMonth() + 1
    }, ${date.getDate()})`;
  }

  throw new Error('You must pass in a valid JavaScript Date object.');
};
