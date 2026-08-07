# isSession

Returns `true` if a value is a React Router `Session` object, and `false` otherwise.

## Signature / Usage

```typescript
function isSession(object: unknown): boolean
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `object` | `unknown` | The value to check |

Returns `boolean` — `true` if the value is a React Router `Session` object; otherwise `false`.

## Notes

- Available in **Framework Mode** and **Data Mode** only (not Declarative Mode)
- Commonly used to verify an object is a valid `Session` before calling session-specific methods

## Related

- [isCookie](./isCookie.md)
- [createCookieSessionStorage](./createCookieSessionStorage.md)
- [createMemorySessionStorage](./createMemorySessionStorage.md)
- [IsSessionFunction](./IsSessionFunction.md)
