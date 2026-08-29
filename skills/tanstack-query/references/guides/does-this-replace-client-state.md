---
source: https://tanstack.com/query/latest/docs/framework/react/guides/does-this-replace-client-state
---

# Does this replace Redux, MobX, or other global state managers?

TanStack Query is a **server-state** library, not a general client-state manager.

## Signature / Usage

```tsx
const globalState = {
  projects,
  teams,
  tasks,
  users,
  themeMode,
  sidebarStatus,
}
```

## Notes

- Redux/MobX/Zustand are **client-state** libraries that *can* store async data, but less efficiently than a dedicated tool like TanStack Query.
- Moving `projects`/`teams`/`tasks`/`users`-style server data into TanStack Query typically shrinks global client state down to genuinely local concerns (e.g. `themeMode`, `sidebarStatus`).
- It also removes boilerplate: connectors, action creators, middlewares, reducers, and manual loading/error states.
- TanStack Query is **not** a replacement for local/client-only state (e.g. a visual designer's synchronous state); it composes fine alongside any client state manager.

## Related

- [important-defaults.md](./important-defaults.md)
