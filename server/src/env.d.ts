declare namespace NodeJS {
  export interface ProcessEnv {
    SESSION_SECRET: string;
    SESSION_LIFETIME: string;
  }
}
