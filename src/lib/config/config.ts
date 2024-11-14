import dotenv from 'dotenv';
import { getOrThrowEnv } from '../utils/getOrThrowEnv.utils';

dotenv.config();

interface Config {
    port: number;
    mongodbUri: string;
}

const createConfig = (): Config => ({
    port: parseInt(getOrThrowEnv('PORT')),
    mongodbUri: getOrThrowEnv('MONGODB_URI'),
});

export default createConfig();