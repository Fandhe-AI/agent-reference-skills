---
source: https://docs.expo.dev/tutorial/image-picker/
---

# Pick an Image with expo-image-picker

Select an image from the device media library with `launchImageLibraryAsync()` and show the chosen `uri` in an `expo-image` component.

```sh
npx expo install expo-image-picker
```

```tsx src/app/(tabs)/index.tsx
import { View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import Button from '@/components/button';
import ImageViewer from '@/components/image-viewer';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
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
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        <Button label="Use this photo" />
      </View>
    </View>
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
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
```

```tsx src/components/image-viewer.tsx
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

type Props = {
  imgSource: ImageSourcePropType;
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

- `launchImageLibraryAsync()` takes an `ImagePickerOptions` object; `allowsEditing: true` lets the user crop on Android and iOS.
- The result contains an `assets` array whose first item carries the `uri`; check `result.canceled` before reading it.
- The picked image is a `uri` string, not a local asset, so `ImageViewer` switches between `{ uri }` and the placeholder `require()` source.
- `Button` (themed `primary` variant with an `onPress` prop) and the `src/` layout come from the earlier chapters of the same tutorial.
- Source: https://docs.expo.dev/tutorial/image-picker/ (fetched 2026-10-17, modificationDate September 03, 2026).
