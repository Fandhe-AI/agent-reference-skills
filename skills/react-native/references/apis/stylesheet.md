---
source: https://reactnative.dev/docs/0.87/stylesheet
---

# StyleSheet

A StyleSheet is an abstraction similar to CSS StyleSheets.

## Signature / Usage

```tsx
import {StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
```

### Methods and Properties

| Name | Signature | Description |
| --- | --- | --- |
| `compose()` | `static compose(style1: Object, style2: Object): Object \| Object[];` | Combines two styles such that `style2` overrides `style1`. If either is falsy, the other is returned without allocating an array, saving allocations and keeping reference equality for PureComponent checks. |
| `create()` | `static create(styles: Object extends Record<string, ViewStyle \| ImageStyle \| TextStyle>): Object;` | An identity function for creating styles. The practical benefit is static type checking against native style properties. |
| `flatten()` | `static flatten(style: Array<Object extends Record<string, ViewStyle \| ImageStyle \| TextStyle>>): Object;` | Flattens an array of style objects into one aggregated style object. |
| `setStyleAttributePreprocessor()` | `static setStyleAttributePreprocessor(property: string, process: (propValue: any) => any);` | Experimental. Sets a function to pre-process a style property value; used internally for color and transform values. |
| `absoluteFill` | property | Shorthand for `position: 'absolute', left: 0, right: 0, top: 0, bottom: 0`, to reduce duplication when creating overlays. Can be used to build a customized entry in a StyleSheet. |
| `hairlineWidth` | property | The width of a thin line on the platform; usable as border thickness or division between elements. |

```tsx
const container = StyleSheet.compose(page.container, lists.listContainer);
const flattenStyle = StyleSheet.flatten([page.text, typography.header]);
```

```tsx
<View style={[styles.box2, StyleSheet.absoluteFill]} />;

const styles = StyleSheet.create({
  row: {
    padding: 4,
    borderBottomColor: 'red',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
```

## Notes

- Code quality tips: moving styles out of the render function makes code easier to understand; naming styles adds meaning to low-level components and encourages reuse; in most IDEs `StyleSheet.create()` offers static type checking and suggestions.
- `setStyleAttributePreprocessor()` is Experimental: "Breaking changes will probably happen a lot and will not be reliably announced. The whole thing might be deleted, who knows? Use at your own risk." Do not use unless you really know what you are doing.
- `hairlineWidth` is always a round number of pixels (crisp lines) and tries to match the platform's standard thin line, but do not rely on a constant size across platforms/densities. A hairline may not be visible if the simulator is downscaled.
- Removed in 0.85: `StyleSheet.absoluteFillObject`. Use `StyleSheet.absoluteFill` or define your own absolute positioning styles ([0.85 release blog](https://reactnative.dev/blog/2026/04/07/react-native-0.85)).

## Related

- [Dimensions](./dimensions.md)
- [PixelRatio](./pixelratio.md)
- [Platform](./platform.md)
