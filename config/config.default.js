'use strict';

module.exports = appInfo => {
    const config = exports = {};

    config.sequelize = {
        dialect: 'mysql',
        host: 'santak_mysql',
        port: 3306,
        database: 'santak',
        password: 'mm123321',
    };

    config.security = {
        csrf: {
            enable: false,
        }
    }


    config.redis = {
        client: {
            port: 6379,          // Redis port
            host: 'santak_redis',   // Redis host
            password: '',
            db: 0,
        },
    }

    config.view = {
        mapping: {
            '.ejs': 'ejs',
        },
    };

    // ejs config
    config.ejs = {};
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1548211552881_3217';

    // add your config here
    config.middleware = [];


    config.onerror = {
        json(err, ctx) {
            const {code, httpStatusCode, httpMsg} = err;
            if (httpStatusCode) ctx.statusCode = httpStatusCode;
            ctx.body = {
                code,
                msg: httpMsg,
            };
        }
    };

    return config;
};




