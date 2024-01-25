declare namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    PORT: string;
    DB_URL: string;
  }
}
