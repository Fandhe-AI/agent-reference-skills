# IsSessionFunction

A type definition for a function that type-guards whether a value is a React Router `Session` object.

## Signature / Usage

```typescript
type IsSessionFunction = (object: any) => object is Session;
```

`isSession` is the concrete function implementing this type signature.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `object` | `any` | The value to check |

Returns `boolean` — `true` if the value is a React Router `Session` object; otherwise `false`.

## Notes

- Available in **Framework Mode** and **Data Mode** only (not Declarative Mode)
- This is a type alias, not a runtime function; use `isSession` for the actual runtime check

## Related

- [isSession](./isSession.md)
- [createCookieSessionStorage](./createCookieSessionStorage.md)
- [sessions-and-cookies](./sessions-and-cookies.md)
