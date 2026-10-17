---
source: https://docs.expo.dev/tutorial/create-a-modal/
---

# Create a Modal with an Emoji List

Build a reusable bottom-sheet style `Modal` that hosts a horizontal `FlatList` of selectable images.

```tsx src/components/emoji-picker.tsx
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function EmojiPicker({ isVisible, children, onClose }: Props) {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Choose a sticker</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color="#fff" size={22} />
            </Pressable>
          </View>
          {children}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
});
```

```tsx src/components/emoji-list.tsx
import { useState } from 'react';
import { ImageSourcePropType, StyleSheet, FlatList, Platform, Pressable } from 'react-native';
import { Image } from 'expo-image';

type Props = {
  onSelect: (image: ImageSourcePropType) => void;
  onCloseModal: () => void;
};

export default function EmojiList({ onSelect, onCloseModal }: Props) {
  const [emoji] = useState<ImageSourcePropType[]>([
    require("@/assets/images/emoji1.png"),
    require("@/assets/images/emoji2.png"),
    require("@/assets/images/emoji3.png"),
    require("@/assets/images/emoji4.png"),
    require("@/assets/images/emoji5.png"),
    require("@/assets/images/emoji6.png"),
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}>
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
```

Wire the modal into the screen:

```tsx src/app/(tabs)/index.tsx
const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);

const onAddSticker = () => {
  setIsModalVisible(true);
};

const onModalClose = () => {
  setIsModalVisible(false);
};

// ...inside the returned JSX, after the options / footer block:
<EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
  <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
</EmojiPicker>
```

## Notes

- `visible` is controlled by the parent via `isVisible`; `animationType="slide"` enters from the bottom and `transparent` keeps the underlying screen visible.
- `EmojiList` calls `onSelect(item)` then `onCloseModal()` on press; `showsHorizontalScrollIndicator` is enabled only on web through `Platform.OS`.
- Image assets (`emoji1.png` ... `emoji6.png`) and the `@/` path alias come from the tutorial project template.
- Source: https://docs.expo.dev/tutorial/create-a-modal/ (fetched 2026-10-17, modificationDate September 25, 2026).
