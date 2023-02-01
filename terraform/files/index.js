const path = require('path');

function processRequest(request) {
    console.log('Processing request:', request);

    const uriExt = path.extname(request.uri);

    if ((uriExt === '') || (uriExt === '.html')) {
        request.uri = '/index.html';
    }

    console.log('Final request:', request);
    return request;
}

exports.handler = async (event, context) => {
    const cf = event.Records[0].cf;
    const request = cf.request;

    switch (cf.config.eventType) {
        case 'origin-request':
            return processRequest(request);

        case 'origin-response':
            console.log('Origin response:', request, cf.response);
            return cf.response;

        default:
            throw Error('Unhandled event type');
    }
};
