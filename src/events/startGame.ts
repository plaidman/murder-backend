import { shuffleCards } from '../actions/shuffleCards';
import { game, io } from '../app';
import { GameState } from '../common/gameModels';
import { StartGame } from '../common/socketModels';
import { startDealHandler } from './startDeal';

export function startGameHandler(formData: StartGame) {
    if (game.state !== GameState.GATHER) {
        return;
    }

    game.state = GameState.SHUFFLE;
    game.gmPlayerId = formData.playerId;
    game.messages.unshift(`game started by <${game.players[formData.playerId].name}>`);
    game.messages.unshift('now shuffling players and cards');
    io.emit('gameUpdated', { game });
    shuffleCards(game);

    startDealHandler();
}
