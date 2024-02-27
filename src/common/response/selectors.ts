export const getListFromResponse = <
  T extends Record<string, any>,
  U,
>(response: {
  body: T;
}): U[] | undefined => {
  if (response.body) {
    const propertyName = Object.getOwnPropertyNames(response.body);
    for (const name of propertyName) {
      if (Array.isArray(response.body[name])) {
        return response.body[name];
      }
    }
  }

  return undefined;
};
