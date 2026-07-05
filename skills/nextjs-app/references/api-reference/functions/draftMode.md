# draftMode

`draftMode` is an async function to enable/disable Draft Mode, and check if it is enabled, in a Server Component.

## Signature / Usage

```tsx
import { draftMode } from 'next/headers'

export default async function Page() {
  const { isEnabled } = await draftMode()
}
```

## Options / Props

| Method | Description |
| --- | --- |
| `isEnabled` | Boolean indicating if Draft Mode is enabled. |
| `enable()` | Enables Draft Mode in a Route Handler by setting a `__prerender_bypass` cookie. |
| `disable()` | Disables Draft Mode in a Route Handler by deleting the cookie. |

## Notes

- Asynchronous — must use `async/await` or React's `use()`. (Synchronous access still works in v15 for backwards compatibility with v14 but is deprecated.)
- A new bypass cookie value is generated on each `next build`, so it can't be guessed.
- Third-party cookies/local storage must be allowed in the browser to test Draft Mode locally over HTTP.
- `isEnabled` is readable inside a `use cache` scope, but `enable()`/`disable()` throw if called there.
- When Draft Mode is enabled, cached functions/components under a caching directive scope re-execute on every request (not cached).
- When linking to the enable route via `<Link>`, pass `prefetch={false}` to avoid accidentally clearing the cookie on prefetch.
- Became async in `v15.0.0-RC` (codemod available); introduced in `v13.4.0`.

## Related

- [Draft Mode guide](https://nextjs.org/docs/app/guides/draft-mode)
