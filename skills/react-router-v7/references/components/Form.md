# Form

A progressively enhanced HTML `<form>` that submits data to route actions via `fetch`, activating pending states in `useNavigation`. After submission completes, all page data is automatically revalidated.

## Props

| Name | Type | Description |
|------|------|-------------|
| `action` | `string` | URL to submit form data to. Defaults to the closest route in context. |
| `method` | `"get" \| "post" \| "put" \| "patch" \| "delete"` | HTTP verb for submission. Only `"get"` and `"post"` support progressive enhancement. |
| `encType` | `string` | Encoding type: `"application/x-www-form-urlencoded"` (default), `"multipart/form-data"`, or `"text/plain"`. |
| `navigate` | `boolean` | When `false`, submits via fetcher internally instead of navigating. |
| `fetcherKey` | `string` | Specific fetcher key when using `navigate={false}` to pick up fetcher state elsewhere. |
| `replace` | `boolean` | Replaces current history entry instead of adding a new one. |
| `state` | `any` | State object to add to the History stack entry. |
| `preventScrollReset` | `boolean` | Prevents scroll reset to top on navigation completion. |
| `relative` | `"route" \| "path"` | Determines if `action` is relative to route hierarchy or pathname. |
| `reloadDocument` | `boolean` | Forces full document navigation instead of client-side routing. |
| `viewTransition` | `boolean` | Enables View Transition API for this navigation. |
| `discover` | `"render" \| "none"` | Lazy route discovery behavior. Default: `"render"`. |
| `onSubmit` | `(e: React.FormEvent) => void` | Callback on form submission. Call `e.preventDefault()` to cancel. |
| `unstable_defaultShouldRevalidate` | `boolean` | Specifies default revalidation behavior after submission. |

## 使用例

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

## 注意点

- Works as a plain HTML form before JavaScript loads (progressive enhancement).
- Best for submissions that should change the URL or add browser history entries. Use `<fetcher.Form>` for submissions that should not affect History.
- Native HTML forms only support `"get"` and `"post"`; avoid other verbs if progressive enhancement is required.
- After the action completes, all page data revalidates automatically to keep the UI in sync.

## 関連

- [Link.md](./Link.md)
- [ScrollRestoration.md](./ScrollRestoration.md)
