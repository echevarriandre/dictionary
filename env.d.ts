/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

interface ImportMetaEnv {
  readonly VITE_APP_ID: string;
  readonly VITE_API_KEY: string;
  readonly VITE_API_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
