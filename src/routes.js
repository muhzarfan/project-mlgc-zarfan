const { predictHandler } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/predict',
        options: {
            payload: {
                output: 'stream',
                parse: false,
                maxBytes: 1000000,
                multipart: true
            }
        },
        handler: predictHandler
    }
];

module.exports = routes;
