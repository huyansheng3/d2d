// 递归出object的所有字段,包括array[object]这类对象数组
function recursiveIteration(object, callback, parent = {}) {
  for (var property in object) {
    if (object.hasOwnProperty(property)) {
      if (object[property] instanceof Array) {
        object[property].forEach(o => {
          typeof o === 'object' && recursiveIteration(o, callback, object);
          return o;
        });
      } else if (object[property] instanceof Object) {
        recursiveIteration(object[property], callback, object);
      }
      callback(object, property, parent);
    }
  }
  return object;
}

const fastDeepClone = obj => {
  if (typeof obj === 'object') {
    return JSON.parse(JSON.stringify(obj));
  } else {
    return obj;
  }
};

module.exports = {
  recursiveIteration,
  fastDeepClone,
};
