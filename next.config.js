const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias['@app'] = path.resolve(__dirname, 'src/app');
    return config;
  },
};