# @upstash/redis — TypeScript SDK Troubleshooting

Common `@upstash/redis` problems: missing `fetch`, base64-looking ("hashed") responses, and large numbers returned as strings.

## Signature / Usage

```bash
npm i isomorphic-fetch
```

```ts
import { Redis } from "@upstash/redis";
import "isomorphic-fetch";

const redis = new Redis({
  /*...*/
});
```

```ts
const redis = new Redis({
  // ...
  responseEncoding: false,
});
```

## Notes

- `ReferenceError: fetch is not defined`: Node.js v17 and earlier have no native `fetch`. Vercel, Netlify, Deno, Fastly etc. provide a polyfill; on bare Node install `isomorphic-fetch` and import it
- Hashed response (`await redis.get("key")` returns `dmFsdWU=`): versions before 1.40.0 requested base64-encoded responses by default, so an undecoded response shows base64. Upgrade to 1.40.0 or later (plain responses by default), or set `responseEncoding: false`. Since 1.40.0 `responseEncoding: "base64"` restores the old behaviour (release notes)
- Large numbers (above `2^53 - 1`) cannot be deserialized safely in JavaScript, so the default deserializer returns them as strings (`await redis.set("key", "101600000000150081467")` reads back as `"101600000000150081467"`); handle them with care and expect a mismatch with custom types
- Source: https://upstash.com/docs/redis/sdks/ts/troubleshooting (fetched 2026-11-14; no version pin on the site)
- Source: https://github.com/upstash/redis-js/releases (1.40.0 release notes, checked 2026-11-14)

## Related

- [TypeScript SDK Overview](./ts-sdk-overview.md)
- [Deployment Environments](./deployment.md)
- [REST API](./rest-api.md)
