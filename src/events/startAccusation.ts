import { game, io } from '../app';
import { GameState } from '../common/gameModels';

export function startAccusationHandler() {
    if (game.state !== GameState.COLLECT) {
        return;
    }

    const accusorId = game.accusorIds[game.currentAccusor];
    const accusor = game.players[accusorId];
    const accusorCards = accusor.handCards;
    const accuseeId = accusorCards[accusorCards.length - 1].accuseeId;
    const accusee = game.players[accuseeId];

    game.state = GameState.ACCUSE;
    game.messages.unshift(`<${accusor.name}> is now accusing <${accusee.name}>`);
    game.accuseeId = accuseeId;
    io.emit('gameUpdated', { game });
}
