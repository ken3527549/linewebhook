const request = require('request');
const wrapPromiseWrap = require('./promiseWarp');

module.exports = {
    getTranslation(string, target) {
        var wrap = new Object();
        wrap.getTranslation = (text) => {
            var options = {
                url:"https://translation.googleapis.com/language/translate/v2",
                form:{
                    'q':string,
                    'target':target,
                    'key':'AIzaSyAttKZkJ4o4vMMdXc4krQjOytLhQIG0Hls'
                },
                method:'POST'
            };
            request(options, function(error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body);
                // console.log(JSON.parse(body).data.translations[0].translatedText);
                text(body, null);
            });
        };
        wrap.requestPromise = wrapPromiseWrap(wrap.getTranslation);
        return wrap.requestPromise();
    }
} 
