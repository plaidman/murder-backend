import { game, io } from '../app';
import { Card, GameState } from '../common/gameModels';

export function explainTheEvidenceHandler(formData?: Card) {
    if (![GameState.REBUTTAL, GameState.PASS_BLAME].includes(game.state)) {
        return;
    }

    if (game.passedTheBlame) {
        // do the swap here
    }

    game.state = GameState.EXPLAIN;
    io.emit('gameUpdated', { game });
}
