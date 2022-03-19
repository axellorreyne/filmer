const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://find-a-film.xyz:8000/',
      changeOrigin: true,
    })
  );
};