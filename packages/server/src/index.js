const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const nocache = require('nocache');

const mainRouter = require('./router/main-router');
const  { logger } = require('./logger');
const redis = require('./redis');
const cluster = require('./cluster');
const { notFound, handleError } = require('./utility/error-handler');
const env = require('./env');
const sequelize = require('./sequelize');
const setupWebSocket = require('./setupWebSocket');

cluster(()=>{
    const app = new express();
    const isLocalEnv = env.NODE_ENV === 'local';

    app.use(express.json({limit: '30mb'}));
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use('/api', nocache());
    app.use(cors());
    app.use(helmet());

    mainRouter.userRoute(app, logger);

    app.use(notFound);
    app.use(handleError);

    const service = {
        async run() {
            const server = await app.listen(env.PORT);
            const wss = setupWebSocket(server);
            app.set('socket', wss);
            console.log(new Date(), `Express Server Listening on port ${env.PORT} in ${app.get('env')} mode`);
        },
    };
    sequelize.authenticateSql();
    redis.redisOnConnect();
    redis.redisOnError();

    service.run().catch((err)=>{
        console.log('Error starting server', err);
        process.exit(1);
    });
});

