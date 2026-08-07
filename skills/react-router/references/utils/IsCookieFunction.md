# IsCookieFunction

A type definition for a function that type-guards whether a value is a React Router `Cookie` object.

## Signature / Usage

```typescript
type IsCookieFunction = (object: any) => object is Cookie;
```

`isCookie` is the concrete function implementing this type signature.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `object` | `any` | The value to check |

Returns `boolean` — `true` if the value is a React Router `Cookie` object; otherwise `false`.

## Notes

- Available in **Framework Mode** and **Data Mode** only (not Declarative Mode)
- This is a type alias, not a runtime function; use `isCookie` for the actual runtime check

## Related

- [isCookie](./isCookie.md)
- [createCookie](./createCookie.md)
- [sessions-and-cookies](./sessions-and-cookies.md)
