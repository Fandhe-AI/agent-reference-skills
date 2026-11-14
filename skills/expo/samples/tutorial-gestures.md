---
source: https://docs.expo.dev/tutorial/gestures/
---

# Add Tap and Pan Gestures

Make a sticker scale on double tap and move with a drag, kept inside the image, using React Native Gesture Handler and Reanimated.

```tsx src/app/_layout.tsx
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
```

```tsx src/app/(tabs)/index.tsx
// ...rest of the import statements remain same

export default function Index() {
  // ...rest of the code remains same

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <View>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>
      {/* ...rest of the code remains same */}
    </SafeAreaView>
  );
}
```

```tsx src/components/emoji-sticker.tsx
import { StyleSheet } from 'react-native';
import {
  GestureDetector,
  usePanGesture,
  useSimultaneousGestures,
  useTapGesture,
} from 'react-native-gesture-handler';
import Animated, { clamp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Image, type ImageSource } from 'expo-image';

type Props = {
  imageSize: number;
  stickerSource: ImageSource;
};

const IMAGE_WIDTH = 320;
const IMAGE_HEIGHT = 440;

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const doubleTap = useTapGesture({
    numberOfTaps: 2,
    onActivate: () => {
      const size = scaleImage.get() === imageSize ? imageSize * 2 : imageSize;
      scaleImage.set(size);
      translateX.set(clamp(translateX.get(), 0, IMAGE_WIDTH - size));
      translateY.set(clamp(translateY.get(), 0, IMAGE_HEIGHT - size));
    },
  });

  const drag = usePanGesture({
    onUpdate: event => {
      translateX.set(clamp(translateX.get() + event.changeX, 0, IMAGE_WIDTH - scaleImage.get()));
      translateY.set(clamp(translateY.get() + event.changeY, 0, IMAGE_HEIGHT - scaleImage.get()));
    },
  });

  const gesture = useSimultaneousGestures(drag, doubleTap);

  const stickerStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.get()),
      height: withSpring(scaleImage.get()),
      transform: [{ translateX: translateX.get() }, { translateY: translateY.get() }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.sticker, stickerStyle]}>
        <Image source={stickerSource} style={styles.image} />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  sticker: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
});
```

## Notes

- `react-native-gesture-handler` and `react-native-reanimated` are already included in the default template; no install command is shown.
- `GestureHandlerRootView` wraps the `<Stack>` in `src/app/_layout.tsx` (gestures are recognized only inside it) and has `flex: 1` by default.
- This version uses the hook-based Gesture Handler API: `useTapGesture` (`numberOfTaps`, `onActivate`), `usePanGesture` (`onUpdate` with `changeX` / `changeY`), and `useSimultaneousGestures`. The earlier `Gesture.Tap()` / `Gesture.Pan()` builder form of this sample is no longer what the tutorial shows.
- Shared values are read and written with `get()` / `set()` instead of `.value`, because the default template enables the React Compiler and Reanimated recommends this form with it.
- `IMAGE_WIDTH` / `IMAGE_HEIGHT` (320 x 440) match the size set in `image-viewer.tsx`; `clamp()` from Reanimated keeps the sticker inside the image. `pointerEvents: 'none'` on the `Image` stops the browser's native image drag on web from cancelling the pan gesture.
- The sticker is positioned with `position: 'absolute'` at the image's top-left corner inside a wrapping `<View>`, replacing the earlier `top: -350` offset from the modal chapter.
- Source: https://docs.expo.dev/tutorial/gestures/ (docs/pages/tutorial/gestures.mdx at tag expo@58.0.25).
