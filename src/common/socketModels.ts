export interface SetupPlayer {
    name: string;
    expertise: string;
    weapons: string[];
    evidence: string[];
}

export interface StartGame {
    playerId: string;
}
