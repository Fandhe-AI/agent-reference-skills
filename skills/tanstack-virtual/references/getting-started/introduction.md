---
source: https://tanstack.com/virtual/latest/docs/introduction
---

# Introduction

TanStack Virtual is a headless UI utility for virtualizing long lists of elements in JS/TS, React, Vue, Svelte, Solid, Lit, and Angular. It ships with no pre-built markup or styles, so developers keep full control over design and implementation.

## Signature / Usage

```tsx
const parentRef = React.useRef<HTMLDivElement>(null)

const virtualizer = useVirtualizer({
  count: 10000,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 50,
})

return (
  <div ref={parentRef} style={{ height: 400, overflow: 'auto' }}>
    <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
      {virtualizer.getVirtualItems().map((item) => (
        <div
          key={item.key}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: item.size,
            transform: `translateY(${item.start}px)`,
          }}
        >
          Row {item.index}
        </div>
      ))}
    </div>
  </div>
)
```

## Notes

- The core concept is the `Virtualizer`, which works along a vertical or horizontal axis; combining both axes enables grid virtualization.
- For chat, AI streams, logs, and other reverse-anchored feeds, use the dedicated Chat guide instead of the plain list pattern.
- This is a DOM-list virtualization utility; it is unrelated to `react-flow` node virtualization, Android Compose `LazyColumn`, or WinUI `ListView` UI virtualization.

## Related

- [Installation](./installation.md)
- [React Virtual](./react-virtual.md)
- [Chat](./chat.md)
