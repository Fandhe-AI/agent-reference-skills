# Spacing, gutters, and content density

Consistently sized spacing and gutters semantically group an experience into separate components; the values map to Windows' rounded-corner logic to create a cohesive, usable layout. Windows apps also support two content-density modes — Standard and Compact — that trade information density for touch comfort.

## Options / Props

| Relationship | Spacing |
|------|-------------|
| Between buttons | 8 epx |
| Between buttons and flyouts | 8 epx |
| Between control and header | 8 epx |
| Between control and label | 12 epx |
| Between content areas (cards) | 12 epx |
| Between surface and edge text | 16 epx |
| Between control and expander button | 16 epx |
| Indent of controls inside an expander | 48 epx |
| Window gutters, small width (< 640px) | 12 epx |
| Window gutters, larger widths | 24 epx |

| Density mode | Target size | Primary input |
|------|-------------|------|
| Standard | 40x40 epx | Balances information density and comfort; accommodates both touch and pointer. |
| Compact | 32x32 epx | Higher information density on a tighter grid; designed primarily for pointer input. |

## Notes

- All dimensions, margins, and padding should be in increments of 4 epx (see Screen sizes and breakpoints), so spacing values above are chosen as multiples of 4.
- Multi-line lists: use Body and Caption text styles with 32 epx icons; use Body Strong for section headers. Grid items with icons/person pictures: center-align Caption text. Large graphical list items: left-align Body text to the image.
- Touch target guidance recommends a 7.5mm square target (≈ 40x40 px on a 135 PPI display at 1.0x scaling), matching Standard density; WinUI controls default to touch-friendly target sizes.

## Related

- [Screen sizes and breakpoints](./layout-screen-sizes-and-breakpoints.md)
- [Alignment, margin, and padding](./alignment-margin-padding.md)
- [Geometry](./geometry.md)
