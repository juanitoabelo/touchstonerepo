const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://touchstone-api.abelocreative.com/ajax.php',
      secure: false,
      changeOrigin: true,
    })
  );
};