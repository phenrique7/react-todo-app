
function immutableRemoveObjectProperty(obj, property) {
  return Object.keys(obj).reduce(
    (result, item, index, array) => {
      if (item !== property) {
        return Object.assign({}, result, {
          [array[index]]: obj[item],
        });
      }
      return Object.assign({}, result);
    },
    {},
  );
}

function isEmptyObject(object) {
  return typeof object === 'object' && Object.values(object).length === 0;
}

export {
  immutableRemoveObjectProperty,
  isEmptyObject,
};
