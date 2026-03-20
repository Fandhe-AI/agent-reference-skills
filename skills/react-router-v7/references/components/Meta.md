# Meta

Renders all `<meta>` tags collected from each route module's `meta` export. Must be placed inside the `<head>` of the root document.

## Props

This component accepts no props.

## 使用例

```tsx
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

## 注意点

- **Framework mode only** — not available in Data or Declarative modes.
- Must be placed inside `<head>` for correct HTML structure.
- Automatically collects and renders all `<meta>` tags from route module `meta` exports across the matched route hierarchy, including `<title>`, `description`, Open Graph tags, etc.

## 関連

- [Links.md](./Links.md)
- [Scripts.md](./Scripts.md)
