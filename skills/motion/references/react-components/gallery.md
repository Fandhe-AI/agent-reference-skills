# Gallery (Motion+)

Image and video gallery for React with 2D and 3D arrangements (list, grid, barrel, coverflow, helix, ring, sphere, stack), gestures and selection that transition smoothly into each other.

## Signature / Usage

```jsx
import { Gallery, barrel } from "motion-plus/gallery"

<Gallery arrange={barrel()} aria-label="Collection">
  <Gallery.Image src="/a.jpg" alt="Runner" width={1200} height={1600} />
  <Gallery.Video src="/b.mp4" poster="/b.jpg" alt="Shoe rotating" />
</Gallery>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `arrange` | arrangement | Default `list()`. Changing it animates into the new shape |
| `axis` | `"x"` \| `"y"` | Orientation for arrangements such as `barrel` and `list` |
| `gap` | number | Item spacing (ignored by `coverflow` and `stack`) |

Items: `Gallery.Image` (`img`, `alt` required, `""` if decorative), `Gallery.Video` (`video`, `alt` required, applied as `aria-label`), `Gallery.Item` (`li` with any content). Each takes an optional `value` identity (default: index).

Item size via CSS variables (default `240px` x `320px`):

```css
.gallery [data-gallery-item] {
  --gallery-item-width: 300px;
  --gallery-item-height: 400px;
}
```

Arrangement options (defaults in parentheses):

| Arrangement | Options |
|-------------|---------|
| `list` | `angle` (0), `curl` (0), `depth` (0), `recede` (0), `turn` (0), `wave` (0), `room` (24) |
| `grid` | `columns` ("auto"), `fill` ("sequence" / "offset" / "none"), `rotateX`, `rotateY`, `rotateZ` (0), `bulge` (0) |
| `barrel` | `radius` ("auto"), `rotateX` (-8) |
| `coverflow` | `turn` (55), `spread` (0.3), `depth` (0.5), `centerSpacing` (0.8) |
| `helix` | `radius` ("auto"), `itemsPerTurn` (10), `pitch` ("auto"); default `axis` is `"y"` |
| `ring` | `radius` ("auto"), `arc` (360), `upright` (false), `flip` (false), `rotateX` (0) |
| `sphere` | `radius` ("auto"), `gap` (gallery gap), `face` ("camera" / "outward") |
| `stack` | `peek` (14), `depth` (50), `visible` (4) |

```jsx
<Gallery arrange={coverflow({ turn: 45, spread: 0.25, depth: 0.6, centerSpacing: 0.9 })} />
```

## Notes

- Motion+ (paid) component; not included in the free `motion` package. Requires Motion UI install and a Motion+ access token.
- Import from `"motion-plus/gallery"` (not `motion-plus/react`). Arrangements, modifiers and presence presets are separate imports.
- `barrel`, `sphere` and a full `ring` always loop. The engine owns each item's position, size, transform and opacity; other styles (`border-radius`, `background`, `filter`) are yours.
- Every numeric arrangement option except `grid`'s `columns` also accepts a motion value: `barrel({ rotateX })` with `useMotionValue(-8)`.
- Custom arrangements via `defineGalleryArrangement`; `tilt` and `ripple` velocity modifiers exist. Detail views, selection and hooks are in the members-only part of the page and are not documented here.
- Source: https://motion.dev/docs/react-gallery (fetched 2026-10).

## Related

- [Carousel](./carousel.md)
