import dotenv from 'dotenv';

//download env
dotenv.config();

const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'myapp';
const MYSQL_USER = process.env.MYSQL_USER || 'root';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'Password@123'

const MYSQL = {
    host:MYSQL_HOST,
    database:MYSQL_DATABASE,
    user:MYSQL_USER,
    password: MYSQL_PASSWORD
}

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.PORT || 3000
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'coolIssuer';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'superencryptedsecret';

const SERVER = {
    hostname:SERVER_HOSTNAME,
    port:SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer:SERVER_TOKEN_ISSUER,
        secret:SERVER_TOKEN_SECRET
    }
};

const config = {
    mysql:MYSQL,
    server:SERVER
};
export default config;