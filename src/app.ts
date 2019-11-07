import express from 'express';
import { Server } from 'http';
import socketIo from 'socket.io';
import { environment } from './common/environment';
import { generateNewGame } from './common/gameModels';
import { debug, info } from './common/logger';
import { setupPlayerHandlerFactory } from './events/setupPlayer';
import { startGameHandler } from './events/startGame';

const app = express();
const server = new Server(app);

export const io = socketIo(server);
export const game = generateNewGame();

io.on('connection', (socket) => {
    // const playerId = socket.handshake.query.playerId;
    // if (playerId !== 'null') { }
    // take these and lookup game state and if game/player exists
    // if so, emit resume game and pass along the game status

    socket.on('setupPlayer', setupPlayerHandlerFactory(socket));
    socket.on('startGame', startGameHandler);
    socket.on('requestGame', () => { socket.emit('gameUpdated', { game }); });

    socket.on('testing', (message) => { debug('testing', message); socket.emit('testing', message); });
});

app.use('/', express.static(`${__dirname}/../public`));

server.listen(environment.appPort, () => {
    info(`listening on port: ${environment.appPort}`);
});
