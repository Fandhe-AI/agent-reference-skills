---
source: https://reactnative.dev/docs/0.87/i18nmanager
---

# I18nManager

Utilities for managing Right-to-Left (RTL) layout support for languages like Arabic and Hebrew, and for checking the current layout direction.

## Signature / Usage

```tsx
const isRTL = I18nManager.isRTL;

<View
  style={{
    position: 'absolute',
    left: isRTL ? undefined : 0,
    right: isRTL ? 0 : undefined,
  }}>
  {isRTL ? <Text>Back &gt;</Text> : <Text>&lt; Back</Text>}
</View>;
```

### Properties and Methods

| Name | Signature | Description |
| --- | --- | --- |
| `isRTL` | `static isRTL: boolean;` | Whether the app is currently in RTL layout mode. |
| `doLeftAndRightSwapInRTL` | `static doLeftAndRightSwapInRTL: boolean;` | Whether left and right style properties are automatically swapped in RTL mode. |
| `allowRTL()` | `static allowRTL: (allowRTL: boolean) => void;` | Enables or disables RTL layout support. Takes effect on the next application start; the setting is persisted across restarts. |
| `forceRTL()` | `static forceRTL: (forced: boolean) => void;` | Forces RTL layout regardless of device language. Primarily for testing RTL layouts during development. Takes full effect on the next application start; persisted across restarts. |
| `swapLeftAndRightInRTL()` | `static swapLeftAndRightInRTL: (swapLeftAndRight: boolean) => void;` | Swap left and right style properties in RTL mode. Does not affect the value of `isRTL`. |

## Notes

- `isRTL` logic: if `forceRTL` is `true`, `isRTL` is `true`; if `allowRTL` is `false`, `isRTL` is `false`; otherwise it is `true` when (iOS) the user-preferred device language is RTL and the app-defined localizations include the user-chosen language (Xcode project file `knownRegions = (...)`), or (Android) the user-preferred language is RTL and `AndroidManifest.xml` defines `android:supportsRTL="true"` on the `<application>` element.
- Avoid forcing RTL in production apps: it requires a full app restart to take effect, a poor user experience. `forceRTL` is only meant for development and testing; in production either disallow RTL fully or handle it appropriately (see `isRTL`).
- If you absolutely position elements to align with other flexbox elements, they may not align in RTL languages; use `isRTL` to adjust alignment or animations.

## Related

- [Platform](./platform.md)
