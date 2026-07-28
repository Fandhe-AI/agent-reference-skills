# Screen sizes and breakpoints for responsive design

Design Windows app UI for key width categories (breakpoints) rather than every possible screen size. Breakpoints are measured against the app's window size (the space available to the app), not the physical screen, and expressed in effective pixels (epx), which account for viewing distance and display scale.

## Options / Props

| Size class | Breakpoint | Typical screen size | Devices | Example window sizes |
|------|-------------|------|------|------|
| Small | up to 640px | 20" to 65" | TVs | 480x854, 540x960 |
| Medium | 641px - 1007px | 7" to 12" | Tablets | 960x540 |
| Large | 1008px and up | 13" and up | PCs, laptops, Surface Hub | 1024x640, 1366x768, 1920x1080 |

## Notes

- Effective pixels (epx, also written ep or px in guidelines) are a virtual, density-independent unit of layout measurement. XAML's effective pixel system normalizes UI size for perceived size (accounting for viewing distance and screen density), not physical pixel count — this is why large, distant TV screens fall into the "Small" size class.
- Scaling plateaus: 100%, 125%, 150%, 175%, 200%, 225%, 250%, 300%, 350%, 400%.
- **Multiples of four**: sizes, margins, and positions of UI elements should always be in multiples of 4 epx, so elements align to whole pixels at every scaling plateau (text is exempt from this rule).
- When mocking up screens in an image editor, set DPI to 72 and dimensions to the effective resolution of the target size class.

## Related

- [Responsive design techniques](./layout-responsive-design.md)
- [Spacing, gutters, and content density](./layout-spacing-and-density.md)
- [Alignment, margin, and padding](./alignment-margin-padding.md)
