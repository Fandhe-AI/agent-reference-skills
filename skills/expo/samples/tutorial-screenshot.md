---
source: https://docs.expo.dev/tutorial/screenshot/
---

# Capture a View and Save It to the Media Library

Request media library write permission, capture a `View` with `react-native-view-shot`, save the result with `expo-media-library` on Android and iOS, and download it as a JPEG on web.

```sh
npx expo install react-native-view-shot expo-media-library
```

```tsx src/app/(tabs)/index.tsx
import { useEffect, useRef, useState, type ComponentRef } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import type { ImageSource } from 'expo-image';

import Button from '@/components/button';
import ImageViewer from '@/components/image-viewer';
import IconButton from '@/components/icon-button';
import CircleButton from '@/components/circle-button';
import EmojiPicker from '@/components/emoji-picker';
import EmojiList from '@/components/emoji-list';
import EmojiSticker from '@/components/emoji-sticker';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions({ writeOnly: true });
  const imageRef = useRef<ComponentRef<typeof View>>(null);

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, []);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.Asset.create(localUri);
        alert('Saved!');
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const dataUrl = await captureRef(imageRef, {
          format: 'jpg',
          quality: 0.95,
          result: 'data-uri',
        });

        const link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.footerContainer}>
          <View style={styles.optionsRow}>
            <IconButton
              icon={{
                android: require('@expo/material-symbols/refresh.xml'),
                ios: 'arrow.counterclockwise',
                web: 'refresh',
              }}
              label="Reset"
              onPress={onReset}
            />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon={{
                android: require('@expo/material-symbols/download.xml'),
                ios: 'square.and.arrow.down',
                web: 'download',
              }}
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
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
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
```

## Notes

- `MediaLibrary.usePermissions({ writeOnly: true })` returns `[permissionResponse, requestPermission]`; the app only saves images, so it asks for write access without read access. `permissionResponse` is `null` until the user has answered.
- `captureRef()` returns a promise resolving to the captured file URI, which is passed to `MediaLibrary.Asset.create()` on Android and iOS. On web, `result: 'data-uri'` returns a data URL that is downloaded through a link element, because `expo-media-library` works only on Android and iOS.
- `collapsable={false}` on the captured `View` keeps it from being flattened so only the background image and sticker are captured.
- Error handling: the official tutorial at this tag logs failures with `console.log(e)` in both `catch` blocks and has no failure alert; production apps should surface a save failure to the user (for example with `alert`).
- `MediaLibrary.usePermissions()` and its `useEffect` run on web in the official tutorial at this tag, which is kept verbatim; if the permission hook is unsupported on web in your SDK build, guard the hook-driven request with `Platform.OS !== 'web'`.
- Migration: the previous version of this sample used `MediaLibrary.saveToLibraryAsync()` imported from `expo-media-library/legacy` and `ImagePicker.useMediaLibraryPermissions()`; the tutorial at tag `expo@58.0.25` uses `MediaLibrary.Asset.create()` and `MediaLibrary.usePermissions({ writeOnly: true })` from `expo-media-library`.
- Source: https://docs.expo.dev/tutorial/screenshot/ (docs/pages/tutorial/screenshot.mdx at tag expo@58.0.25).
