import dotenv from 'dotenv';

dotenv.config();

const nodeEnvValues = ['production', 'development', 'testing'] as const;
export type NodeEnv = typeof nodeEnvValues[number];

function isValidNodeEnv(value: unknown): value is NodeEnv {
    return typeof value === 'string' && nodeEnvValues.includes(value as NodeEnv);
}

interface Config {
    nodeEnv: NodeEnv,
    jwtSecret: string,
    port: number,
    logging: boolean,
}

export type OverridableConfig = Omit<Partial<Config>, 'jwtSecret' | 'nodeEnv'>;

const nodeEnv = process.env.NODE_ENV || 'development';
if (!isValidNodeEnv(nodeEnv)) {
    throw new Error(`Received invalid value for environment variable NODE_ENV=${nodeEnv}`);
}

let envConfig: Partial<Config>;
switch (nodeEnv) {
    case 'production': {
        envConfig = require('./config.production').default;
        break;
    }

    case 'development': {
        envConfig = require('./config.development').default;
        break;
    }

    case 'testing': {
        envConfig = require('./config.testing').default;
        break;
    }
}

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error('Missing value for environment variable JWT_SECRET!');
}

const config: Config = {
    nodeEnv,
    jwtSecret,
    port: parseInt(process.env.PORT || '3001'),
    logging: false,
    ...envConfig,
};

export default config;