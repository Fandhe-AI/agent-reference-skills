# Styling

Framework Mode uses the React Router Vite plugin, so the styling story is mostly just Vite's styling story — React Router has no separate CSS pipeline.

**Availability**: Framework Mode only.

There are three main patterns for including CSS: side-effect imports, the route module `links` export, or rendering a stylesheet `<link>` directly.

## Signature / Usage

**Side-effect CSS imports** — simplest option; global styles in `root.tsx`, route/component styles next to the module that uses them:
```tsx
import "./app.css";
```

**`links` export** — feeds the [`<Links />`](../components/Links.md) component in the root route; useful when you need React Router to render a real `<link rel="stylesheet">` tag for a route:
```tsx
import dashboardHref from "./dashboard.css?url";

export function links() {
  return [{ rel: "stylesheet", href: dashboardHref }];
}
```

**Direct `<link>` rendering** (React 19) — uses React's built-in `<link>` support, which hoists the stylesheet into `<head>`, colocating the stylesheet tag with the route that needs it:
```tsx
import dashboardHref from "./dashboard.css?url";

export default function Dashboard() {
  return (
    <>
      <link
        rel="stylesheet"
        href={dashboardHref}
        precedence="default"
      />
      <h1>Dashboard</h1>
    </>
  );
}
```

## Notes

- For CSS Modules, Tailwind, PostCSS, Sass, Vanilla Extract, and other styling tools, use the normal Vite setup for those tools — React Router has no opinion here
- The `links` export is the React Router-specific styling API in Framework Mode; the other two patterns are plain Vite/React features

## Related

- [`<Links />`](../components/Links.md)
