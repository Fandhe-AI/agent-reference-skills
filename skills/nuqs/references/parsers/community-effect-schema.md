# Effect Schema Parsers

Effect Schemas encode two-way transformations between types, which makes them a fit for a nuqs parser: bridge them to `createParser` to parse and serialize URL state.

## Signature / Usage

```ts
import { createParser } from 'nuqs'
import { Schema, Either, Equal } from 'effect'

function createSchemaParser<T, E extends string>(schema: Schema.Schema<T, E>) {
  const encoder = Schema.encodeUnknownEither(schema);
  const decoder = Schema.decodeUnknownEither(schema);
  return createParser({
    parse: (queryValue) => {
      const result = decoder(queryValue);
      return Either.getOrNull(result);
    },
    serialize: (value) => {
      const result = encoder(value);
      return Either.getOrThrowWith(
        result,
        (cause) =>
          new Error(`Failed to encode value: ${value}`, {
            cause,
          }),
      );
    },
    eq: (a, b) => Equal.equals(a, b),
  });
}
```

Example:

```ts
import { Schema } from 'effect'

class User extends Schema.Class<User>('User')({
  name: Schema.String,
  age: Schema.Positive
}) {}

const ToBase64UrlEncodedJson = Schema.compose(Schema.StringFromBase64Url, Schema.parseJson())
const schema = Schema.compose(ToBase64UrlEncodedJson, User)

const parser = createSchemaParser(schema).withDefault(new User({ name: 'John Vim', age: 25 }))

const [user, setUser] = useQueryState('user', parser)
```

## Notes

- A decode failure becomes `null` via `Either.getOrNull`. An encode failure throws.
- Passing `Equal.equals` as `eq` lets the `clearOnDefault` equality check work for non-primitive values.

## Related

- [Custom parsers](./custom.md)
- [Zod codecs](./community-zod-codecs.md)
- [Sury Parsers](./community-sury.md)
