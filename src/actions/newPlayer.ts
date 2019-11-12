import { Card, CardType, Game, GameState, Player } from '../common/gameModels';

export function generateNewGame(): Game {
    return {
        accuseeId: '',
        accusorIds: ['one', 'two', 'three'],
        currentAccusor: 0,
        players: {
            one: generatePlayer(
                'one',
                'oneName',
                'oneExp',
                ['a', 'b'],
                ['c', 'd', 'e', 'f'],
            ),
            two: generatePlayer(
                'two',
                'twoName',
                'twoExp',
                ['g', 'h'],
                ['i', 'j', 'k', 'l'],
            ),
            three: generatePlayer(
                'three',
                'threeName',
                'threeExp',
                ['m', 'n'],
                ['o', 'p', 'q', 'r'],
            ),
        },
        state: GameState.GATHER,
        tableCards: [],
        messages: [],
    };
}

export function generatePlayer(
    id: string,
    name: string,
    expertise: string,
    weapons: string[],
    evidence: string[],
): Player {
    const player: Player = {
        expertise,
        id,
        name,
        canFindEvidence: true,
        handCards: [],
    };

    for (const weapon of weapons) {
        player.handCards.push(
            generateCard(
                weapon,
                id,
                expertise,
                CardType.WEAPON,
            ),
        );
    }

    for (const singularEvidence of evidence) {
        player.handCards.push(
            generateCard(
                singularEvidence,
                id,
                expertise,
                CardType.WEAPON,
            ),
        );
    }

    return player;
}

function generateCard(
    description: string,
    expertPlayerId: string,
    expertise: string,
    type: CardType,
): Card {
    return {
        description,
        expertise,
        expertPlayerId,
        type,
        accuseeId: '',
        isConclusive: false,
    };
}
