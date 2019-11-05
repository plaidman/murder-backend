import { Socket } from 'socket.io';
import { game, io } from '../app';
import { environment } from '../common/environment';
import { CardType } from '../common/gameModels';
import { SetupPlayer } from '../common/socketModels';
import { randString } from '../common/utils';

export function setupPlayerHandlerFactory(socket: Socket) {
    return (formData: SetupPlayer) => {
        // if game is not in 'gathering' state, then emit gameJoinResume (after creating the player)

        const playerId = randString(environment.playerIdLength);

        game.players[playerId] = {
            canFindEvidence: true,
            expertise: formData.expertise,
            handCards: [],
            id: playerId,
            name: formData.name,
        };

        for (const weapon of formData.weapons) {
            game.players[playerId].handCards.push({
                accusedPlayerId: '',
                description: weapon,
                expertPlayerId: playerId,
                expertise: formData.expertise,
                isConclusive: false,
                type: CardType.WEAPON,
            });
        }

        for (const evidence of formData.evidence) {
            game.players[playerId].handCards.push({
                accusedPlayerId: '',
                description: evidence,
                expertPlayerId: playerId,
                expertise: formData.expertise,
                isConclusive: false,
                type: CardType.EVIDENCE,
            });
        }

        socket.emit('playerAdded', { playerId, game });
        io.emit('gameUpdated', { game });
    };
}
