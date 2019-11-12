import { Socket } from 'socket.io';
import { generatePlayer } from '../actions/newPlayer';
import { game, io } from '../app';
import { environment } from '../common/environment';
import { SetupPlayer } from '../common/socketModels';
import { randString } from '../common/utils';

export function setupPlayerHandlerFactory(socket: Socket) {
    return (formData: SetupPlayer) => {
        // if game is not in 'gathering' state, reject the request

        game.messages.push(`player <${formData.name}> has joined the game`);
        game.messages.push(`player <${formData.name}> has joined the game`);
        game.messages.push(`player <${formData.name}> has joined the game`);
        game.messages.push(`player <${formData.name}> has joined the game`);
        game.messages.push(`player <${formData.name}> has joined the game`);
        game.messages.push(`player <${formData.name}> has joined the game`);
        game.messages.push(`player <${formData.name}> has joined the game`);

        const playerId = randString(environment.playerIdLength);
        game.accusorIds.push(playerId);

        game.players[playerId] = generatePlayer(
            playerId,
            formData.name,
            formData.expertise,
            formData.weapons,
            formData.evidence,
        );

        socket.emit('playerAdded', { playerId, game });
        io.emit('gameUpdated', { game });
    };
}
