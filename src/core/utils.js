export const convertSnakeToCamel = (str) => str.replace(/_(.)/g, g => g[1].toUpperCase());
export const convertCamelToSnake = (str) => str.replace(/([A-Z])/g, ` $1`).split(` `).join(`_`).toLowerCase();

export const renameKeysSnakeToCamel = (obj) => {
  const processVal = val => {
    if (typeof val !== `object`) {
      return val;
    }

    if (Array.isArray(val)) {
      return val.map(renameKeysSnakeToCamel);
    }

    return renameKeysSnakeToCamel(val);
  };

  return Object.fromEntries(
    Object.entries(obj)
      .map(([key, val]) => {
        return [convertSnakeToCamel(key), processVal(val)];
      }),
  );
};
export const renameKeysCamelToSnake = (obj) => {
  const processVal = val => {
    if (typeof val !== `object`) {
      return val;
    }

    if (Array.isArray(val)) {
      return val.map(renameKeysCamelToSnake);
    }

    return renameKeysCamelToSnake(val);
  };

  return Object.fromEntries(
    Object.entries(obj)
      .map(([key, val]) => {
        return [convertCamelToSnake(key), processVal(val)];
      }),
  );
};
