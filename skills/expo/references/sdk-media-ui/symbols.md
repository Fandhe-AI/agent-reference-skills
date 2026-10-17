---
source: https://docs.expo.dev/versions/v58.0.0/sdk/symbols/
---

# Symbols

`expo-symbols` provides access to native symbol libraries: SF Symbols on iOS and tvOS, Material Symbols on Android and web.

## Signature / Usage

```sh
npx expo install expo-symbols
```

```jsx
import { SymbolView } from 'expo-symbols';

<SymbolView
  name={{ ios: 'info.circle', android: 'info', web: 'info' }}
  tintColor="#007AFF"
  size={35}
/>
```

A plain string is treated as an SF Symbol name and renders only on iOS; on Android and web nothing renders unless `fallback` is provided:

```jsx
<SymbolView name="airpods.chargingcase" style={styles.symbol} type="hierarchical" />;
<SymbolView name={{}} fallback={<Text>?</Text>} />;
```

Weights: on iOS pass a weight string; on Android import a weight object from `expo-symbols/androidWeights`:

```jsx
import bold from 'expo-symbols/androidWeights/bold';

<SymbolView
  name={{ ios: 'star.fill', android: 'star', web: 'star' }}
  weight={{ ios: 'bold', android: bold }}
  tintColor="gold"
  size={35}
/>;
```

Available weight imports: `bold`, `semiBold`, `medium`, `regular`, `light`, `extraLight`, `thin`.

## Options / Props

`SymbolView` (Android, iOS, tvOS, Web; inherits `ViewProps`):

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | `SFSymbol \| { android: AndroidSymbol, ios: SFSymbol, web: AndroidSymbol }` | — | Symbol name. iOS symbols can be browsed in the Apple SF Symbols app. |
| fallback | `React.ReactNode` | — | Rendered when no symbol is defined for the platform. |
| size | `number` | `24` | Size of the symbol. |
| tintColor | `ColorValue` | — | Tint color. |
| weight | `SymbolWeight \| { android: AndroidSymbolWeight, ios: SymbolWeight }` | `'unspecified'` | Weight. On Android and web import from `expo-symbols/androidWeights/{weight}`. |
| animationSpec (iOS) | `AnimationSpec` | — | Animation configuration. |
| colors (iOS) | `ColorValue \| ColorValue[]` | — | Colors used when `type` is `palette`. |
| resizeMode (iOS) | `ContentMode` | `'scaleAspectFit'` | How the image is resized to fit its container. |
| scale (iOS) | `SymbolScale` | `'unspecified'` | Symbol scale. |
| type (iOS) | `SymbolType` | `'monochrome'` | Symbol variant. |

### Method

`Symbol.unstable_getMaterialSymbolSourceAsync(symbol, size: number, color: string): Promise<ImageSourcePropType | null>` (Android). Renders a Material Symbol to an image source; useful for APIs requiring `ImageSourcePropType` such as tab bar icons.

### Types

- `AnimationType`: `'bounce'` | `'pulse'` | `'scale'`
- `AnimationEffect`: `type` (`AnimationType`), `direction` (`'up' | 'down'`), `wholeSymbol` (`boolean`, default `false`)
- `AnimationSpec`: `effect` (`AnimationEffect`), `repeatCount` (`number`), `repeating` (`boolean`), `speed` (`number`, duration in seconds), `variableAnimationSpec` (`VariableAnimationSpec`)
- `VariableAnimationSpec`: booleans `cumulative`, `dimInactiveLayers`, `hideInactiveLayers`, `iterative`, `nonReversing`, `reversing`. Effects are compounding; `cumulative` cancels the iterative variant.
- `ContentMode`: `'scaleToFill'` | `'scaleAspectFit'` | `'scaleAspectFill'` | `'redraw'` | `'center'` | `'top'` | `'bottom'` | `'left'` | `'right'` | `'topLeft'` | `'topRight'` | `'bottomLeft'` | `'bottomRight'`
- `SymbolScale`: `'default'` | `'unspecified'` | `'small'` | `'medium'` | `'large'`
- `SymbolType`: `'monochrome'` | `'hierarchical'` | `'palette'` | `'multicolor'`
- `SymbolWeight`: `'unspecified'` | `'ultraLight'` | `'thin'` | `'light'` | `'regular'` | `'medium'` | `'semibold'` | `'bold'` | `'heavy'` | `'black'`

## Notes

- Platforms: Android, iOS, tvOS, Web, included in Expo Go. Source `https://github.com/expo/expo/tree/sdk-58/packages/expo-symbols` (Expo SDK 58 docs, modificationDate September 15, 2026).
- Wraps SF Symbols and Material Symbols for React Native; it is not the SwiftUI `Image(systemName:)` or UIKit `UIImage(systemName:)` API (see the apple-swiftui and apple-uikit skills).

## Related

- [Expo UI SwiftUI](./expo-ui-swift-ui.md)
- [GlassEffect](./glass-effect.md)
