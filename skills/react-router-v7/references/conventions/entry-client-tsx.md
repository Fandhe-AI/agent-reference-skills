# entry.client.tsx

Optional browser entry point in Framework Mode. Hydrates server-rendered markup on the client. React Router provides a default implementation when this file is absent.

## Signature / Usage

```tsx
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>
  );
});
```

## Key APIs

| API | Source | Description |
|-----|--------|-------------|
| `HydratedRouter` | `react-router/dom` | Sets up client-side routing and hydrates the router state sent from the server |
| `hydrateRoot` | `react-dom/client` | React DOM API that attaches the React tree to the server-rendered HTML |
| `startTransition` | `react` | Wraps hydration as a non-urgent update to avoid blocking the browser |

## Notes

- This file is **optional**. If absent, React Router uses its built-in default.
- Create this file only when you need to initialize client-side libraries (analytics, error reporters, providers) before or around hydration.
- Use `npx react-router reveal` to scaffold the default implementation as a starting point.
- `StrictMode` is recommended for development but can be removed if it causes issues with third-party libraries.

## Related

- [entry.server.tsx](./entry-server-tsx.md)
- [root.tsx](./root-tsx.md)
