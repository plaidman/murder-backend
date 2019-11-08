import { Game, GameState } from '../common/gameModels';

export function dealEvidenceCards(game: Game) {
    for (const key of Object.keys(game.players)) {
        const player = game.players[key];
        if (!player.canFindEvidence) {
            continue;
        }

        const card = game.tableCards.pop();
        if (card === undefined) {
            game.state = GameState.OVER;
            return;
        }

        player.handCards.push(card);
    }
}
