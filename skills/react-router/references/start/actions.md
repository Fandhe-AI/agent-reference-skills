# Actions

Actions handle data mutations. When an action completes, all loader data on the page is automatically revalidated.

## Signature / Usage

### Server Action

```tsx
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");
  return await db.updateProject({ title });
}
```

- Server-only (stripped from the client bundle)
- Safe to use server-only APIs (databases, secrets, etc.)

### Client Action

```tsx
export async function clientAction({ request, serverAction }: Route.ClientActionArgs) {
  fakeInvalidateClientSideCache();
  const data = await serverAction();
  return data;
}
```

- Runs only in the browser
- Takes priority over the server `action` when both are defined

### Calling actions

#### 1. `<Form>` (declarative, adds a navigation/history entry)

```tsx
import { Form } from "react-router";
<Form method="post" action="/projects/123">
  <input type="text" name="title" />
  <button type="submit">Submit</button>
</Form>
```

#### 2. `useSubmit` (imperative, adds a navigation/history entry)

```tsx
const submit = useSubmit();
submit({ title: "New" }, { action: "/projects", method: "post" });
```

#### 3. `useFetcher` (no navigation/history entry)

```tsx
const fetcher = useFetcher();
<fetcher.Form method="post" action="/update-task/123">
  <input type="text" name="title" />
  <button type="submit">{fetcher.state !== "idle" ? "Saving..." : "Save"}</button>
</fetcher.Form>
```

### Optimistic UI

```tsx
function Task({ task }) {
  const fetcher = useFetcher();
  const optimisticTitle = fetcher.formData
    ? fetcher.formData.get("title") : task.title;
  return <fetcher.Form method="post">...</fetcher.Form>;
}
```

## Notes

- `method="post"` is required
- All loaders on the page automatically revalidate after an action completes
- The action's return value must be serializable
- `<Form>`/`useSubmit` add a browser history entry; `useFetcher` does not
- See the [Using Fetchers guide](../how-to/fetchers.md) for further fetcher patterns
- No breaking changes to the action APIs between v7 and v8

## Related

- [modes](./modes.md)
- [data-loading](./data-loading.md)
- [pending-ui](./pending-ui.md)
- [navigating](./navigating.md)
