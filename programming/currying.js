function sum(...args1) {
  function res(...args2) {
    return sum(...args1, ...args2);
  }
  res.toString = function() {
    return args1.reduce((acc, val) => acc + val, 0)
  }
  return res;
}

// console.log(+sum(1, 2)(3, 4)(5));

function _twoPlus(a, b) {
  return a + b;
}

function curry(func) {
  return function curried(...args1) {
    if (args1.length >= func.length) {
      return func(...args1);
    } else {
      return function(...args2) {
        return curried(...args1, ...args2)
      }
    }
  }
}

const twoPlus = curry(_twoPlus);

// console.log(twoPlus(1, 2));
// console.log(twoPlus(1)(2));

// 反柯里化 http://www.alloyteam.com/2013/08/javascript-zhong-you-qu-di-fan-ke-li-hua-ji-shu/


Function.prototype.unCurrying = function() {
  return this.call.bind(this);
}

const getType = Object.prototype.toString.unCurrying();


// console.log(getType([]))  



