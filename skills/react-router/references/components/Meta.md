# Meta

Renders all `<meta>` tags collected from each route module's `meta` export. Must be placed inside the `<head>` of the root document. Framework mode only.

## Signature / Usage

```tsx
function Meta(): React.JSX.Element

import { Meta } from "react-router";

export default function Root() {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>...</body>
    </html>
  );
}
```

## Notes

- **Framework mode only** — not available in Data or Declarative modes.
- Must be placed inside `<head>` for correct HTML structure.
- Automatically collects and renders all `<meta>` tags from route module `meta` exports across the matched route hierarchy, including `<title>`, `description`, Open Graph tags, etc.
- Accepts no props.

## Related

- [Links](./Links.md)
- [Scripts](./Scripts.md)
