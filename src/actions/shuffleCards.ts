import { Card, Game, Player } from '../common/gameModels';
import { shuffle } from '../common/utils';

export function shuffleCards(game: Game) {
    const accusedPlayerIds: string[] = [];
    for (const key of Object.keys(game.players)) {
        const player = game.players[key];
        const numCards = player.handCards.length;

        for (let i = 0; i < numCards; i++) {
            accusedPlayerIds.push(player.id);
        }

        movePlayerCardsToTable(player, game.tableCards);
    }

    shuffle(game.accusorIds);
    shuffle(game.tableCards);
    shuffle(accusedPlayerIds);

    for (let i = 0; i < accusedPlayerIds.length; i++) {
        game.tableCards[i].accusedPlayerId = accusedPlayerIds[i];
    }
}

function movePlayerCardsToTable(player: Player, table: Card[]) {
    while (player.handCards.length > 0) {
        const card = player.handCards.pop();

        if (card === undefined) {
            break;
        }

        table.push(card);
    }
}
