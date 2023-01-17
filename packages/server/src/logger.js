const bunyan = require('bunyan');
const util = require('util');
const env = require('./env')

const customRotatingFileStream  = function(options) {
    bunyan.RotatingFileStream.call(this, options);
}

util.inherits(customRotatingFileStream, bunyan.RotatingFileStream);

customRotatingFileStream.prototype.write = function(rec) {
    rec.level = bunyan.nameFromLevel[rec.level];
    let levelName = JSON.stringify(rec) + '\n';
    bunyan.RotatingFileStream.prototype.call(this, levelName);
};

const getStreams = () => {
    let PID = process.pid;
    const streams = [
        {
            type: 'raw',
            stream: new customRotatingFileStream({
                path: env.LOG_PATH,
                period: '1d',
                totalFiles: 10,
                rotateExisting: true,
                threshold: env.LOGGER_FILE_THRESHOLD || '50m',
                totalSize: env.LOGGER_FILE_TOTAL_SIZE || '500m',
                gzip: true,
                serializers: {
                    req: bunyan.stdSerializers.req,
                    err: bunyan.stdSerializers.err,
                    method: bunyan.stdSerializers.method,
                    res: bunyan.stdSerializers.res,
                    userInfo: bunyan.stdSerializers.userInfo
                },
            })
        },
    ];
}

var logger = bunyan.createLogger({
    name: 'upcoming_entertainers',
    streams: getStreams(),
});

module.exports = { logger };