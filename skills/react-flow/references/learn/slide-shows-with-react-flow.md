# Create a Slide Show Presentation with React Flow

A tutorial demonstrating how to build an interactive, markdown-based slide-show presentation on a React Flow canvas, with grid-based auto-layout and multiple navigation methods.

## 詳細説明

- Slides are authored in markdown and rendered as custom `Slide` nodes
- A layout helper (`slidesToElements`) arranges slides into nodes/edges automatically
- Navigation is implemented via `onNodeClick`, keyboard (`onKeyPress`) handlers, and `fitView()` (from `useReactFlow()`) to animate focus onto the target slide

## コード例

```typescript
export function Slide({ data }: NodeProps<SlideNode>) {
  return (
    <article className="slide nodrag" style={style}>
      <Remark>{data.source}</Remark>
    </article>
  );
}
```

```typescript
const handleKeyPress = useCallback((event) => {
  const target = slide[direction];
  if (target) {
    fitView({ nodes: [{ id: target }] });
  }
}, [currentSlide, fitView]);
```

## 注意点

- Slide nodes use the `nodrag` class so canvas panning does not interfere with slide content interactions
- `fitView({ nodes: [...] })` (not the viewport-wide `fitView()`) is used to focus on a specific slide during navigation

## 関連

- [the-viewport.md](./the-viewport.md)
- [layouting.md](./layouting.md)
- [custom-nodes.md](./custom-nodes.md)
