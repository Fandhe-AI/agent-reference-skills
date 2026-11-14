# View Transitions

Animate client-side navigations with React's `<ViewTransition>` component (React and React DOM 19.3 or later). React Router's own `viewTransition` props/options, `useViewTransitionState` hook, and `NavLink`'s `isTransitioning` render prop and `transitioning` class are deprecated (8.5.0) but continue to work, including with older React versions.

**Available in:** Framework mode, Data mode and Declarative mode (React `<ViewTransition>`); the legacy APIs are available in Framework and Data modes.

## Signature / Usage

Wrap the outlet in a persistent `<ViewTransition>` boundary in a shared layout route. In Framework Mode this can be your root route's default export; in Data and Declarative modes use it as the component for a parent route with children:

```tsx
import { ViewTransition } from "react";
import { Link, Outlet } from "react-router";

export default function PageLayout() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <ViewTransition>
        <main>
          <Outlet />
        </main>
      </ViewTransition>
    </>
  );
}
```

### Legacy View Transitions (Deprecated)

1. Add `viewTransition` prop to `<Link>`, `<NavLink>`, or `<Form>`
2. Or pass `{ viewTransition: true }` to `useNavigate()`
3. Assign `view-transition-name` CSS property to elements that should animate
4. Use `isTransitioning` render prop on `<NavLink>` or `useViewTransitionState(href)` hook to conditionally apply transition names

```tsx
// Basic cross-fade
<Link to="/about" viewTransition>About</Link>

// Programmatic navigation
const navigate = useNavigate();
navigate("/about", { viewTransition: true });
```

```tsx
// Element-level transition with NavLink render prop
<NavLink to={`/image/${idx}`} viewTransition>
  {({ isTransitioning }) => (
    <>
      <p style={{ viewTransitionName: isTransitioning ? "image-title" : "none" }}>
        Image {idx}
      </p>
      <img
        src={src}
        style={{ viewTransitionName: isTransitioning ? "image-expand" : "none" }}
      />
    </>
  )}
</NavLink>
```

```css
/* Detail page — match the same transition names */
.image-detail h1 { view-transition-name: image-title; }
.image-detail img { view-transition-name: image-expand; }
```

## Notes

- Keep the `<ViewTransition>` boundary mounted across navigations; no need to key it by location. React Router wraps router state updates in `React.startTransition` by default, so do not set `useTransitions={false}` on your router, and avoid synchronous updates such as `flushSync`, which can prevent React's animations
- Migrating: remove `viewTransition` from `<Link>`, `<NavLink>`, and `<Form>` and remove `viewTransition: true` from navigation/submission options (enabling both implementations can interrupt animations); replace `useViewTransitionState`, `isTransitioning`, and `.transitioning` styles with React's View Transition classes; for shared elements wrap each side in `<ViewTransition name="...">` with the same unique name
- React's component is not a drop-in replacement for every legacy animation: React skips view transitions for synchronous updates from `popstate`, so browser Back/Forward navigations may not animate. Browsers without View Transitions support still navigate normally
- Browser support for the View Transitions API varies; add a feature check or graceful degradation as needed
- Each `view-transition-name` value must be unique on the page at the time of the transition
- `useViewTransitionState(href)` returns `true` when a transition to that href is in progress

- Source: https://reactrouter.com/how-to/view-transitions (docs/how-to/view-transitions.md at tag react-router@8.5.1: https://github.com/remix-run/react-router/blob/react-router@8.5.1/docs/how-to/view-transitions.md)
- Source: https://github.com/remix-run/react-router/blob/react-router@8.5.1/packages/react-router/CHANGELOG.md (8.5.0 deprecation of view transition APIs, PR #15493)

## Related

- [./navigation-blocking.md](./navigation-blocking.md)
