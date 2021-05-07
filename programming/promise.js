Promise._All = function(promises) {
  return new Promise((resolve, reject) => {
    const resList = [];
    let resolvedCount = 0;
    for (let index in promises) {
      promises[index].then(res => {
        resList[index] = res;
        resolvedCount++;
        if (resolvedCount === promises.length) resolve(resList);
      }).catch(err => {
        reject(err);
      })
    }
  })
}

// const promises = [
//   Promise.resolve(123),
//   Promise.resolve(222),
//   Promise.resolve(789),
// ]

// Promise._All(promises).then(res => {
//   console.log(res);
// }).catch(err => {
//   console.error(err)
// })

Promise.prototype._finally = function(cb) {
  const promise = this;
  return promise.then(res => {
    return Promise.resolve(cb()).then(() => value);    // 若cb是promise，需要等待cb
    // cb();
    // return res;
  }).catch(err => {
    return Promise.resolve(cb()).then(() => { throw err })
    // cb();
    // throw err;
  })
}

// Promise.resolve(123).then(res => {console.log(res)})._finally(() => {
//   console.log('finally');
// })

class LimitRequest {
  constructor(limit) {
    this.limit = limit;
  }

  currentNum = 0;
  tasks = [];

  execTask() {
    this.currentNum++;
    const task = this.tasks.pop();
    if (task) {
      task().then(() => {
        this.currentNum--;
        this.execTask()
      }).catch(() => {
        this.currentNum--;
        this.execTask()
      })
    }
  }

  request(req) {
    return new Promise((resolve, reject) => {
      const task = () => {
        return req().then(res => {
          resolve(res);
          return res;
        }).catch(err => {
          reject(err);
          throw err;
        })
      }
      this.tasks.unshift(task);
      if (this.currentNum < this.limit) {
        this.execTask();
      }
    });
  }
}

const limitRequest = new LimitRequest(2);

const requests = Array(10).fill(null).map((v, i) => {
  return () => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(i);
    }, 1000)
  })
})

// for (req of requests) {
//   limitRequest.request(req).then(res => {
//     console.log(res);
//   });
// }