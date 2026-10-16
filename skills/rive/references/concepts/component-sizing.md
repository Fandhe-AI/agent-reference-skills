# Component Sizing

Controls how a component instance scales, fits, and reflows within its parent, via the Sizing Mode in the Inspector.

## Signature / Usage

```text
Sizing Mode: Node | Leaf | Layout

Leaf:   Fit (Fill | Contain | Cover | Fit Width | Fit Height | None | Scale Down)
        Alignment (9-position grid) / Alignment Position X, Y in [-1, 1]
Layout: Size width / height each = Fixed | Hug | Fill
```

## Options / Props

| Mode | Description |
| --- | --- |
| Node | Default. Component behaves like a regular object or group; contents scale together based on the **Scale** property. Use when it does not need to respond to a parent Layout |
| Leaf | Fits the component's contents within the space provided by the parent Layout or artboard; contents scale rather than reflow. Suited to components without Layouts (illustration, icon) |
| Layout | Resizes the component's artboard instead of scaling contents, so Layouts inside can reflow. Suited to buttons that hug their text or components that fill a parent Layout's width |

Leaf **Fit**:

| Fit | Description |
| --- | --- |
| Fill (Default) | Fill the available space; stretches if aspect ratios differ |
| Contain | Fit all content while preserving aspect ratio; may leave unused space |
| Cover | Fill the space while preserving aspect ratio; some content may extend beyond |
| Fit Width | Scale to the width of the available space; may clip or leave unused space vertically |
| Fit Height | Scale to the height of the available space; may clip or leave unused space horizontally |
| None | Keep the original artboard size; may clip or leave unused space |
| Scale Down | Scale down to fit preserving aspect ratio, but do not scale up when space is larger |

Leaf **Alignment**: nine positions via the grid, or **Alignment Position X/Y** with values from `-1` to `1` (X: `-1` left, `0` center, `1` right; Y: `-1` top, `0` center, `1` bottom; intermediate values such as `0.5` are allowed).

Layout **Size** (width and height each):

| Behavior | Description |
| --- | --- |
| Fixed | Defined width or height, in units or percentage |
| Hug | Resize to fit the component's contents |
| Fill | Expand to fill the available space within the parent Layout or artboard |

## Notes

- In Layout mode, changing size changes the artboard's dimensions and lets contents reflow, unlike the **Scale** property. In most cases avoid using **Scale** with components in Layout mode.

## Related

- [Layout](./layout.md)
- [Layout Parameters](./layout-parameters.md)
- [Layout Styles](./layout-styles.md)
