# Accessible color contrast

Windows app text must meet a minimum luminance contrast ratio against its background so it remains readable for users with low vision or color vision deficiencies, independent of high-contrast mode.

## Signature / Usage

```xaml
<!-- Prefer theme brushes, which are tuned to meet contrast ratios, over hard-coded colors -->
<TextBlock Text="Body text"
    Style="{ThemeResource BodyTextBlockStyle}"
    Foreground="{ThemeResource TextFillColorPrimaryBrush}" />
```

## Options / Props

| Guidance | Description |
|------|-------------|
| Minimum contrast ratio | 4.5:1 between text (and images of text) and the background behind it, aligned with W3C WCAG 2.0 technique **G18**. |
| Exceptions | Logos, incidental text (e.g. text in inactive UI), and purely decorative text that conveys no information. |
| Verification | Use WCAG G18 contrast-ratio tools; for live app UI, take a screen capture and run the tool over the image since some tools can't attach to a running Windows app directly. |
| Accent-colored text on Acrylic | Avoid — accent-colored text over acrylic surfaces is unlikely to pass the minimum ratio at the default 14px size. |
| Accent-colored text on accent-colored backgrounds | Use a lighter/darker shade of the same accent color (`SystemAccentColorLight*` / `Dark*`) rather than the base accent color, to preserve contrast. |

## Notes

- Contrast evaluation is deterministic and does not account for hue perception — e.g. red text on a green background can fail for users with color vision deficiencies even when the colors look distinct to others.
- Do not treat high-contrast mode as the primary mitigation for low readability; base text design on sufficient foreground/background contrast in the default (non-high-contrast) experience.
- Applies across Windows app UI generally; not limited to a specific control namespace.

## Related

- [Color](./color.md)
- [Acrylic](./acrylic.md)
