const tasks = []

function jsonp(url: string, cbName: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onerror = (err) => {
      reject(err);
      clear();
    }
    window[cbName] = (data) => {
      resolve(data);
      clear();
    }
    document.body.appendChild(script);
    function clear() {
      document.body.removeChild(script);
      delete window[cbName]
    }
  })
}

jsonp('https://static-api.tickets.beijing2022.cn/cms/1/stable_config/2/stable_config.json?t=1615865623154', 'cb_1_stable_config_2')
  .then(data => {
    console.log(data);
  });
// jsonp('https://static-api.tickets.beijing2022.cn/cms/1/stable_config/2/stable_config.json?t=1615865623154', 'cb_1_stable_config_2')
//   .then(data => {
//   console.log(data);
// })

console.log(Date.now(), Date.now())