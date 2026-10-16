# Zod codecs

Since `zod@^4.1`, codecs add bidirectional serialisation / deserialisation (encode / decode) to validation schemas, usable in a custom nuqs parser.

## Signature / Usage

```ts
import { z } from 'zod'

// Similar to parseAsTimestamp in nuqs:
const dateTimestampCodec = z.codec(z.string().regex(/^\d+$/), z.date(), {
  decode: (query) => new Date(parseInt(query)),
  encode: (date) => date.valueOf().toFixed()
})
```

Refinements: the first type in a codec has to be rooted as a string data type (because that's what the URL gives), but you can add string refinements:

```ts
z.codec(z.uuid(), ...)
z.codec(z.email(), ...)
z.codec(z.base64url(), ...)
```

See the complete list of string refinements: https://zod.dev/api?id=string-formats

## Notes

- Requires `zod@^4.1`.
- As stated in the Zod docs, you cannot use transforms in codecs (https://zod.dev/codecs#transforms).
- Source: https://nuqs.dev/docs/parsers/community/zod-codecs (nuqs v2.10.2).

## Related

- [Custom parsers](./custom.md)
- [Effect Schema Parsers](./community-effect-schema.md)
- [Sury Parsers](./community-sury.md)
