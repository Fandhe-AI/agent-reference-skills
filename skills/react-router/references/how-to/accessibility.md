# Accessibility

React Router renders standard HTML elements by default, providing built-in browser accessibility behaviors. For client-side routing, additional focus management and screen-reader announcements are needed.

## Signature / Usage

- `<Link>` renders an `<a>` tag — browser accessibility built in
- `<NavLink>` adds `aria-current` context for assistive technology on the active route
- When using `<Scripts>`, manage focus on route change and add live-region announcements for screen readers
- Follow WCAG guidelines and use semantic HTML throughout the app

```tsx
// Navigation menu using NavLink for screen-reader context
import { NavLink } from "react-router";

export function Nav() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  );
}
```

## Notes

- Without focus management, screen readers won't announce route changes
- Apps should work even with JavaScript disabled (progressive enhancement)
- Refer to [Marcy Sutton's 2019 research](https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing) on accessible client-side routing
- Available in Framework, Data, and Declarative modes

## Related

- [Link](../components/Link.md)
- [NavLink](../components/NavLink.md)
