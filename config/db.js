var config = {
    development:   { 
        "user": 'xxxxx',
        "password": 'xxx',
        "server": 'xxxxxxx', 
        "database": 'xxxxxx',
        "port": 1433,
        "debug": true,
        "stream" :true,
        "options": {
            "encrypt": false ,
            "connectTimeout":15000,
            "requestTimeout":150000
        }
    },
    production:    { 
        "user": 'xxxxx',
        "password": 'xxxxx',
        "server": 'xxxxx', 
        "database": 'xxxxx',
        "port": 1433,
        "debug": true,
        "stream" :true,
        "options": {
            "encrypt": false ,
            "connectTimeout":15000,
            "requestTimeout":150000
        }
    }
};
module.exports = config;
