import { generateNewGame } from '../actions/newPlayer';
import { io, setGame } from '../app';

export function resetGame() {
    const game = generateNewGame();
    setGame(game);
    io.emit('gameUpdated', { game });
}
