# Testing

`createRoutesStub` lets you unit-test components that depend on router context.

## Signature / Usage

```tsx
import { createRoutesStub } from "react-router";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const Stub = createRoutesStub([
  {
    path: "/login",
    Component: LoginForm,
    action() {
      return {
        errors: { username: "Username is required" },
      };
    },
  },
]);

render(<Stub initialEntries={["/login"]} />);
userEvent.click(screen.getByText("Login"));
await waitFor(() => screen.findByText("Username is required"));
```

### Compatibility with `Route.*` types

Components using Framework Mode's `Route.ComponentProps` may not type-check against `createRoutesStub`, because stubbed values don't match the app's real loader/action types and stub `matches` is typically incomplete compared to the real route tree.

```tsx
const Stub = createRoutesStub([{
  path: "/login",
  // @ts-expect-error: matches won't align
  Component: LoginRoute,
  action() { /* ... */ },
}]);
```

## Notes

- `createRoutesStub` is designed for unit-testing **reusable components**, not for fully testing Route components — use E2E tests (Playwright, Cypress) for that
- Available in Framework Mode and Data Mode (not available in Declarative Mode)
- Useful for testing components that use `useLoaderData`, `useActionData`, `useMatches`, `<Link>`, etc.
- No breaking changes to `createRoutesStub` between v7 and v8

## Related

- [modes](./modes.md)
- [route-module](./route-module.md)
- [actions](./actions.md)
