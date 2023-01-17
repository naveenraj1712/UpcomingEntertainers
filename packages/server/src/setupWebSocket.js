const WebSocket = require('ws');
const { logger } = require('./logger');

const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ noServer: true, path: '/socket'});

    server.on('upgrage', function upgrage(req, socket, head) {
        try{
            wss.handleUpgrade(req, socket, head, function done(ws) {
                wss.emit('connection', ws, req);
            })
        } catch(err) {
            socket.write('HTTP/1.1 401 unauthorized\r\n\r\n');
            socket.destroy();
            return;
        }
    });

    wss.on('connection', (ws) => {
        ws.on('close', ()=> {
            logger.info('closed', wss.clients.size);
        });
        ws.send('connection established..');
    });

    return wss;
};

module.exports = setupWebSocket;