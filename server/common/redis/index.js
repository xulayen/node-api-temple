
const config = require('../../config/index');

var redis = require("redis"),
    client = redis.createClient({
        ...config.redis
    });


client.on("error", function (err) {
    console.error("Errorssss " + JSON.stringify(err));
});

client.on('ready', function (res) {
    console.log('redis is ready,Go!');
});



function clientCache() { }




let text = async (key) => {
    let doc = await new Promise((resolve, reject) => {
        client.get(key, function (err, res) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            return resolve(res);
        });
    }).catch((e) => {
        debugger;
        console.error(e);
    });

    return doc ? JSON.parse(doc) : null;

};

clientCache.set = function (key, value) {
    value = JSON.stringify(value);
    return client.set(key, value, function (err) {
        if (err) {
            console.error(err);
            client = redis.createClient({
                ...config.redis
            });
            return clientCache.set(key, value);
        }``
    });
};

clientCache.get = async (key) => {
    // client = redis.createClient({
    //     ...config.redis
    // });
    return await text(key);
};

clientCache.expire = function (key, time) {
    return client.expire(key, time);
};


module.exports = exports = clientCache;