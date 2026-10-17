---
source: https://reactnative.dev/docs/0.87/dynamiccolorios
---

# DynamicColorIOS

A platform color type specific to iOS that picks a color based on light/dark mode and high contrast accessibility.

## Signature / Usage

```tsx
DynamicColorIOS({
  light: color,
  dark: color,
  highContrastLight: color, // (optional) will fallback to "light" if not provided
  highContrastDark: color, // (optional) will fallback to "dark" if not provided
});
```

```tsx
import {DynamicColorIOS} from 'react-native';

const customDynamicTextColor = DynamicColorIOS({
  dark: 'lightskyblue',
  light: 'midnightblue',
});

const customContrastDynamicTextColor = DynamicColorIOS({
  dark: 'darkgray',
  light: 'lightgray',
  highContrastDark: 'black',
  highContrastLight: 'white',
});
```

## Options / Props

| Name | Required | Description |
| --- | --- | --- | 
| light | Yes | Color for light mode. |
| dark | Yes | Color for dark mode. |
| highContrastLight | No | High contrast version of light; falls back to `light`. |
| highContrastDark | No | High contrast version of dark; falls back to `dark`. |

## Notes

- At runtime the system chooses which color to display depending on the current system appearance and accessibility settings. Useful for branding or app-specific colors that still respond to system setting changes.
- Similar to CSS `@media (prefers-color-scheme: dark)`, but you define which color to use right where you use it.
- Similar to the iOS native method `UIColor colorWithDynamicProvider:`.

## Related

- [PlatformColor](./platformcolor.md)
- [Appearance](./appearance.md)
