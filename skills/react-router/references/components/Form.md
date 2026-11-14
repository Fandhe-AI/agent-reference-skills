# Form

A progressively enhanced HTML `<form>` that submits data to route actions via `fetch`, activating pending states in `useNavigation`. After submission completes, all page data is automatically revalidated. Available in Framework and Data modes; not available in Declarative mode.

## Signature / Usage

```tsx
import { Form } from "react-router";

function NewEvent() {
  return (
    <Form action="/events" method="post">
      <input name="title" type="text" />
      <input name="description" type="text" />
      <button type="submit">Create</button>
    </Form>
  );
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `action` | `string` | URL to submit form data to. Defaults to the closest route in context. |
| `method` | `"get" \| "post" \| "put" \| "patch" \| "delete"` | HTTP verb for submission. Only `"get"` and `"post"` support progressive enhancement. |
| `encType` | `string` | Encoding type: `"application/x-www-form-urlencoded"` (default), `"multipart/form-data"`, or `"text/plain"`. |
| `navigate` | `boolean` | When `false`, submits via fetcher internally instead of navigating. Shorthand for `useFetcher` + `<fetcher.Form>`. |
| `fetcherKey` | `string` | Specific fetcher key when using `navigate={false}` to pick up fetcher state elsewhere. |
| `replace` | `boolean` | Replaces current history entry instead of adding a new one. |
| `state` | `any` | State object to add to the History stack entry. |
| `preventScrollReset` | `boolean` | Prevents scroll reset to top on navigation completion. |
| `relative` | `"route" \| "path"` | Determines if `action` is relative to route hierarchy or pathname. |
| `reloadDocument` | `boolean` | Forces full document navigation instead of client-side routing. |
| `viewTransition` | `boolean` | **Deprecated** (8.5.0). Enables View Transition API for this navigation. Use React's `<ViewTransition>` component instead. |
| `discover` | `"render" \| "none"` | Lazy route discovery behavior. Default: `"render"`. |
| `onSubmit` | `(e: React.FormEvent) => void` | Callback on form submission. Call `e.preventDefault()` to cancel. |
| `defaultShouldRevalidate` | `boolean` | Specifies default revalidation behavior after submission. |

## Notes

- Works as a plain HTML form before JavaScript loads (progressive enhancement).
- Best for submissions that should change the URL or add browser history entries. Use `<fetcher.Form>` for submissions that should not affect History.
- Native HTML forms only support `"get"` and `"post"`; avoid other verbs if progressive enhancement is required.
- After the action completes, all page data revalidates automatically to keep the UI in sync.
- `defaultShouldRevalidate={false}` skips loader revalidation for this submission. Routes without a `shouldRevalidate` export use the value directly; routes that export one receive it as `defaultShouldRevalidate` and still decide. See [Revalidation Optimization](../how-to/optimize-revalidation.md).
- `viewTransition` is deprecated in favor of React's `<ViewTransition>` component (React 19.3+); see [View Transitions](../how-to/view-transitions.md)
- Source: https://reactrouter.com/api/components/Form (docs/api/components/Form.md at tag react-router@8.5.1: https://github.com/remix-run/react-router/blob/react-router@8.5.1/docs/api/components/Form.md)
- Source: https://github.com/remix-run/react-router/blob/react-router@8.5.1/packages/react-router/CHANGELOG.md (8.5.0 deprecation of view transition APIs, PR #15493)
- 8.5.1 ([CHANGELOG](https://github.com/remix-run/react-router/blob/react-router@8.5.1/packages/react-router/CHANGELOG.md), PR #15679): posting a `<Form>` to the current URL with an encoded `action` no longer adds duplicate history entries; the current entry is replaced when the `action` contains characters that get percent-encoded, such as spaces or non-ASCII characters

## Related

- [Link](./Link.md)
- [ScrollRestoration](./ScrollRestoration.md)
