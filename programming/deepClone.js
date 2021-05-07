const clonedMap = new Map();
function deepClone (val) {

  if (typeof val !== 'Object' || val === null) return val;  // 基本类型直接输出

  if (clonedMap.has(val)) return clonedMap.get(val);

  const typeString = ({}).toString.call(val);
  if (typeString === '[object Object]' || typeString === '[object Array]') {
    const res = Array.isArray(val) ? [] : {};
    clonedMap.set(val, res);
    for (let key in Reflect.ownKeys(val)) {
      res[key] = deepClone(val);
    }
    return res;
  }

  return val;
}

// const a = {
//   a: 1,
//   b: 2,
//   d: [1,2,3]
// }
// a.c = a;

// console.log(deepClone(a));