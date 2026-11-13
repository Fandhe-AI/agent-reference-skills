---
source: https://opencode.ai/docs/build/sdk/
---

# Install client and SDK packages

Commands to add the OpenCode network client (`@opencode/client`), the embedded SDK (`@opencode/sdk`), and their Effect variants.

## Signature / Usage

### Network client (JavaScript)

Source: https://opencode.ai/docs/build/client/

```sh
bun add @opencode/client
```

### Network client (Effect)

Source: https://opencode.ai/docs/build/client/effect/

```sh
bun add @opencode/client effect@4.0.1
```

Node-only local background service entrypoint (`@opencode/client/effect/service`):

```sh
bun add @effect/platform-node@4.0.1
```

### Embedded SDK

Source: https://opencode.ai/docs/build/sdk/

```sh
bun add @opencode/sdk
```

### Embedded SDK (Effect)

Source: https://opencode.ai/docs/build/sdk/effect/

```sh
bun add @opencode/sdk effect@4.0.1
```

### Embedded SDK on Cloudflare Durable Objects

Source: https://opencode.ai/docs/build/sdk/cloudflare/

```sh
bun add @opencode/sdk
```

Wrangler configuration required by the guide:

```jsonc title="wrangler.jsonc"
{
  "compatibility_flags": ["nodejs_compat"]
}
```

## Notes

- The official docs use `bun add` only; no npm / pnpm / yarn equivalents are documented.
- `@opencode/client` connects to an OpenCode server over the network; `@opencode/sdk` hosts OpenCode in-process with no HTTP listener.
- `build/sdk/cloudflare` is OpenCode's own `@opencode/sdk/workerd` profile for Durable Objects and is distinct from cloudflare-agents and cloudflare-sandbox-containers.
- The Effect variants use the `effect` npm package (v4, pinned `4.0.1` in the docs), unrelated to React's `useEffect`.

## Related

- [Plugin development commands](./plugin-dev.md)
- https://opencode.ai/docs/build/client/
- https://opencode.ai/docs/build/sdk/
