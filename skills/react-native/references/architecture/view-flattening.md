---
source: https://reactnative.dev/architecture/view-flattening
---

# View Flattening

View Flattening is an optimization by the React Native renderer to avoid deep layout trees. Deep React Element Trees contain many nodes that only affect the layout of a View and do not render anything on the screen; these are called **"Layout-Only"** Nodes. Because each node of the React Element Tree has a 1:1 relationship with a view on the screen, rendering many Layout-Only nodes leads to poor rendering performance.

## Signature / Usage

Example from the page: a `ContainerComponent` with margin styles wrapping a `TitleComponent` (the page's own snippet, including its comment annotations; illustrative pseudo-JSX copied verbatim from the official page, not runnable):

```jsx
function MyComponent() {
  return (
    <View>                          // ReactAppComponent
      <View style={{margin: 10}} /> // ContainerComponent
        <View style={{margin: 10}}> // TitleComponent
          <Image {...} />
          <Text {...}>This is a title</Text>
        </View>
      </View>
    </View>
  );
}
```

Views (2) and (3) are "Layout Only" views, because they only render a `margin` of `10 px` on top of their children. The renderer merges or flattens these nodes, reducing the depth of the host view hierarchy; their styles are merged into View (1). From the user's perspective there are no visible changes on the screen.

## Notes

- The official snippet is a schematic: the self-closing `<View style={{margin: 10}} />` and `{...}` props are not valid JSX.
- The algorithm takes into consideration props like `margin`, `padding`, `backgroundColor`, `opacity`, etc.
- Flattening is integrated by design as part of the diffing stage of the renderer, so no extra CPU cycles are used. It is implemented in C++ and shared by default on all supported platforms.
- The page is marked in the source with the caution: "This document refers to the New Architecture, that is in active roll-out."

## Related

- [Render, Commit, and Mount](./render-pipeline.md)
- [Cross Platform Implementation](./xplat-implementation.md)
- [Glossary](./glossary.md)
