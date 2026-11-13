---
source: https://opencode.ai/docs/build/plugins/server/#credentials
---

# Credentials

Make a saved credential the active one for its integration.

## Signature / Usage

```ts
await ctx.credential.activate({ credentialID })
```

### Reference

```ts
interface CredentialContext {
  activate(input: CredentialActivateInput, requestOptions?: RequestOptions): Promise<void>
}
```

## Related

- [Integrations](./integrations.md)
