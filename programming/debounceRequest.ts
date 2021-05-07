/**
 * 请求防抖：
 * 同一个请求函数在防抖时间内，调用n次，只会发出一个请求，请求回来后，resolve所有同时调用的函数
 */
 export function debounceRequest<Args, Result>(func: (...args: Args[]) => Promise<Result>, timeout: number = 1000) {
  
  let cachedPromise: ReturnType<typeof func> | undefined;
  const tasks: ((promise?: ReturnType<typeof func>) => ReturnType<typeof func>)[] = [];

  function execTask() {
    const task = tasks.pop();
    task && task(cachedPromise).then(() => {
      execTask();
    }).catch(() => {
      execTask();
    })
  }

  let timer: ReturnType<typeof setTimeout> | undefined;

  return function (...args: Parameters<typeof func>): ReturnType<typeof func> {

    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }

    timer = setTimeout(() => {
      cachedPromise = undefined;
    }, timeout)

    return new Promise((resolve, reject) => {

      const task = function (promise?: ReturnType<typeof func>) {
        const _promise = (promise ?? func(...args)).then(data => {
          resolve(data);
          return data;
        }).catch(err => {
          reject(err);
          throw err;
        });
        cachedPromise = _promise;
        return _promise;
      }

      tasks.unshift(task);
      execTask();
    })
  }
}