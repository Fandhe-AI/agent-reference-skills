# .client Modules

Files suffixed with `.client` (e.g., `utils.client.ts`) are excluded from the server bundle. All their exports are `undefined` on the server.

## Signature / Usage

```typescript
// app/utils/browser.client.ts
export const supportsVibration = "vibrate" in window.navigator;
export const canUseDOM = typeof window !== "undefined";
```

```tsx
// app/routes/dashboard.tsx
import { useEffect } from "react";
import { supportsVibration } from "../utils/browser.client";

export default function Dashboard() {
  useEffect(() => {
    // Safe: useEffect only runs in the browser
    if (supportsVibration) navigator.vibrate(100);
  }, []);
  return <div>Dashboard</div>;
}
```

## Naming Conventions

| Pattern | Example | Effect |
|---------|---------|--------|
| File suffix | `analytics.client.ts` | Single file excluded from server |
| Directory name | `.client/` or `components.client/` | Entire directory excluded from server |

```
app/
├── .client/            # all files inside are client-only
│   ├── analytics.ts
│   └── feature-flags.ts
├── utils.client.ts     # single client-only file
└── root.tsx
```

## Notes

- All exports from `.client` modules resolve to `undefined` during SSR — never read them at module scope in shared code.
- Safe usage locations: `useEffect`, event handlers (click, submit, etc.).
- Do **not** mark route modules as `.client` — route files must be accessible to both server and client module graphs.
- For more fine-grained control, use the [`vite-env-only`](https://github.com/pcattori/vite-env-only) plugin.

## Related

- [.server modules](./server-modules.md)
- [root.tsx](./root-tsx.md)
