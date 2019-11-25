import { game, io } from '../app';
import { GameState } from '../common/gameModels';

export function startAccusationHandler() {
    if (game.state !== GameState.COLLECT) {
        return;
    }

    const accuserId = game.accuserIds[game.currentAccuser];
    const accuser = game.players[accuserId];
    const accuserCards = accuser.handCards;
    const accuseeId = accuserCards[accuserCards.length - 1].accuseeId;
    const accusee = game.players[accuseeId];

    game.state = GameState.ACCUSE;
    game.messages.unshift(`<${accuser.name}> is now accusing <${accusee.name}>`);
    game.accuseeId = accuseeId;
    io.emit('gameUpdated', { game });
}
