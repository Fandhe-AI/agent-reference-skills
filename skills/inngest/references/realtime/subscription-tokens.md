# Subscription Tokens

Clients cannot subscribe to a realtime channel directly. The server mints a short-lived subscription token that authorizes access to one channel and an explicit list of topics, then hands it to the browser.

## Signature / Usage

```ts
"use server";

import { getClientSubscriptionToken } from "inngest/react";
import { inngest } from "@/inngest/client";
import { aiChannel } from "@/inngest/channels";

export async function fetchAIToken(threadId: string) {
  return getClientSubscriptionToken(inngest, {
    channel: aiChannel({ threadId }),
    topics: ["status", "tokens", "result"],
  });
}
```

## Notes

- `getClientSubscriptionToken()` (imported from `inngest/react`, though not React-specific) returns a serializable `{ key, apiBaseUrl }` object safe to send to the browser. `apiBaseUrl` is resolved server-side from `INNGEST_DEV`, so `useRealtime` connects to the right environment without browser env vars.
- A token is a capability: anyone holding it can read every message on its channel/topic set until expiry. Always authorize the caller (session/permission check) inside the function that mints the token, before minting.
- Never pass an unchecked client-supplied value straight into the channel function — a caller could mint a token scoped to someone else's data.
- Scope tokens narrowly: one channel per token (mint multiple tokens for multiple channels); grant only the topics the view needs (omitted topics cannot be subscribed to even if requested); derive channel parameters that identify a user from the session, not the request body.
- Pass a token **factory** (`token: () => fetchToken()`) to `useRealtime` rather than a pre-minted token — the factory reruns on mount and on every reconnect, keeping the token fresh automatically.
- Server-side code that already holds the Inngest client does not need a token: `inngest.realtime.subscribe()` / `subscribe({ app: inngest, ... })` authenticate directly with the client's signing key.
- For the full (non-client-safe) token including channel and topics, use `inngest.realtime.token({ channel, topics })` or `getSubscriptionToken()` from `inngest/realtime` — do not send these to a browser as-is.

## Related

- [Channels & Topics](./channels.md)
- [Subscribing](./subscribing.md)
- [useRealtime](./use-realtime.md)
