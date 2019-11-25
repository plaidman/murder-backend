import { game, io } from '../app';
import { GameState } from '../common/gameModels';

export function passTheBlameHandler() {
    if (game.state !== GameState.REBUTTAL) {
        return;
    }

    game.state = GameState.PASS_BLAME;
    io.emit('gameUpdated', { game });
}
