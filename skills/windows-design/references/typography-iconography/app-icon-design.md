# Design Guidelines for Windows App Icons

Detailed design guidance for creating a Windows app icon: metaphor selection, the 48x48 grid and silhouette, monochrome/analogous color palette construction, contrast/shadow/perspective treatment. This complements App Icons (principles overview) and App Icon Construction (required pixel sizes/filenames) with the actual design method.

## Options / Props

### Metaphor

| Guidance | Detail |
|----------|--------|
| Representation | Illustrate the app's value proposition in a single element using simple, clear, widely-understood metaphors (e.g. envelope for mail, magnifying glass for search) |
| Metaphor count | Use at most two metaphors, ideally one; the key concept should be the icon's sole focal point, not diluted by decoration |
| Abstraction | Prefer literal metaphors; only use an abstract metaphor when no literal, self-evident one exists for the core functionality |
| Typography | Avoid letters/words in the icon; the app name already appears alongside the icon throughout the OS |

### Shape

| Guidance | Detail |
|----------|--------|
| Grid | Align icons to a 48x48 grid to balance the shape against other system icons |
| Corner radius | Exterior curves: 2px radius at 48x48. Interior curves: 1px radius at 48x48 |
| Silhouette | Use as few shapes with as few corners as possible for a distinctive, legible silhouette at small sizes; avoid extremes of thick/thin shapes |
| Detail | Add extra literal detail only to the most prominent layer, to preserve legibility at small sizes |

### Color and gradients

| Guidance | Detail |
|----------|--------|
| Gradient angle | Default 120 degrees; limit gradient ramps to one or two steps horizontally and vertically |
| Monochrome palette | 1) Create 3 colors from the same hue (brighten the light one, desaturate the dark one). 2) Create 3 in-between steps as the primary color lane. 3) Optionally add tints-to-white/shades-to-black for extra contrast. 4) Drop tints of dark colors and shades of light colors — usually drab |
| Analogous palette | Same method as monochrome but with 3 color sets: build vertical ramps per set, and use the second/third color sets (instead of white/black) for tints and shades |
| Monochrome gradient | Hints at an ambient light angle from the top-left; not a literal light source — keep the shift subtle |

### Contrast, shadow, perspective

| Guidance | Detail |
|----------|--------|
| Color contrast | Use color values across dark/medium/light ranges; at least half the icon must pass a 3.0:1 contrast ratio on both light and dark theme |
| Difficult hues | Yellow rarely passes on light theme until pushed toward brown; reds are harder on dark theme |
| High contrast | Windows 11 no longer requires high-contrast (black/white) icon assets |
| Shadow | Render shadow values at 48x48 px and scale from there. Objects within the same metaphor use a shadow with slightly less blur than objects from separate, overlapping metaphors (masked into the shape below) |
| Perspective | Draw icons straight-on/flat; use perspective only when the metaphor doesn't read well without showing another side (e.g. a cylinder), and keep layers flat and perpendicular to the viewing angle even then |

## Notes

- This is the design-method companion to App Icons (principles/placement overview) and App Icon Construction (required pixel sizes and manifest filenames).
- Package/scope: Windows Store / MSIX app icon design guidance. Distinct from icon design guidance in apple-distribution and android-build-gradle.

## Related

- [App Icons](./app-icons.md)
- [App Icon Construction](./app-icon-construction.md)
