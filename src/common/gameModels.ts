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
