# Navigate

A component wrapper around `useNavigate` for use in React class components where hooks are not available. Triggers an immediate navigation when rendered.

## Props

| Name | Type | Description |
|------|------|-------------|
| `to` | `string \| Path` | The path to navigate to. Accepts a string or a `{ pathname, search, hash }` Path object. |
| `replace` | `boolean` | Replaces the current History entry instead of pushing a new one. |
| `state` | `any` | State to pass to the new location, stored in `history.state`. |
| `relative` | `RelativeRoutingType` | How to interpret relative routing in the `to` prop (`"route"` or `"path"`). |

## 使用例

```tsx
import { Navigate } from "react-router";

// Inside a class component render method
if (!isLoggedIn) {
  return <Navigate to="/login" replace />;
}
```

## 注意点

- Designed specifically for **React class components** where hooks cannot be called. Prefer `useNavigate` in function components.
- Renders `null` — it has no visible output; it only performs the navigation as a side effect.
- Available in all three modes: Framework, Data, and Declarative.

## 関連

- [Link.md](./Link.md)
- [Form.md](./Form.md)
