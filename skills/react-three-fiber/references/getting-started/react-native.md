---
source: https://r3f.docs.pmnd.rs/getting-started/installation#react-native
---

# React Native

R3F supports react-native and is imported from `@react-three/fiber/native`. `expo-gl` and `expo-asset` are used under the hood for WebGL2 bindings and for interplay between Metro and three.js loaders.

## Signature / Usage

```bash
# Create a managed/bare app
npx create-expo-app
cd my-app

# or

# Create and link bare app
npx react-native init my-app
cd my-app
npx install-expo-modules@latest
```

Then install dependencies (for manual installation or migration, see Expo's "installing expo modules" guide):

```bash
# Automatically install
expo install expo-gl

# Install NPM dependencies
npm install three @react-three/fiber
```

Metro may need to know about assets if you use `useLoader` or Drei abstractions like `useGLTF` and `useTexture`:

```js
// metro.config.js
module.exports = {
  resolver: {
    sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'],
    assetExts: ['glb', 'gltf', 'png', 'jpg'],
  },
}
```

Usage (the docs example loads a model with drei's `useGLTF`):

```jsx
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber/native'
import { useGLTF } from '@react-three/drei/native'
import modelPath from './path/to/model.glb'

function Model(props) {
  const gltf = useGLTF(modelPath)
  return <primitive {...props} object={gltf.scene} />
}

export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <Suspense>
        <Model />
      </Suspense>
    </Canvas>
  )
}
```

### Native Canvas props

Source: `packages/fiber/src/native/Canvas.tsx`, v9.8.2.

```tsx
export interface CanvasProps extends Omit<RenderProps<HTMLCanvasElement>, 'size' | 'dpr'>, Omit<ViewProps, 'children'> {
  children?: React.ReactNode
  style?: ViewStyle
  ref?: React.Ref<View>
}

export function Canvas(props: CanvasProps)
```

## Notes

- `npx react-native init` (verbatim above) is removed as of React Native 0.75; use `npx @react-native-community/cli@latest init my-app` instead. Likewise, `expo install expo-gl` assumes the deprecated global expo-cli; use `npx expo install expo-gl`. Both replacements are adaptations, not part of the official docs (v9.8.2).
- The official docs place `cd my-app` last in the bare-app snippet, but `install-expo-modules` must run inside the generated project directory, so the order is swapped here.
- R3F's API is completely x-platform, so events and hooks are used just as on the web.
- Make sure to import from `@react-three/fiber/native` or `@react-three/drei/native` for correct IntelliSense and platform-specific abstractions.
- iOS simulators often have incomplete or unreliable OpenGL ES support, which can cause EXC_BAD_ACCESS crashes when rendering 3D content. Always test on a physical iOS device (iPhone/iPad running iOS 16 or later) to ensure stable WebGL rendering.
- In the native `Canvas` source, `size` and `dpr` are omitted from the props: the `dpr` is fixed to `PixelRatio.get()` because expo-gl can only render at native dpr/resolution, and `size` comes from the `View` layout.
- `@react-three/drei` is a separate package and is not covered by this skill.
- The docs sentence "R3F v8 adds support for react-native" is historical; this skill targets `@react-three/fiber` 9.8.2.

## Related

- [Installation](./installation.md)
- [Introduction](./introduction.md)
