import { Socket } from 'socket.io';
import { game, io } from '../app';
import { environment } from '../common/environment';
import { generatePlayer } from '../common/gameModels';
import { SetupPlayer } from '../common/socketModels';
import { randString } from '../common/utils';

export function setupPlayerHandlerFactory(socket: Socket) {
    return (formData: SetupPlayer) => {
        // if game is not in 'gathering' state, then emit gameJoinResume (after creating the player)

        const playerId = randString(environment.playerIdLength);
        game.accusorIds.push(playerId);

        game.players[playerId] = generatePlayer(
            playerId,
            formData.name,
            formData.expertise,
            formData.weapons,
            formData.evidence,
        );

        game.messages.push(`player <${formData.name}> has joined the game`);

        socket.emit('playerAdded', { playerId, game });
        io.emit('gameUpdated', { game });
    };
}
