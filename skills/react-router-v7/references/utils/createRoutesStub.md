# createRoutesStub

Creates a minimal router context for unit-testing reusable components that depend on React Router hooks (`useLoaderData`, `useActionData`, `useNavigate`, etc.).

## Signature

```typescript
function createRoutesStub(
  routes: StubRouteObject[],
  context?: Record<string, unknown>,
): React.ComponentType<{ initialEntries?: string[] }>
```

Each `StubRouteObject` accepts:

| Property | Type | Description |
|----------|------|-------------|
| `path` | `string` | Route path pattern |
| `Component` | `React.ComponentType` | Component to render |
| `loader` | `() => any` | Stub loader returning mock data |
| `action` | `() => any` | Stub action returning mock data |

## Usage

```tsx
import { createRoutesStub } from "react-router";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

test("LoginForm renders error messages", async () => {
  const Stub = createRoutesStub([
    {
      path: "/login",
      Component: LoginForm,
      action() {
        return {
          errors: {
            username: "Username is required",
            password: "Password is required",
          },
        };
      },
    },
  ]);

  render(<Stub initialEntries={["/login"]} />);
  userEvent.click(screen.getByText("Login"));
  await waitFor(() => screen.findByText("Username is required"));
});
```

## Notes

- Best suited for testing **presentational / reusable components** that consume router hooks — not for testing full route modules
- When testing Framework Mode route components that use `Route.*` types, type errors may occur because `matches` types won't align; suppress with `@ts-expect-error` if needed
- For route-level testing prefer integration or E2E tests (Playwright, Cypress)
- Available in **Framework Mode** and **Data Mode** only (not Declarative Mode)

## Related

- [createContext](./createContext.md)
