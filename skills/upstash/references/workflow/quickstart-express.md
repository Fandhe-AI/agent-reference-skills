# Quickstart: Express.js

Integrate Upstash Workflow with Express.js.

## Signature / Usage

```bash
npm install @upstash/workflow
```

```typescript
import { serve } from "@upstash/workflow/express"
import express from "express"
import { config } from "dotenv"

config()
const app = express()
app.use(express.json())

app.post(
  "/workflow",
  serve<{ message: string }>(async (context) => {
    const res1 = await context.run("step1", async () => {
      return context.requestPayload.message
    })

    await context.run("step2", async () => {
      console.log("step1 result:", res1)
    })
  })
)

app.listen(3000, () => console.log("Server running on port 3000"))
```

```bash
# Trigger
curl -X POST http://localhost:3000/workflow \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from the workflow!"}'
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `QSTASH_URL` | QStash endpoint (local dev: `http://127.0.0.1:8080`) |
| `QSTASH_TOKEN` | QStash API token |

## Notes

- Express integration only works with `Content-Type: application/json` header; other content types are not supported
- For local development, use a `.env` file with `dotenv`; run `npx @upstash/qstash-cli dev` for local QStash

## Related

- [serve](./serve.md)
- [local-development](./local-development.md)
