declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
  }
}
declare module 'fakerator';
declare module 'd3-ease';
