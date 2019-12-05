import { dealEvidenceCards } from '../actions/dealEvidenceCards';
import { game, io } from '../app';
import { GameState } from '../common/gameModels';

export function startDealHandler() {
    if (![GameState.SHUFFLE, GameState.EXPERT].includes(game.state)) {
        return;
    }

    game.state = GameState.COLLECT;
    game.messages.unshift('dealing evidence cards to everybody');
    dealEvidenceCards(game);
    // todo clean up testing
    dealEvidenceCards(game);
    dealEvidenceCards(game);
    io.emit('gameUpdated', { game });
}
