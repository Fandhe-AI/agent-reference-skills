# Layout Animation

Adds interpolated reflow to a Layout container: when a Layout resizes and children must reposition, Layout Animation lets that reflow happen over time with a chosen easing curve instead of snapping instantly.

## Signature / Usage

Select a Layout component and select the `+` action next to `Layout Animation` in the inspector (typically set on the parent Layout).

## Options / Props

| Mode | Description |
| --- | --- |
| None | No animation |
| Inherit | Inherit animation parameters from the parent Layout |
| Custom | Define duration and interpolation type for the selected Layout, similar to a State Machine transition |

## Notes

- All interpolation types except cubic value are supported for Custom mode.
- With Custom animation on a parent Layout, child Layouts set to `Inherit` use the same parameters; children can also override with their own Custom interpolation.

## Related

- [Layout](./layout.md)
- [Layout Parameters](./layout-parameters.md)
- [State Machine](./state-machine.md)
