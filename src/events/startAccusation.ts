import { game, io } from '../app';
import { GameState } from '../common/gameModels';

export function startAccusationHandler() {
    if (game.state !== GameState.COLLECT) {
        return;
    }

    const accuserId = game.accuserIds[game.currentAccuser];
    const accuser = game.players[accuserId];
    const accuserCards = accuser.handCards;
    const accusationCard = accuserCards[accuserCards.length - 1];
    const accuseeId = accusationCard.accuseeId;
    const expertId = accusationCard.expertId;
    const accusee = game.players[accuseeId];

    game.state = GameState.ACCUSE;
    game.messages.unshift(`<${accuser.name}> is now accusing <${accusee.name}>`);
    game.accuseeId = accuseeId;
    game.expertId = expertId;
    io.emit('gameUpdated', { game });
}
