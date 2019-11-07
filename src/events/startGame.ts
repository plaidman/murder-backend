import { game, io } from '../app';
import { Card, GameState, Player } from '../common/gameModels';
import { StartGame } from '../common/socketModels';
import { shuffle } from '../common/utils';

const NUM_CARDS_PER_PLAYER = 6;
const SHUFFLE_TIMEOUT = 500;

export function startGameHandler(formData: StartGame) {
    game.state = GameState.SHUFFLE;
    game.messages.push(`game started by <${game.players[formData.playerId].name}>`);
    game.messages.push('now shuffling players and cards');
    io.emit('gameUpdated', { game });

    const accusedPlayerIds: string[] = [];
    for (const key of Object.keys(game.players)) {
        const player = game.players[key];

        for (let i = 0; i < NUM_CARDS_PER_PLAYER; i++) {
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

    setTimeout(
        () => {
            game.state = GameState.COLLECT;
            io.emit('gameUpdated', { game });
        },
        SHUFFLE_TIMEOUT,
    );
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
