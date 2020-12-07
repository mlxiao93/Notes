// const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.get('/api/user', function(req, res) {
    res.json({
      id: 1,
      name: '张三'
    });
  });
};