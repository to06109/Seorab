const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://localhost:8000',
      changeOrigin: true,
    }),
  )
}
