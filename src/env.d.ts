/// <reference types="astro/client" />

interface Env {
  CHAT_ROOM: DurableObjectNamespace;
  SESSION: KVNamespace;
  ASSETS: Fetcher;
}
