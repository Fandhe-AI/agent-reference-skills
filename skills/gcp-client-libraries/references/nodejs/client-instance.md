---
source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/client-libraries.md
---

# Creating, initializing and closing the client

How to construct a gax-based Google Cloud client in Node.js, force authentication up front with `initialize()`, and release the connection with `close()`. The HOWTO uses `@google-cloud/library` and `SampleClient` as placeholders for a real package and client class (for example `SpeechClient`).

## Signature / Usage

### Import

```js
const library = require('@google-cloud/library');
```

```ts
import * as library from '@google-cloud/library';
```

### Create the client

```ts
const client = new library.SampleClient();
```

With no parameters the library figures out which credentials to use and instantiates the client with the gRPC transport and default settings.

### Force authentication

```ts
const client = new library.SampleClient();
await client.initialize(); // performs auth
```

### Close the client

```ts
client.close();
```

## Notes

- Create the client once and reuse it. Do not create a separate client for every call.
- The instance is not authenticated until the first request. `initialize()` avoids slowing down that first request.
- After `close()` the client cannot be used anymore.
- `@google-cloud/library` is a placeholder; every block on this page is a fragment that needs a real package.
- Options are covered in `client-options.md`; transport selection in `rest-fallback.md`; credential objects in the `nodejs-auth` category.
- This is the Google Cloud client library (`@google-cloud/*`) and is distinct from the `google-genai` Gemini SDK (`google-gemini-api` skill) and from `googleapis` (the Node.js Google API Client Library).
- Applies to `google-gax` 6.17.0 (npm).
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/client-libraries.md (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)

## Related

- [client-options.md](./client-options.md)
- [call-options.md](./call-options.md)
- [secret-manager-gapic.md](./secret-manager-gapic.md)
