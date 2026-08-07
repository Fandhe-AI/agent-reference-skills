# Navigating

Methods for user navigation: `<Link>`, `<NavLink>`, `<Form>`, `redirect`, `useNavigate`.

## Signature / Usage

### NavLink

Link with active/pending state styling.

```tsx
import { NavLink } from "react-router";

<NavLink to="/messages" className={({ isActive, isPending, isTransitioning }) =>
  isActive ? "active" : isPending ? "pending" : isTransitioning ? "transitioning" : ""
}>Messages</NavLink>
```

Default CSS classes: `.active`, `.pending`, `.transitioning`. The `className`/`style`/children props also accept callback functions receiving `{ isActive, isPending, isTransitioning }`.

### Link

Plain link, no active-state styling.

```tsx
import { Link } from "react-router";
<Link to="/login">Login</Link>
```

### Form navigation

```tsx
<Form action="/search">
  <input type="text" name="q" />
</Form>
```

GET (default): navigates with the data encoded as `URLSearchParams`. POST (`method="post"`): submits as `FormData`.

### redirect

Server-side redirect from within a loader/action.

```tsx
import { redirect } from "react-router";

export async function loader({ request }) {
  const user = await getUser(request);
  if (!user) return redirect("/login");
  return { userName: user.name };
}
```

### useNavigate

Programmatic navigation (recommended only for cases without direct user interaction).

```tsx
const navigate = useNavigate();
navigate("/logout");
```

## Options / Props

| Method | Use case | Adds history entry |
| --- | --- | --- |
| `<Link>` | Standard link | yes |
| `<NavLink>` | Link with active/pending state | yes |
| `<Form>` | Form-submission navigation | yes |
| `redirect()` | Server-side redirect | yes |
| `useNavigate()` | Programmatic (limited use) | yes |

## Notes

- Prefer `useFetcher()` over `<Form method="post">` when a POST submission shouldn't cause navigation
- `useNavigate()` should be avoided for user-triggered navigation — use `<Link>`/`<NavLink>` instead
- No breaking changes to the navigation APIs between v7 and v8

## Related

- [modes](./modes.md)
- [pending-ui](./pending-ui.md)
- [actions](./actions.md)
- [routing](./routing.md)
