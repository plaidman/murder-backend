import { game, io } from '../app';
import { GameState } from '../common/gameModels';

export function startRebuttalHandler() {
    if (game.state !== GameState.ACCUSE) {
        return;
    }

    const accusee = game.players[game.accuseeId];

    game.passedTheBlame = false;
    game.state = GameState.REBUTTAL;
    game.messages.unshift(`<${accusee.name}> is explaining the evidence`);
    io.emit('gameUpdated', { game });
}
