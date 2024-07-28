const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackAlias({
        'http': 'stream-http',
        'https': 'https-browserify',
        'stream': 'stream-browserify',
        'util': 'util',
        'zlib': 'browserify-zlib',
        'url': 'url',
        'assert': 'assert',
    })
);
