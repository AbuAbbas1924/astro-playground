/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

interface Env {
  CHAT_A1_ROOM: DurableObjectNamespace;
  CHAT_B1_ROOM: DurableObjectNamespace;
  CHAT_C1_ROOM: DurableObjectNamespace;
  SESSION: KVNamespace;
  ASSETS: Fetcher;
}
