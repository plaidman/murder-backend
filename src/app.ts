import express from 'express';
import { Server } from 'http';
import socketIo from 'socket.io';
import { generateNewGame } from './actions/newPlayer';
import { environment } from './common/environment';
import { debug, info } from './common/logger';
import { explainTheEvidenceHandler } from './events/explainTheEvidence';
import { passTheBlameHandler } from './events/passTheBlame';
import { setupPlayerHandlerFactory } from './events/setupPlayer';
import { startAccusationHandler } from './events/startAccusation';
import { startGameHandler } from './events/startGame';
import { startRebuttalHandler } from './events/startRebuttal';

const app = express();
const server = new Server(app);

export const io = socketIo(server);
export const game = generateNewGame();

io.on('connection', (socket) => {
    socket.on('setupPlayer', setupPlayerHandlerFactory(socket));
    socket.on('startGame', startGameHandler);
    socket.on('startAccusation', startAccusationHandler);
    socket.on('startRebuttal', startRebuttalHandler);
    socket.on('passTheBlame', passTheBlameHandler);
    socket.on('explainTheEvidence', explainTheEvidenceHandler);

    socket.on('requestGame', () => { socket.emit('gameUpdated', { game }); });

    socket.on('testing', (message) => { debug('testing', message); socket.emit('testing', message); });
});

app.use('/', express.static(`${__dirname}/../public`));

server.listen(environment.appPort, () => {
    info(`listening on port: ${environment.appPort}`);
});
