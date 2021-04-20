var https = require('https');
var fs = require('fs');

module.exports = {
    devServer: {
        https: {
          key: fs.readFileSync('./certs/localhost+1-key.pem'),
          cert: fs.readFileSync('./certs/localhost+1.pem'),
        },
        public: 'https://localhost:3000/'
    }
}