---
source: https://opencode.ai/docs/build/
---

# Intro

OpenCode is used by millions every day. Build on top of it to create your own applications, integrations, and agent experiences without starting from scratch.

We also offer Effect APIs for plugins, clients, and embedded apps.

## Signature / Usage

### Extend OpenCode

Build plugins that add tools, integrations, commands, agents, and custom behavior while keeping the rest of OpenCode intact.

### Run it as a server

Connect to OpenCode with the same client used by the TUI and desktop app, then build any interface, workflow, or agent experience around it.

### Embed it

Embed OpenCode directly into your application and build a completely custom agent, interface, or developer product around it.

Snippet taken from https://opencode.ai/docs/build/client/ (install command for the "Run it as a server" path):

```sh
bun add @opencode/client
```

## Notes

- The page has no code of its own; the snippet above is borrowed from the client page.

## Related

- [client.md](./client.md) — Run it as a server (`@opencode/client`)
- [sdk.md](./sdk.md) — Embed it (`@opencode/sdk`)
- [sdk-cloudflare.md](./sdk-cloudflare.md) — Embed in a Cloudflare Durable Object
- Plugins: https://opencode.ai/docs/build/plugins/
- Effect APIs: https://opencode.ai/docs/build/plugins/effect/, https://opencode.ai/docs/build/client/effect/, https://opencode.ai/docs/build/sdk/effect/
