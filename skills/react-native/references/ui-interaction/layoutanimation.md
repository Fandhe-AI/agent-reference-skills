---
source: https://reactnative.dev/docs/0.87/layoutanimation
---

# LayoutAnimation

Automatically animates views to their new positions when the next layout happens. A common way to use this API is to call it before updating the state hook in functional components and calling `setState` in class components.

## Signature / Usage

```js
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
```

```tsx
<TouchableOpacity
  onPress={() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setExpanded(!expanded);
  }}>
  <Text>Press me to {expanded ? 'collapse' : 'expand'}!</Text>
</TouchableOpacity>
```

Custom config:

```tsx
LayoutAnimation.configureNext({
  duration: 500,
  create: {type: 'linear', property: 'opacity'},
  update: {type: 'spring', springDamping: 0.4},
  delete: {type: 'linear', property: 'opacity'},
});
```

## Options / Props

Methods:

| Method | Signature | Description |
|--------|-----------|-------------|
| `configureNext()` | `static configureNext(config: LayoutAnimationConfig, onAnimationDidEnd?: () => void, onAnimationDidFail?: () => void)` | Schedules an animation to happen on the next layout. `config` (object, required), `onAnimationDidEnd` (function, optional, called when finished), `onAnimationDidFail` (function, optional, called when failed). |
| `create()` | `static create(duration, type, creationProp)` | Helper that creates an object (with `create`, `update`, and `delete` fields) to pass into `configureNext`. `type` is an animation type, `creationProp` is a layout property. |
| `easeInEaseOut` | | Calls `configureNext()` with `Presets.easeInEaseOut`. |
| `linear` | | Calls `configureNext()` with `Presets.linear`. |
| `spring` | | Calls `configureNext()` with `Presets.spring`. |

`config` keys: `duration` in milliseconds; `create`, optional config for animating in new views; `update`, optional config for animating views that have been updated; `delete`, optional config for animating views as they are removed.

The config passed to `create`, `update`, or `delete` has: `type` (animation type), `property` (layout property; optional, but recommended for `create` and `delete`), `springDamping` (number, optional, only for `type: Type.spring`), `initialVelocity` (number, optional), `delay` (number, optional), `duration` (number, optional).

Types (`LayoutAnimation.Types.*`): `spring`, `linear`, `easeInEaseOut`, `easeIn`, `easeOut`, `keyboard`.

Properties (`LayoutAnimation.Properties.*`): `opacity`, `scaleX`, `scaleY`, `scaleXY`.

Presets:

| Presets | Value |
|---------|-------|
| `easeInEaseOut` | `create(300, 'easeInEaseOut', 'opacity')` |
| `linear` | `create(500, 'linear', 'opacity')` |
| `spring` | `{duration: 700, create: {type: 'linear', property: 'opacity'}, update: {type: 'spring', springDamping: 0.4}, delete: {type: 'linear', property: 'opacity'} }` |

## Notes

- Only needed on the Legacy Architecture: on the New Architecture (the only runtime since 0.82) layout animations are enabled automatically and `setLayoutAnimationEnabledExperimental` is a no-op (react-native@0.87.1 `BridgelessUIManager` only logs a dev warning); the 0.87 docs page still states the Android flag is required (the next docs state it is unnecessary).
- This is the React Native `LayoutAnimation` API; distinct from Motion for React (motion), Jetpack Compose animation (android-compose-graphics-animation) and SwiftUI animation (apple-swiftui).

## Related

- [Animations](./animations.md)
- [Animated](./animated.md)
