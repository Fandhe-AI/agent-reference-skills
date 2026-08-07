# Encryption Middleware

End-to-end encryption for event data and function/step output. All encryption and decryption happens inside your own infrastructure — only encrypted data is sent to Inngest servers.

## Signature / Usage

```ts
import { Inngest } from "inngest";
import { encryptionMiddleware } from "@inngest/middleware-encryption";

const inngest = new Inngest({
  id: "my-app",
  middleware: [
    encryptionMiddleware({ key: process.env.MY_ENCRYPTION_KEY }),
  ],
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `key` | `string` | Encryption secret; store as an environment variable, never hardcode. |
| `eventEncryptionField` | `string` | Which `event.data` field to encrypt (defaults to `"encrypted"`). |
| `decryptOnly` | `boolean` | Disables encryption of new data while still decrypting existing encrypted data (for phasing out encryption). |
| `fallbackDecryptionKeys` | `string[]` | Additional keys attempted during decryption; needed when rotating keys since older data may use a different key. |

## Notes

- By default, encrypts all step data, all function output, and the `event.data.encrypted` field.
- Key rotation flow: deploy with the current key → add the new key as primary with the current key in `fallbackDecryptionKeys` → once old data has expired, remove the legacy key.
- Interoperable across the TypeScript and Python SDKs — encrypted events/data can be produced and consumed across languages.
- Requires the separate `@inngest/middleware-encryption` package.

## Related

- [Middleware](./middleware.md)
- [Inngest Client](./inngest-client.md)
