# isCookie

Returns `true` if a value is a React Router `Cookie` object, and `false` otherwise.

## Signature / Usage

```typescript
function isCookie(object: unknown): boolean
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `object` | `unknown` | The value to check |

Returns `boolean` — `true` if the value is a React Router `Cookie` object (e.g. created by `createCookie`); otherwise `false`.

## Notes

- Available in **Framework Mode** and **Data Mode** only (not Declarative Mode)
- Used to type-guard or validate whether a value is actually a `Cookie` object rather than a plain object

## Related

- [createCookie](./createCookie.md)
- [createCookieSessionStorage](./createCookieSessionStorage.md)
- [isSession](./isSession.md)
- [IsCookieFunction](./IsCookieFunction.md)
