import { game, io } from '../app';
import { GameState } from '../common/gameModels';

export function startAccuserPeekHandler() {
    if (game.state !== GameState.EXPLAIN) {
        return;
    }

    game.state = GameState.PEEK;
    io.emit('gameUpdated', { game });
}
