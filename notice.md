# chat_a1
health `curl http://localhost:3000/health` <br>
testing <br>

1. put it into two terminals `bun run wscat -c ws://localhost:3000/ws/chat/testroom`
2. `{"sender":"Alice","text":"Hello from Alice!"}`

# post req
`curl -X POST http://localhost:4321/api/elysia/test -H "Content-Type: application/json" -d '{"a": "A" }'`


# deployment

### 1. build
`bun run build`

### OPTIONAL test wrangler auth
`bunx wrangler whoami`
### 2 deploy app 
`bunx wrangler deploy --config dist/server/wrangler.json`

### 2.1 deploy chatroom
`bunx wrangler deploy --config workers/chat-a1-room/wrangler.toml`
