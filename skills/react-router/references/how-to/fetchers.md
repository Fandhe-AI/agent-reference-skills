# Fetchers

Fetchers allow loading and mutating data without causing a navigation. Each fetcher tracks its own independent state and is ideal for concurrent interactions such as inline editing, search comboboxes, and optimistic UI.

**Available in:** Framework mode and Data mode.

## Signature / Usage

1. Call `useFetcher()` to get a fetcher instance
2. Use `fetcher.Form` or `fetcher.submit()` to trigger an action or loader
3. Read `fetcher.state` (`"idle"` | `"submitting"` | `"loading"`) for pending UI
4. Read `fetcher.formData` for optimistic UI during submission
5. Read `fetcher.data` for the response from the action/loader

```tsx
import { useFetcher } from "react-router";

export default function Component() {
  const fetcher = useFetcher();
  // Optimistic title while submitting
  const title = fetcher.formData?.get("title") || loaderData.title;

  return (
    <div>
      <h1>{title}</h1>
      <fetcher.Form method="post">
        <input type="text" name="title" />
        {fetcher.state !== "idle" && <p>Saving...</p>}
        {fetcher.data?.error && (
          <p style={{ color: "red" }}>{fetcher.data.error}</p>
        )}
        <button type="submit">Save</button>
      </fetcher.Form>
    </div>
  );
}
```

## Notes

- Fetchers do not change the URL or navigate between routes
- Submitting to an action automatically revalidates loader data
- Use `import type { loader }` with `useFetcher<typeof loader>()` for type-safe loader responses
- Call `fetcher.submit(form)` to submit programmatically (e.g., on input change for search)

## Related

- [./form-validation.md](./form-validation.md)
- [./navigation-blocking.md](./navigation-blocking.md)
