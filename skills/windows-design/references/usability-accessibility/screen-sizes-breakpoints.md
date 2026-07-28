# Screen sizes and breakpoints for responsive design

Design Windows app UI for a few key width categories called breakpoints, rather than optimizing for every possible screen size.

## Signature / Usage

Design for the amount of screen space available to the app (the app window), not the physical screen size.

| Size class | Breakpoints | Typical screen size | Devices | Window sizes |
|------|-------------|------|------|------|
| Small | up to 640px | 20" to 65" | TVs | 480x854, 540x960 |
| Medium | 641-1007px | 7" to 12" | Tablets | 960x540 |
| Large | 1008px and up | 13" and up | PCs, laptops, Surface Hub | 1024x640, 1366x768, 1920x1080 |

## Options / Props

| Concept | Description |
|------|-------------|
| Effective pixel (epx) | Virtual unit of measurement for layout dimensions/spacing, independent of screen density; used interchangeably with "ep"/"px" in Windows design guidance |
| Scale factor | XAML's automatic scaling algorithm normalizes UI element display based on viewing distance and screen density, targeting perceived rather than physical size |
| Multiples of four | Sizes, margins, and positions of UI elements should be multiples of 4 epx so they align to whole pixels across scale plateaus (100%, 125%, 150%, ..., 400%); text is exempt |

## Notes

- TVs are treated as "small" because effective-pixel scaling accounts for typical 10-foot viewing distance — a 1080p TV behaves like a ~540-effective-pixel monitor.
- When creating mockups in image editors, set DPI to 72 and use the effective resolution for the target size class.

## Related

- [Responsive design techniques](./responsive-design.md)
- [Targeting (touch target size)](./touch-target-size.md)
