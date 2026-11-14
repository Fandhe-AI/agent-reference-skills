---
source: https://docs.expo.dev/tutorial/image-picker/
---

# Pick an Image with expo-image-picker

Select an image from the device media library with `launchImageLibraryAsync()` and show the chosen `uri` in an `expo-image` component.

```sh
npx expo install expo-image-picker
```

```tsx src/app/(tabs)/index.tsx
import { useState } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

import Button from '@/components/button';
import ImageViewer from '@/components/image-viewer';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        <Button label="Use this photo" onPress={() => alert('You pressed a button.')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: Platform.select({ web: 96, default: 20 }),
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
```

```tsx src/components/image-viewer.tsx
import { StyleSheet } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

type Props = {
  imgSource: ImageSource;
  selectedImage?: string;
};

export default function ImageViewer({ imgSource, selectedImage }: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
```

## Notes

- `launchImageLibraryAsync()` takes an `ImagePickerOptions` object; `allowsEditing: true` lets the user crop on Android and iOS. On web, the browser's file picker opens without a crop step.
- The result contains an `assets` array whose first item carries the `uri`; check `result.canceled` before reading it. On web the `uri` is a `blob:` URL.
- The picked image is a `uri` string, not a local asset, so `ImageViewer` switches between `{ uri }` and the placeholder `require()` source.
- `Button` (themed `primary` variant with an `onPress` prop) and the `src/` layout come from the earlier chapters of the same tutorial.
- Migration: the tutorial at tag `expo@58.0.25` wraps the screen in `SafeAreaView` (from `react-native-safe-area-context`), applies `paddingTop: Platform.select({ web: 96, default: 20 })` to `imageContainer`, and types `imgSource` as `ImageSource` from `expo-image` instead of `ImageSourcePropType`.
- Source: https://docs.expo.dev/tutorial/image-picker/ (docs/pages/tutorial/image-picker.mdx at tag expo@58.0.25).
