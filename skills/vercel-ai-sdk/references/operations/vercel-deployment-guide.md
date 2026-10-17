---
source: https://ai-sdk.dev/docs/advanced/vercel-deployment-guide
---

# Vercel Deployment Guide

Deploying an AI SDK application (Next.js App Router) to Vercel, with considerations for function duration, request cancellation, and security.

## Signature / Usage

Increase the maximum function duration with route segment config (add at the top of the route handler or the page calling your server action):

```ts
export const maxDuration = 30;
```

Enable request cancellation for a route in `vercel.json`:

```json
{
  "functions": {
    "app/api/chat/route.ts": {
      "supportsCancellation": true
    }
  }
}
```

Forward the request signal to the AI SDK:

```ts
import { convertToModelMessages, streamText, type UIMessage } from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model,
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  });

  return result.toUIMessageStreamResponse();
}
```

## Notes

- Prerequisites: a Vercel account, a Git provider account (the guide uses GitHub), and an OpenAI API key. The guide deploys the Next.js (App Router) quickstart application.
- Flow: commit changes (ensure `.gitignore` excludes `.env` and `node_modules`), create a Git repo, import the project on the Vercel New Project page, add environment variables (paste your `.env.local`), and press Deploy. Vercel deploys automatically on every branch push and on merges to the production branch.
- Function duration: by default Vercel serverless functions have a maximum duration of 10 seconds on the Hobby tier, and an LLM response can take longer, in which case the server throws an error. The guide states you can increase to 60 seconds on the Hobby tier; for other tiers see the Vercel documentation for limits. (The troubleshooting page `timeout-on-vercel` describes Fluid Compute defaults, see `troubleshooting.md`.)
- Request cancellation: `useChat` and `useCompletion` abort the client request on `stop()`. To propagate cancellation to a Vercel Function and its model request you must (1) use the Node.js runtime (the default for Next.js route handlers), (2) enable `supportsCancellation` for the route in `vercel.json`, and (3) forward the route's `req.signal` to `streamText` / `generateText` as `abortSignal`. Without `supportsCancellation`, `stop()` closes the client-side stream but does not cancel the Vercel Function or model request.
- Security: LLM calls are costly, so protect against abuse. Rate limiting (see the Vercel guide on securing an AI app with rate limiting) and the Vercel Firewall (automatic DDoS mitigation; Enterprise teams get customization such as custom rules for IP blocking).
- Distinction: platform configuration (vercel.json fields, Functions, Firewall, deployment settings) is covered by the vercel skill; this page covers only the AI SDK deployment considerations.
- The official page's example calls `convertToModelMessages(messages)` without `await`; since v6 it returns a Promise, so `await` was added here.
- Troubleshooting links: streaming not working when proxied; timeouts on Vercel (see `troubleshooting.md`).

## Related

- [Stopping Streams](./stopping-streams.md)
- [Rate Limiting](./rate-limiting.md)
- [Troubleshooting](./troubleshooting.md)
