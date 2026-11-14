---
source: https://docs.expo.dev/tutorial/create-a-modal/
---

# Create a Modal with an Emoji List

Build an emoji picker with the Expo UI `BottomSheet` component that hosts a three-column `FlatList` of selectable images.

```tsx src/components/emoji-picker.tsx
import { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomSheet, RNHostView } from '@expo/ui';

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function EmojiPicker({ isVisible, children, onClose }: Props) {
  return (
    <BottomSheet
      isPresented={isVisible}
      onDismiss={onClose}
      snapPoints={['half']}
      containerColor="#25292e">
      <RNHostView>
        <View>
          <Text style={styles.title}>Choose a sticker</Text>
          {children}
        </View>
      </RNHostView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
});
```

```tsx src/components/emoji-list.tsx
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

type Props = {
  onSelect: (image: ImageSource) => void;
  onCloseModal: () => void;
};

const emoji: ImageSource[] = [
  require('@/assets/images/emoji1.png'),
  require('@/assets/images/emoji2.png'),
  require('@/assets/images/emoji3.png'),
  require('@/assets/images/emoji4.png'),
  require('@/assets/images/emoji5.png'),
  require('@/assets/images/emoji6.png'),
];

export default function EmojiList({ onSelect, onCloseModal }: Props) {
  return (
    <FlatList
      data={emoji}
      numColumns={3}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}>
          <Image source={item} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
});
```

```tsx src/components/emoji-sticker.tsx
import { View } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

type Props = {
  imageSize: number;
  stickerSource: ImageSource;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  return (
    <View style={{ top: -350 }}>
      <Image source={stickerSource} style={{ width: imageSize, height: imageSize }} />
    </View>
  );
}
```

Wire the bottom sheet into the screen (excerpt of `src/app/(tabs)/index.tsx`; the full screen also contains the image picker, `Button`, `IconButton`, and `CircleButton` from earlier steps):

```tsx src/app/(tabs)/index.tsx
import type { ImageSource } from 'expo-image';
import EmojiPicker from '@/components/emoji-picker';
import EmojiList from '@/components/emoji-list';
import EmojiSticker from '@/components/emoji-sticker';

const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);

const onAddSticker = () => {
  setIsModalVisible(true);
};

const onModalClose = () => {
  setIsModalVisible(false);
};

// ...inside the returned JSX, inside the image container:
{pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}

// ...inside the returned JSX, at the bottom of SafeAreaView:
<EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
  <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
</EmojiPicker>
```

## Notes

- `BottomSheet` and `RNHostView` come from `@expo/ui`, which the default template includes. On Android it is a Material 3 bottom sheet, on iOS a SwiftUI sheet, on web a sheet at the bottom of the page. `RNHostView` displays React Native views inside the sheet; `BottomSheet` creates its own `Host`, so do not wrap it in one.
- `isPresented` is controlled by the parent via `isVisible`; `onDismiss` calls `onClose` on swipe-down or outside tap (Android back button and web Esc also close it). `snapPoints={['half']}` opens it at about half of the screen height.
- Image assets (`emoji1.png` ... `emoji6.png`) and the `@/` path alias come from the tutorial project template. `EmojiSticker` is positioned with a fixed `top: -350` offset in the tutorial.
- The tutorial also builds `circle-button` and `icon-button` components with one file per platform (`.android.tsx` / `.ios.tsx` / web `.tsx`); they are omitted here.
- Migration: the previous version of this sample used React Native `Modal` with a horizontal `FlatList`; the tutorial at tag `expo@58.0.25` replaced it with Expo UI `BottomSheet` and a three-column grid.
- Source: https://docs.expo.dev/tutorial/create-a-modal/ (docs/pages/tutorial/create-a-modal.mdx at tag expo@58.0.25).
