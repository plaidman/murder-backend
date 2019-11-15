import { Card, Game, Player } from '../common/gameModels';
import { shuffle } from '../common/utils';

export function shuffleCards(game: Game) {
    const accuseeIds: string[] = [];
    for (const key of Object.keys(game.players)) {
        const player = game.players[key];
        const numCards = player.handCards.length;

        for (let i = 0; i < numCards; i++) {
            accuseeIds.push(player.id);
        }

        movePlayerCardsToTable(player, game.tableCards);
    }

    shuffle(game.accusorIds);
    shuffle(game.tableCards);
    shuffle(accuseeIds);

    for (let i = 0; i < accuseeIds.length; i++) {
        game.tableCards[i].accuseeId = accuseeIds[i];
        game.tableCards[i].accuseeName = game.players[accuseeIds[i]].name;
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
