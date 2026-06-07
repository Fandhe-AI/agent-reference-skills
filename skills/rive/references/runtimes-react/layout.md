# Layout Props

Controls how a Rive artboard scales and positions itself within its container. Pass a `Layout` instance to the `layout` prop of the `Rive` component or the `useRive` hook.

## Signature / Usage

```ts
new Layout(options?: LayoutOptions): Layout
```

```tsx
import Rive, { Layout, Fit, Alignment } from '@rive-app/react-webgl2';

export const Example = () => (
  <Rive
    src="https://cdn.rive.app/animations/vehicles.riv"
    layout={new Layout({ fit: Fit.Contain, alignment: Alignment.TopCenter })}
  />
);
```

```tsx
// With useRive hook
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-webgl2';

export default function Example() {
  const { RiveComponent } = useRive({
    src: 'my-file.riv',
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.TopCenter,
    }),
    autoplay: true,
  });

  return <RiveComponent />;
}
```

## Options / Props

### LayoutOptions

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `fit` | `Fit` | `Fit.Contain` | Scaling strategy (see Fit values below) |
| `alignment` | `Alignment` | `Alignment.Center` | Position within the container when content doesn't fill it |
| `minX` | `number` | — | Left bound of the rendering area (overrides alignment) |
| `minY` | `number` | — | Top bound of the rendering area (overrides alignment) |
| `maxX` | `number` | — | Right bound of the rendering area (overrides alignment) |
| `maxY` | `number` | — | Bottom bound of the rendering area (overrides alignment) |
| `layoutScaleFactor` | `number` | — | Multiplier for content scale when using `Fit.Layout` |

### Fit Values

| Value | Description |
| --- | --- |
| `Fit.Layout` | Uses the Rive layout engine to apply responsive layout, matching container dimensions |
| `Fit.Contain` | Scales preserving aspect ratio; may leave empty space (default) |
| `Fit.Cover` | Scales to fill container preserving aspect ratio; may clip content |
| `Fit.Fill` | Stretches to fill without preserving aspect ratio |
| `Fit.FitWidth` | Matches container width, preserves aspect ratio |
| `Fit.FitHeight` | Matches container height, preserves aspect ratio |
| `Fit.ScaleDown` | Like `Contain`, but only scales down (not up) |
| `Fit.None` | No scaling; renders at original artboard dimensions |

### Alignment Values

`TopLeft`, `TopCenter`, `TopRight`, `CenterLeft`, `Center`, `CenterRight`, `BottomLeft`, `BottomCenter`, `BottomRight`

## Notes

- `Fit.Layout` automatically responds to window resizing and device pixel ratio changes.
- Providing `minX`/`minY`/`maxX`/`maxY` overrides the `alignment` setting.
- `layoutScaleFactor` is only meaningful when `fit` is `Fit.Layout`.

## Related

- [Overview](./overview.md)
- [useRive](./use-rive.md)
