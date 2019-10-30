import { Socket } from 'socket.io';
import { gameList } from '../app';
import { environment } from '../common/environment';
import { GameState, Nullable } from '../common/models';
import { randString } from '../common/utils';

export function joinGameHandlerFactory(socket: Socket) {
    return (gameId: Nullable<string>) => {
        let filledGameId = gameId;
        if (filledGameId === null) {
            // generate a new game
            do {
                filledGameId = randString(environment.gameIdLength);
            } while (gameList[filledGameId] !== undefined);
        }

        // if game id does exist and it's not 'gathering' state, then emit gameJoinResume (after creating the player)
        // join to a specific socket.io channel

        if (gameList[filledGameId] === undefined) {
            gameList[filledGameId] = {
                accusedId: '',
                accusorIds: [],
                currentAccusor: 0,
                id: filledGameId,
                players: {},
                state: GameState.GATHER,
                tableCards: [],
            };
        }

        const playerId = randString(environment.playerIdLength);
        gameList[filledGameId].players[playerId] = {
            canFindEvidence: true,
            expertise: '',
            gameId: filledGameId,
            handCards: [],
            id: playerId,
            name: '',
        };

        socket.emit('gameJoinSuccess', { gameId, playerId, game: gameList[filledGameId] });
    };
}
