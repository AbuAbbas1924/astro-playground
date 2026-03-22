import type { Alpine } from 'alpinejs'

const WS_URL       = 'ws://localhost:3000/ws/chat/general'
const BASE_DELAY   = 1_000
const MAX_DELAY    = 30_000
const MAX_ATTEMPTS = 8

export default (Alpine: Alpine) => {
  Alpine.store('chat', {
    // ── Public state (reactive) ────────────────────────────
    status:   'disconnected' as 'connected' | 'connecting' | 'disconnected' | 'failed',
    messages: [] as { sender: string; text: string; time: number }[],

    // ── Internal ───────────────────────────────────────────
    _ws:      null as WebSocket | null,
    _queue:   [] as string[],
    _attempt: 0,
    _timer:   null as ReturnType<typeof setTimeout> | null,

    // ── Boot ───────────────────────────────────────────────
    init() {
      this._connect()
    },

    _connect() {
      if (this._attempt >= MAX_ATTEMPTS) {
        this.status = 'failed'
        return
      }

      this.status = 'connecting'
      const ws = new WebSocket(WS_URL)
      this._ws  = ws

      ws.onopen = () => {
        this._attempt = 0
        this.status   = 'connected'
        this._flush()
      }

      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data)
        this.messages.push(msg)
      }

      ws.onclose = () => {
        this.status = 'disconnected'
        this._retry()
      }

      ws.onerror = () => ws.close()
    },

    _retry() {
      if (this._timer) clearTimeout(this._timer)
      const delay = Math.min(BASE_DELAY * 2 ** this._attempt + Math.random() * 500, MAX_DELAY)
      this._attempt++
      this._timer = setTimeout(() => this._connect(), delay)
    },

    _flush() {
      while (this._queue.length) {
        this._ws?.send(this._queue.shift()!)
      }
    },

    // ── Public API ─────────────────────────────────────────
    send(sender: string, text: string) {
      const payload = JSON.stringify({ sender, text })
      if (this._ws?.readyState === WebSocket.OPEN) {
        this._ws.send(payload)
      } else {
        this._queue.push(payload)
      }
    },

    retry() {
      this._attempt = 0
      if (this._timer) clearTimeout(this._timer)
      this._connect()
    }
  })
}