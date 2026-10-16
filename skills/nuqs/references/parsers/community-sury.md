# Sury Parsers

A Sury schema reads a value, writes it back and compares two of them, which is everything a nuqs parser needs.

## Signature / Usage

```ts
import { createParser } from 'nuqs'
import * as S from 'sury'

function createSuryParser<Output>(schema: S.Schema<string, Output>) {
  return createParser<Output>({
    parse: S.parseOrThrow(schema),
    serialize: S.encodeOrThrow(schema),
    eq: S.isEqualOutput(schema)
  })
}
```

Coercions come built in, so a query value arrives as the type you asked for, and anything the schema rejects reads back as `null`:

```ts
createSuryParser(S.string.with(S.to, S.number)) // ?page=2 → 2
createSuryParser(S.string.with(S.to, S.date)) // ?from=2025-06-12 → Date
createSuryParser(S.union(['asc', 'desc'])) // ?sort=sideways → null
createSuryParser(S.string.with(S.to, S.int32.with(S.gte, 1))) // ?page=0 → null
```

Schemas compose, so an encoding several steps deep is still one schema:

```ts
const schema = S.base64url.with(S.to, S.jsonString).with(
  S.to,
  S.schema({
    name: S.string.with(S.nonEmpty),
    age: S.int32.with(S.gte, 1)
  })
)

const [user, setUser] = useQueryState(
  'user',
  createSuryParser(schema).withDefault({ name: 'John Vim', age: 25 })
)

// ?user=eyJuYW1lIjoiSm9obiBWaW0iLCJhZ2UiOjI1fQ
```

## Notes

- Setting the state back to `{ name: 'John Vim', age: 25 }` clears the query param, even though it's a different object than the default: the schema knows how to compare two users.

## Related

- [Custom parsers](./custom.md)
- [Zod codecs](./community-zod-codecs.md)
- [Effect Schema Parsers](./community-effect-schema.md)
