# Widget design fundamentals

Layout, sizing, color/theming, margins, and typography guidance for designing a Windows widget UI.

## Signature / Usage

Widgets support three sizes — small, medium, large — and each should be designed and adapted individually. Small/medium sizes surface more often in the dynamic feed (better discoverability); large sizes suit more in-depth information.

| Size | Focus | Max touch targets |
|------|-------------|------|
| Small | One user interaction or key piece of information | 1 |
| Medium | Same focused experience as small, or slightly more functionality | 2-3 |
| Large | More information, still focused; or one immersive image/topic | 3-4 |

## Options / Props

| Property | Value |
|------|-------------|
| Widget margin | 16px around the widget |
| Attribution area | 48px reserved region where content cannot be placed (system-rendered) |
| Container gutter | 4px between elements within a container |
| Spacing/sizing unit | Multiples of 4 epx (see [Screen sizes and breakpoints](./screen-sizes-breakpoints.md#multiples-of-four)) |
| Profile picture sizes | 96x96, 48x48, 32x32, or 24x24 px circular |
| Typography | Segoe UI; ramp: Caption 12/16, Body 14/20, Body Strong 14/20 (bolder), Body Large 18/24, Body Largest 18/24 (bolder), Subtitle 20/28 (bolder), Title 28/36 (bolder), all in epx |

## Notes

- Widgets support light and dark color modes with neutral color values auto-adjusted for optimal contrast; design separate light/dark visuals for each size.
- Contrast targets referenced: WCAG 2.0 AA 4.5:1 (normal text) / 3:1 (large text, 14pt bold+ or 18pt+); WCAG 2.1 3:1 for graphics/UI components; WCAG AAA 7:1 / 4.5:1.
- The accent color is reserved for hyperlinks only; titles/body copy use the default (or subtle) theme color.
- Tooltips may be used only for truncated title text, not for body text.
- Content is authored as an [Adaptive Card](https://adaptivecards.io/) via the Adaptive Cards Designer, which provides templates for the supported sizes and themes.

## Related

- [Widget states and built-in UI components](./widgets-states-and-ui.md)
- [Widget interaction design guidance](./widgets-interaction-design.md)
- [Integrate with the widget picker](./widgets-picker-integration.md)
- [Widget principles](./widgets-principles.md)
