export type GameList = Record<string, Game>;

export enum CardType {
    WEAPON = 'weapon',
    MOTIVE = 'motive',
    EVIDENCE = 'evidence',
}

export enum GameState {
    GATHER = 'gather', // people entering the game
    SHUFFLE = 'shuffle', // shuffle cards and suspects and accusor order
    ACCUSOR = 'accusor', // assign the first/next accusor
    COLLECT = 'collect', // everybody is dealt an evidence card and looks at it
    ACCUSE = 'accuse', // reveal accusor's cards
    REBUTTAL = 'rebuttal', // choose 'pass the blame (and another card)' or 'explain the evidence'
    PEEK = 'peek', // accusor gets to peek at a card, based on the result of the rebuttal
    EXPERT = 'expert', // expert chooses conclusive or inconclusive
    // then goes back to accusor
    REVELATION = 'revelation', // at any time, someone can make a thrilling revelation
    SWAP = 'swap', // if revelation is wrong, accused player can swap one card
    DONE = 'done', // game is finished
}

export type Game = {
    id: string,
    players: Record<string, Player>,
    tableCards: Card[],
    state: GameState,
    accusorIds: string[],
    currentAccusor: number,
    accusedId: string,
};

export type Player = {
    id: string,
    gameId: string,
    name: string,
    expertise: string,
    handCards: Card[],
    canFindEvidence: boolean, // false if they have made an incorrect revelation
};

export type Card = {
    id: string,
    gameId: string,
    description: string,
    type: CardType,
    expertise: string,
    expertPlayerId: string,
    accusedPlayerId: string,
    isConclusive: boolean, // if true, permanently face up and can't be traded
};

export type Nullable<T> = T | null;
