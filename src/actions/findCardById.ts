import { Card, Game } from '../common/gameModels';

export function findCardById(
    game: Game,
    cardId: string,
    includeTableCards: boolean,
): Card | null {
    for (const playerId of Object.keys(game.players)) {
        const player = game.players[playerId];

        for (const card of player.handCards) {
            if (card.id === cardId) {
                return card;
            }
        }
    }

    if (!includeTableCards) {
        return null;
    }

    for (const card of game.tableCards) {
        if (card.id === cardId) {
            return card;
        }
    }

    return null;
}
