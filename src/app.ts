import express from 'express';
import { Server } from 'http';
import socketIo from 'socket.io';
import { environment } from './common/environment';
import { debug, info } from './common/logger';
import { GameList } from './common/models';
import { joinGameHandlerFactory } from './events/joinGame';

const app = express();
const server = new Server(app);

export const io = socketIo(server);
export const gameList: GameList = {};

io.on('connection', (socket) => {
    // socket.handshake.query.gameId
    // socket.handshake.query.playerId

    // take these and lookup game state and if game/player exists
    // if so, emit resume game and pass along the game status

    socket.on('joinGame', joinGameHandlerFactory(socket));
    socket.on('testing', (message) => { debug('testing', message); });
});

app.use('/', express.static(`${__dirname}/../public`));

server.listen(environment.appPort, () => {
    info(`listening on port: ${environment.appPort}`);
});
