export enum CardType {
    WEAPON = 'weapon',
    EVIDENCE = 'evidence',
}

export enum GameState {
    GATHER = 'gather', // waiting for people entering the game
    SHUFFLE = 'shuffle', // done waiting; shuffle cards and suspects and accusor order
    COLLECT = 'collect', // everybody is dealt an evidence card and wait for everybody to look
    ACCUSE = 'accuse', // reveal accusor's cards wait for accusor explanation
    REBUTTAL = 'rebuttal', // wait for accusee to choose 'pass the blame (and another card)' or 'explain the evidence'
    REBUTTAL_SWAP = 'rebuttalSwap', // wait for accusee to choose another card (if they pass the blame)
    REBUTTAL_EXPLAIN = 'rebuttalExplain', // wait for accusee to finish their explanation
    PEEK = 'peek', // wait for accusor to peek at an accusee card (if they explain the evidence)
    EXPERT = 'expert', // wait for expert to choose conclusive or inconclusive
    // then goes back to collect
    REVELATION = 'revelation', // at any time, someone can make a thrilling revelation
    REVELATION_SWAP = 'revelationSwap', // if revelation is wrong, accused player can swap one card
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
