import { dealEvidenceCards } from '../actions/dealEvidenceCards';
import { game, io } from '../app';
import { GameState } from '../common/gameModels';

const COLLECT_PAUSE_TIME = 3000;

export function dealAccuseHandler() {
    game.state = GameState.COLLECT;
    game.messages.push('dealing evidence cards to everybody');
    dealEvidenceCards(game);
    io.emit('gameUpdated', { game });

    // todo three second wait?
    setTimeout(accuseHandler , COLLECT_PAUSE_TIME);
}

function accuseHandler() {
    const accusorId = game.accusorIds[game.currentAccusor];
    const accusor = game.players[accusorId];
    const accuseeId = accusor.handCards[accusor.handCards.length - 1].accuseeId;
    const accusee = game.players[accuseeId];

    game.state = GameState.ACCUSE;
    game.messages.push(`<${accusor.name}> is now accusing <${accusee.name}>`);
    game.accuseeId = accuseeId;
    io.emit('gameUpdated', { game });
}
