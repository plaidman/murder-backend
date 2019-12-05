import { findCardById } from '../actions/findCardById';
import { game, io } from '../app';
import { Card, GameState } from '../common/gameModels';
import { ExplainEvidence } from '../common/socketModels';

export function startExplanationHandler(formData: ExplainEvidence) {
    if (![GameState.REBUTTAL, GameState.PASS_BLAME].includes(game.state)) {
        return;
    }

    if (formData.cardId) {
        // if we're coming from the 'pass the blame' flow
        const accuserId = game.accuserIds[game.currentAccuser];
        const accuserCards = game.players[accuserId].handCards;
        const accusationCard = accuserCards[accuserCards.length - 1];

        const swapCard = findCardById(game, formData.cardId, false);
        if (swapCard !== null) {
            game.accuseeSwapCardId = formData.cardId;
            swapCardAccusees(accusationCard, swapCard);
        }
    }

    game.state = GameState.EXPLAIN;
    io.emit('gameUpdated', { game });
}

function swapCardAccusees(accuserCard: Card, swapCard: Card) {
    const tempId = accuserCard.accuseeId;
    const tempName = accuserCard.accuseeName;

    accuserCard.accuseeId = swapCard.accuseeId;
    accuserCard.accuseeName = swapCard.accuseeName;

    swapCard.accuseeId = tempId;
    swapCard.accuseeName = tempName;
}
