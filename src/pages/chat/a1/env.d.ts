/// <reference types="astro/client" />

declare module 'alpinejs' {
  interface Stores {
    chat: {
      status:   'connected' | 'connecting' | 'disconnected' | 'failed'
      messages: { sender: string; text: string; time: number }[]
      send(sender: string, text: string): void
      retry(): void
      _queue: string[]
    }
  }
}