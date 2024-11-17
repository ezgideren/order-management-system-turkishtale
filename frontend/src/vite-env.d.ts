// src/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_SOCKET_URL: string
    // Add more env variables here
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}