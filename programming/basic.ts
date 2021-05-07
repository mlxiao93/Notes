const ClonedMap = new Map();

function deepClone(target) {
  if (typeof target !== 'object' || target === null) return target;

  if (ClonedMap.has(target)) return ClonedMap.get(target);

  const typeString = Object.prototype.toString.call(target);

  if (typeString === '[object Object]' || typeString === '[object Array]') {
    const clone = Array.isArray(target) ? [] : {}
    ClonedMap[target] = clone;
    Reflect.ownKeys(target).map(key => {
      clone[key] = deepClone(target[key]); 
    });
    return clone;
  }

  return target;
}

class limitRequest {
  
}