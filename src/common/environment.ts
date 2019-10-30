import { config } from 'dotenv';
config();

type Environment = {
    appPort: number,
    gameIdLength: number,
    playerIdLength: number,
};

const INT_RADIX = 10;

export const environment: Environment = {
    appPort: Number.parseInt(process.env.APP_PORT || '8033', INT_RADIX),
    gameIdLength: Number.parseInt(process.env.GAME_ID_LENGTH || '6', INT_RADIX),
    playerIdLength: Number.parseInt(process.env.PLAYER_ID_LENGTH || '6', INT_RADIX),
};
