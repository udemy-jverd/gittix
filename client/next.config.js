module.exports = {
    // This middleware function change the Next behaviour into Docker
    // Fix the issue of not every time detecting changes by Next into a Docker image
    webpackDevMiddleware: config => {
        config.watchOptions.poll = 300;
        return config;
    }
}
