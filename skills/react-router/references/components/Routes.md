# Routes

Renders a branch of `<Route>` elements that best matches the current location, and renders only the first matching `<Route>`. Available in Framework, Data, and Declarative modes.

## Signature / Usage

```tsx
function Routes({ children, location }: RoutesProps): React.ReactElement | null

import { Route, Routes } from "react-router";

<Routes>
  <Route index element={<StepOne />} />
  <Route path="step-2" element={<StepTwo />} />
  <Route path="step-3" element={<StepThree />} />
</Routes>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | Nested `<Route>` elements that define the routing structure. |
| `location` | `Partial<Location> \| string` | The `Location` object to match against. Defaults to the current location if not specified. |

## Notes

- Renders only the first `<Route>` that matches the current location.
- Does **not** support data loading, actions, code splitting, or other route module features — best suited for simple declarative routing needs.
- Available in all three modes: Framework, Data, and Declarative.

## Related

- [Route](./Route.md)
- [Outlet](./Outlet.md)
