import { dealEvidenceCards } from '../actions/dealEvidenceCards';
import { shuffleCards } from '../actions/shuffleCards';
import { game, io } from '../app';
import { GameState } from '../common/gameModels';
import { StartGame } from '../common/socketModels';

export function startGameHandler(formData: StartGame) {
    game.state = GameState.SHUFFLE;
    game.messages.push(`game started by <${game.players[formData.playerId].name}>`);
    game.messages.push('now shuffling players and cards');
    io.emit('gameUpdated', { game });
    shuffleCards(game);

    game.state = GameState.COLLECT;
    dealEvidenceCards(game);
    io.emit('gameUpdated', { game });
}
