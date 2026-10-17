---
source: https://reactnative.dev/docs/0.87/usecolorscheme
---

# useColorScheme

A React hook that provides and subscribes to color scheme updates from the `Appearance` module. The return value indicates the active color scheme.

## Signature / Usage

```tsx
import {useColorScheme} from 'react-native';

const colorScheme = useColorScheme();
```

### Return values

| Value | Description |
| --- | --- |
| `'light'` | The light color scheme is applied. |
| `'dark'` | The dark color scheme is applied. |
| `null` | May be returned if the native Appearance module is not available. |

## Notes

- The value may update later, through direct user action (theme selection in device settings, or an application-level style via `Appearance.setColorScheme`) or on a schedule (e.g. light/dark themes following the day/night cycle).
- A complete example combining this hook with a React context for light and dark themes is `AppearanceExample.js` in the React Native repository's rn-tester.

## Related

- [Appearance](./appearance.md)
- [useWindowDimensions](./usewindowdimensions.md)
