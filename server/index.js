require("babel-register");
if (process.env.NODE_ENV === 'preview')
    require('./server.preview');
else
    require('./server.test');