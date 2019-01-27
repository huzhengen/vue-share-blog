// vue.config.js
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}


module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
    },
    // baseUrl: process.env.NODE_ENV === 'production' ?
    //     '/vue-share-blog/dist/' :
    //     '/',
    publicPath: process.env.NODE_ENV === 'production' ?
        '/vue-share-blog/dist/' :
        '/',
}