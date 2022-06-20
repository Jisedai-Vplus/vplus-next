const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    console.log("App use middleware");
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:8000',
            changeOrigin: true,
            pathRewrite: {'^/api': ""},
        })
    );
}