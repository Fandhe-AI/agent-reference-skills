---
source: https://reactnative.dev/docs/0.87/imagebackground
---

# ImageBackground

A component with the same props as `Image` that lays arbitrary children on top of the image (the web `background-image` use case). Deprecated.

## Signature / Usage

```tsx
import {ImageBackground, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Inside</Text>
      </ImageBackground>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

export default App;
```

## Options / Props

Inherits [Image Props](./image.md#options--props).

| Name | Type | Description |
| --- | --- | --- |
| imageStyle | Image Style | Style applied to the inner image. |
| imageRef | ref setter | A ref setter that will be assigned the element node of the inner `Image` component when mounted. |
| style | View Style | Style of the outer container. |

## Notes

- Deprecated: "Use a `View` with an absolutely positioned `Image` instead."
- The implementation is basic; refer to the `ImageBackground` source code and create your own custom component when needed.
- You must specify some width and height style attributes.
- This is a React Native core component (imported from `react-native`, rendered as a native view). It is distinct from same-named UI parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- [Image](./image.md)
- [View](./view.md)
- [Image Style Props](../props-types/image-style-props.md)
- [View Style Props](../props-types/view-style-props.md)
