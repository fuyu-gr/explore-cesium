/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown; // to disallow unknown keys.
}

interface ImportMetaEnv {
  readonly VITE_CESIUM_TOKEN: string;
  readonly VITE_CESIUM_CONTAINER_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
