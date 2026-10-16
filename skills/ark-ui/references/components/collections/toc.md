# Table of Contents

A navigation component that tracks and highlights the active section as users scroll through document content.

## Signature / Usage

```tsx
import { Toc } from "@ark-ui/react/toc"
import { useRef } from "react"

const items = [
  { value: "introduction", depth: 2, label: "Introduction" },
  { value: "installation", depth: 2, label: "Installation" },
  { value: "peer-dependencies", depth: 3, label: "Peer Dependencies" },
]

export const Basic = () => {
  const contentRef = useRef<HTMLElement | null>(null)

  return (
    <Toc.Root items={items} scrollEl={() => contentRef.current}>
      <Toc.Content ref={contentRef}>
        {items.map((item) => (
          <section key={item.value}>
            <h2 id={item.value} data-depth={item.depth}>{item.label}</h2>
          </section>
        ))}
      </Toc.Content>
      <Toc.Nav>
        <Toc.Title>On this page</Toc.Title>
        <Toc.List>
          <Toc.Indicator />
          {items.map((item) => (
            <Toc.Item key={item.value} item={item}>
              <Toc.Link href={`#${item.value}`}>{item.label}</Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc.Root>
  )
}
```

Anatomy:

```tsx
<Toc.Root items={items} scrollEl={() => scrollContainer}>
  <Toc.Content />
  <Toc.Nav>
    <Toc.Title />
    <Toc.List>
      <Toc.Indicator />
      <Toc.Item item={item}>
        <Toc.Link />
      </Toc.Item>
    </Toc.List>
  </Toc.Nav>
</Toc.Root>
```

Reach `activeIds` from outside the tree with `useToc` + `Toc.RootProvider`:

```tsx
const toc = useToc({ items, scrollEl: () => contentRef.current })

<Toc.RootProvider value={toc}>{/* ... */}</Toc.RootProvider>
```

Items: `value` must equal the heading's `id` exactly (resolved with `getElementById`); `depth` is the heading level. Extra properties such as `label` are allowed; extend `TocItemData` (covers only `value` and `depth`):

```tsx
import type { TocItemData } from "@ark-ui/react/toc"

interface Item extends TocItemData {
  label: string
}
```

## Options / Props

Root:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `items` (required) | `TocItem[]` | — | Items with `value` (heading id) and `depth` (heading level) |
| `activeIds` / `defaultActiveIds` | `string[]` | — | Controlled / initial active heading ids |
| `onActiveChange` | `(details: ActiveChangeDetails) => void` | — | Called when the active (visible) headings change |
| `scrollEl` | `() => HTMLElement \| null` | document / viewport | Returns the scroll container to observe within |
| `autoScroll` | `boolean` | `true` | Auto-scroll the TOC container so the first active item is visible |
| `rootMargin` | `string` | `"-20px 0px -40% 0px"` | IntersectionObserver root margin |
| `threshold` | `number \| number[]` | `0` | IntersectionObserver threshold |
| `scrollBehavior` | `ScrollBehavior` | `"smooth"` | Default behavior for auto-scroll and scroll-to-heading; overridable per call via `api.scrollTo` |
| `id` / `ids` | `string` / `Partial<{ root, title, list, item(value), link(value), indicator }>` | — | Element ids |
| `asChild` | `boolean` | — | Render the child element instead |

Other parts: `Item` requires `item: TocItem`; `Nav` accepts `placement: 'left' | 'right'`; `RootProvider` requires `value: UseTocReturn`.

Context API: `activeIds`, `activeItems`, `items`, `setActiveIds(value)`, `scrollTo(value, details?)`, `getItemState(props)`.

## Notes

- Status: Preview (added in 5.39.0). The API may change.
- 5.39.3 fixed `onActiveChange` reporting stale `activeIds`.
- Nothing is indented for you; read `depth` in your own markup to style nested headings.
- An item whose id is missing from the DOM renders but never activates. Ids are page-global; prefix them when a page holds more than one TOC.
- Data attributes: `Item` has `data-scope="toc"`, `data-part="item"`, `data-value`, `data-depth`, `data-active`, `data-first`, `data-last`; `Link` has `data-value`, `data-active`.
- Hover-expanding navigation does not work on touch screens; pair it with a pin or disclosure control.
- `Toc.Context` exposes `activeItems`; `useTocContext().getLinkProps({ item })` can be used to wire links in custom navs such as `TreeView`.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead of `@ark-ui/react`.
- Source: https://ark-ui.com/react/docs/components/toc (Ark UI @ark-ui/react 5.39.3)

## Related

- [Tree View](./tree-view.md)
