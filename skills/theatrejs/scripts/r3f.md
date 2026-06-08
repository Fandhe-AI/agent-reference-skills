# R3F

@theatre/r3f（React Three Fiber 統合）のコードスニペット集。

## SheetProvider によるシートのバインド

```jsx
import { Canvas } from '@react-three/fiber'
import { SheetProvider } from '@theatre/r3f'
import { getProject } from '@theatre/core'

const demoSheet = getProject('Demo Project').sheet('Demo Sheet')

function App() {
  return (
    <Canvas>
      <SheetProvider sheet={demoSheet}>
        {/* editable コンポーネントを配置 */}
      </SheetProvider>
    </Canvas>
  )
}
```

## editable コンポーネントの使用

```jsx
import { editable as e } from '@theatre/r3f'

<e.pointLight theatreKey="Key light" />
<e.group theatreKey="My group" />
<e.mesh theatreKey="Marker" visible="editor">
  <boxBufferGeometry />
  <meshBasicMaterial color="yellow" />
</e.mesh>
```

`theatreKey` は Theatre.js オブジェクトの識別子として必須。

## カスタムコンポーネントの editable ラップ

```jsx
import { editable } from '@theatre/r3f'
import { PerspectiveCamera } from '@react-three/drei'

const EditableCamera = editable(PerspectiveCamera, 'perspectiveCamera')
```

## PerspectiveCamera の配置

```jsx
import { PerspectiveCamera } from '@theatre/r3f'

<PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 16]} fov={75} />
```

`lookAt` でオブジェクト追尾も可能:

```jsx
<PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 16]} fov={75} lookAt={ref} />
```

## useCurrentSheet によるシート参照の取得

```jsx
import { useCurrentSheet } from '@theatre/r3f'

function MyComponent() {
  const sheet = useCurrentSheet()
  // sheet.sequence.play() 等が利用可能
}
```

## RefreshSnapshot による Suspense 対応

```jsx
import { RefreshSnapshot } from '@theatre/r3f'

<Suspense fallback={null}>
  <RefreshSnapshot />
  <MyModel />
</Suspense>
```

## 手動スナップショット更新

```js
import { refreshSnapshot } from '@theatre/r3f'

refreshSnapshot()
```

## Studio + R3F 拡張の初期化（開発環境・Vite）

```js
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { getProject } from '@theatre/core'

if (import.meta.env.DEV) {
  studio.initialize()
  studio.extend(extension)
}

const demoSheet = getProject('Demo Project').sheet('Demo Sheet')
```
