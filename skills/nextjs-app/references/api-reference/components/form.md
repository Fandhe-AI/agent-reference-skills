# Form Component (`next/form`)

The `<Form>` component extends the HTML `<form>` element to provide prefetching of loading UI, client-side navigation on submission, and progressive enhancement for forms that update URL search params.

## Signature / Usage

```tsx
import Form from 'next/form'

export default function Page() {
  return (
    <Form action="/search">
      {/* On submission, appended to URL: /search?query=abc */}
      <input name="query" />
      <button type="submit">Submit</button>
    </Form>
  )
}
```

## Options / Props

Behavior depends on whether `action` is a `string` (native-like GET navigation) or a `function` (React Server Action).

### `action` as string

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `action` | `string` (URL or relative path) | Yes | Path to navigate to on submit. Empty string `""` navigates to the same route with updated search params |
| `replace` | `boolean` | - | Replace current history state instead of pushing. Default `false` |
| `scroll` | `boolean` | - | Controls scroll behavior on navigation. Default `true` |
| `prefetch` | `boolean` | - | Whether to prefetch the path when the form enters the viewport. Default `true` |

### `action` as function

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `action` | `function` (Server Action) | Yes | Server Action invoked on submit; `replace`/`scroll` props are ignored in this mode |

## Notes

- When `action` is a string, Next.js prefetches shared UI (`layout.js`, `loading.js`) when the form becomes visible, and performs a client-side navigation on submit instead of a full reload.
- `formAction` on a `<button>`/`<input type="submit">` overrides `action` but does not support prefetching; when using `basePath`, include it in `formAction`.
- Passing a `key` prop to a string `action` is not supported; use a function `action` to trigger re-renders/mutations.
- `onSubmit` can add logic, but calling `event.preventDefault()` overrides `<Form>` navigation behavior.
- `method`, `encType`, `target` (and their `formMethod`/`formEncType`/`formTarget` counterparts) are not supported and fall back to native browser behavior; use a plain `<form>` if needed.
- `<input type="file">` with a string `action` submits the filename, not the file object (matches browser behavior).
- Since the destination of a function `action` isn't known until executed, `<Form>` cannot prefetch shared UI in that mode.
- Combine with `useFormStatus` (from `react-dom`) for instant pending-state feedback while shared UI is still loading.

## Related

- [Link Component](./link.md)
