---
source: https://reactnative.dev/docs/0.87/platformcolor
---

# PlatformColor

Access native colors on the target platform by supplying the native color's corresponding string value.

## Signature / Usage

```js
PlatformColor(color1, [color2, ...colorN]);
```

```js
PlatformColor('bogusName', 'linkColor');
```

```tsx
const styles = StyleSheet.create({
  label: {
    padding: 16,
    fontWeight: '800',
    ...Platform.select({
      ios: {
        color: PlatformColor('label'),
        backgroundColor: PlatformColor('systemTealColor'),
      },
      android: {
        color: PlatformColor('?android:attr/textColor'),
        backgroundColor: PlatformColor('@android:color/holo_blue_bright'),
      },
      default: {color: 'black'},
    }),
  },
});
```

## Notes

- You pass strings; if a name exists on that platform it returns the corresponding native color, usable anywhere in your app. With more than one string, the first value is the default and the rest are fallbacks.
- Native colors can be sensitive to themes and/or high contrast; this platform-specific logic translates inside your components.
- Supported colors: Android `R.attr` (`?attr` prefix) and `R.color` (`@android:color` prefix); iOS UIColor Standard Colors and UI Element Colors (Objective-C and Swift notations).
- The string must match the string as it exists on the native platform. To avoid runtime errors, wrap the call in a platform check (`Platform.OS === 'platform'` or `Platform.select()`), as in the example.
- `PlatformColor` lets you tap into the local design system's color tokens.

## Related

- [DynamicColorIOS](./dynamiccolorios.md)
- [Platform](./platform.md)
- [Appearance](./appearance.md)
