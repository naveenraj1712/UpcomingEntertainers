const cluster = require('cluster');
const os = require('os');
const { logger } = require('./logger');
const env = require('./env');
const isLocalEnv = env.NODE_ENV === 'local'

const init = (callback = null) => {
    const cpus = isLocalEnv ? 1 : os.cpus().length;
    if(cluster.isMaster) {
        logger.info(`ClusterInit: Number of CPUs is ${cpus}`);
        logger.info(`ClusterInit: Master ${process.pid} is running`);

        for(let i=0; i<cpus; i++) {
            const worker = cluster.fork();
            worker.on('message', (message) => {
                logger.info(`ClusterInit: [${worker.process.pid} to MASTER]`, message);
            });
        }

        cluster.on('online', function(worker) {
            logger.info(`ClusterInit: Worker ${worker?.process?.pid} is listening`);
        });

        cluster.on('exit', (worker, code, signal) => {
            logger.error(`ClusterInit: Worker ${worker.process.pid} died with code ${code}, and signal: ${signal}`);
            logger.error(`ClusterInit: [${worker.process.pid}]`, {
                message: 'Process terminated. Restarting...',
            });

            cluster.fork();
        });
    } else {
        if(callback) callback();
    }
};

module.exports = init;