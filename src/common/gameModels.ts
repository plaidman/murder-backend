export enum CardType {
    WEAPON = 'weapon',
    EVIDENCE = 'evidence',
}

export enum GameState {
    GATHER = 'gather', // people entering the game
    SHUFFLE = 'shuffle', // shuffle cards and suspects and accusor order
    COLLECT = 'collect', // everybody is dealt an evidence card and looks at it
    ACCUSE = 'accuse', // reveal accusor's cards
    REBUTTAL = 'rebuttal', // choose 'pass the blame (and another card)' or 'explain the evidence'
    PEEK = 'peek', // accusor gets to peek at a card, based on the result of the rebuttal
    EXPERT = 'expert', // expert chooses conclusive or inconclusive
    // then goes back to collect
    REVELATION = 'revelation', // at any time, someone can make a thrilling revelation
    SWAP = 'swap', // if revelation is wrong, accused player can swap one card
    OVER = 'over', // game is finished
}

export interface Game {
    players: Record<string, Player>;
    tableCards: Card[];
    state: GameState;
    accusorIds: string[];
    currentAccusor: number;
    accusedId: string;
    messages: string[];
}

export interface Player {
    id: string;
    name: string;
    expertise: string;
    handCards: Card[];
    canFindEvidence: boolean; // false if they have made an incorrect revelation
}

export interface Card {
    description: string;
    type: CardType;
    expertise: string;
    expertPlayerId: string;
    accusedPlayerId: string;
    isConclusive: boolean; // if true, permanently face up and can't be traded
}

export function generateNewGame(): Game {
    return {
        accusedId: '',
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
        accusedPlayerId: '',
        isConclusive: false,
    };
}
