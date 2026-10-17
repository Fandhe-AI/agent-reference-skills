---
source: https://reactnative.dev/docs/0.87/image-style-props
---

# Image Style Props

Style props accepted by the `style` prop of `Image`.

## Signature / Usage

```tsx
import {Image, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DisplayAnImageWithStyle = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          tintColor: '#000000',
          resizeMode: 'contain',
          height: 100,
          width: 200,
        }}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Text>tintColor</Text>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DisplayAnImageWithStyle;
```

## Options / Props

| Name | Type | Default | Platform | Description |
| --- | --- | --- | --- | --- |
| `backfaceVisibility` | enum(`'visible'`, `'hidden'`) | `'visible'` | | Whether or not the back face of a rotated image should be visible. |
| `backgroundColor` | color | | | |
| `borderBottomLeftRadius` | number | | | |
| `borderBottomRightRadius` | number | | | |
| `borderColor` | color | | | |
| `borderRadius` | number | | | |
| `borderTopLeftRadius` | number | | | |
| `borderTopRightRadius` | number | | | |
| `borderWidth` | number | | | |
| `opacity` | number | `1.0` | | Opacity value for the image, in the range from `0.0` to `1.0`. |
| `overflow` | enum(`'visible'`, `'hidden'`) | `'visible'` | | |
| `overlayColor` | string | | Android | When the image has rounded corners, specifying an overlayColor will cause the remaining space in the corners to be filled with a solid color. |
| `resizeMode` | enum(`'cover'`, `'contain'`, `'stretch'`, `'repeat'`, `'center'`) | `'cover'` | | How to resize the image when the frame doesn't match the raw image dimensions. |
| `objectFit` | enum(`'cover'`, `'contain'`, `'fill'`, `'scale-down'`) | `'cover'` | | How to resize the image when the frame doesn't match the raw image dimensions. |
| `tintColor` | color | | | Changes the color of all the non-transparent pixels to the tintColor. |

`resizeMode` values:

- `cover`: Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or larger than the corresponding dimension of the view (minus padding), and at least one dimension of the scaled image will be equal to the corresponding dimension of the view (minus padding).
- `contain`: Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or less than the corresponding dimension of the view (minus padding).
- `stretch`: Scale width and height independently, This may change the aspect ratio of the src.
- `repeat`: Repeat the image to cover the frame of the view. The image will keep its size and aspect ratio, unless it is larger than the view, in which case it will be scaled down uniformly so that it is contained in the view.
- `center`: Center the image in the view along both dimensions. If the image is larger than the view, scale it down uniformly so that it is contained in the view.

## Notes

- `overlayColor` is typically used with images displayed on a solid background, setting it to the same color as the background. It is useful for cases not supported by the Android implementation of rounded corners: certain resize modes such as `'contain'`, and animated GIFs. For details of how this works under the hood, see the Fresco documentation on rounded corners and circles.
- Colors accept the values described on the Colors page.

## Related

- [View Style Props](./view-style-props.md)
- [Layout Props](./layout-props.md)
- [Image](../components/image.md)
