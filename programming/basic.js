Function.prototype._call = function (context, ...args) {
  const func = this;

  /**
   * arr = []
   * eval(`fun(arr[i],b,c,d)`);
   */

  if (!context === null || context === undefined) {
    return func(...args);
  }
  const s = Symbol();
  context[s] = func;
  const res = context.__func(...args);
  context[s] = undefined;
  return res;
}

Function.prototype._bind = function (context, ...args1) {
  const func = this;
  function newFunc(...args2) {
    const _context = this instanceof newFunc ? this : context;   // 处理new调用
    return func.call(_context, ...args1, ...args2);
  }
  return newFunc;
}

// function b() {
//   console.log(this);
// }
// const _b = b._bind({a: 1});

// new _b();

function debounce(fn, time) {
  let timer;
  return function() {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, time)
  } 
}

// const _c = debounce(() => {
//   console.log('hhhhh');
// }, 500);

// window.addEventListener('mousemove', _c)

function throttle(fn, time) {
  let timer
  return function() {
    if (timer) return 
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, time)
  }
}

// const _d = throttle(() => {
//   console.log('hhhhh');
// }, 1000);

// window.addEventListener('mousemove', _d)

function Single() {
  Single.instance = Single.instance || this;
  return Single.instance;
}

class Single2 {

  static instance = Single2.instance || {}

  constructor() {
    return Single2.instance;
  }
}

// console.log(new Single2() === new Single2());

// 继承

function Parent() {

}

function Child() {
  Parent.apply(this, arguments)
}

Child.prototype === new Parent();