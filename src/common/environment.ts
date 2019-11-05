import { config } from 'dotenv';
config();

type Environment = {
    appPort: number,
    playerIdLength: number,
};

const INT_RADIX = 10;

export const environment: Environment = {
    appPort: Number.parseInt(process.env.APP_PORT || '8033', INT_RADIX),
    playerIdLength: Number.parseInt(process.env.PLAYER_ID_LENGTH || '10', INT_RADIX),
};
