# Targeting (touch target size)

All interactive UI elements must be large enough to accurately access and use regardless of device type or input method, accounting for the imprecise nature of touch contact area.

## Signature / Usage

In general, set touch target size to the 7.5mm square range (40x40 px on a 135 PPI display at 1.0x scaling plateau). WinUI controls default to sizes and layouts aligned with this target.

## Options / Props

| Consideration | Guidance |
|------|-------------|
| Frequency of touches | Make frequently or repeatedly pressed targets larger than the minimum size |
| Error consequence | Targets with severe consequences if touched in error should have greater padding and be placed further from the content-area edge |
| Position in content area | Account for reachability and edge proximity |
| Form factor and screen size | Adjust target sizing per device class |
| Finger posture / touch visualizations | Consider how the target is likely to be touched and how feedback is shown |

## Notes

- Alternative touch-optimized guidance elsewhere in the design docs suggests **44x44 epx** with at least **4 epx** of visible space between targets as an option for touch-first UI.
- Important APIs: `Windows.UI.Core`, `Windows.UI.Input`, `Windows.UI.Xaml.Input`.
- See [Spacing, gutters, and content density](../foundations/layout-spacing-and-density.md) for control size and density guidance, and [Screen sizes and breakpoints](./screen-sizes-breakpoints.md) for the effective-pixel system referenced by these sizes.

## Related

- [Screen sizes and breakpoints for responsive design](./screen-sizes-breakpoints.md)
- [Widget design fundamentals](./widgets-design-fundamentals.md)
