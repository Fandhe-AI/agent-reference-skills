# Outlet

Renders the matching child route element inside a parent route's component. Returns `null` when no child route matches the current URL.

## Props

| Name | Type | Description |
|------|------|-------------|
| `context` | `any` | Optional context value provided to the entire element tree below the outlet. Consumed via `useOutletContext()`. |

## 使用例

```tsx
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div>
      <nav>...</nav>
      <Outlet />
    </div>
  );
}
```

```tsx
// Passing context to child routes
<Outlet context={{ user }} />

// In a child route component
import { useOutletContext } from "react-router";
const { user } = useOutletContext();
```

## 注意点

- Only one `Outlet` should be rendered per route level in the component tree.
- Returns `null` (renders nothing) when no child route matches — this is intentional and safe.
- Available in all three modes: Framework, Data, and Declarative.

## 関連

- [Form.md](./Form.md)
