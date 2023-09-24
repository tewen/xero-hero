export const hasProperty = (object: any, property: string): boolean => {
  if (Boolean(object) && typeof object === 'object') {
    return property in object;
  }

  return false;
};
