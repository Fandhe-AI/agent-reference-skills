# Setup

プロジェクト・シート・オブジェクトの初期化コードスニペット集。

## プロジェクトの作成

```js
import { getProject } from '@theatre/core'

const project = getProject('My Project')
```

`getProject` は同名プロジェクトが既に存在する場合、それを返す。

## 保存済み状態の読み込み

```js
import { getProject } from '@theatre/core'
import projectState from './state.json'

const project = getProject('My Project', { state: projectState })
```

## プロジェクトの読み込み完了を待機

```js
project.ready.then(() => console.log('Project loaded!'))
```

## シートの作成

```js
const sheet = project.sheet('Animated scene')
```

## シートオブジェクトの作成

```js
const obj = sheet.object('My Object', {
  position: { x: 0, y: 0 },
})
```

## Prop タイプを明示したオブジェクト定義

```js
import { getProject, types } from '@theatre/core'

const obj = sheet.object('Torus Knot', {
  rotation: types.compound({
    x: types.number(0, { range: [-2, 2] }),
    y: types.number(0, { range: [-2, 2] }),
    z: types.number(0, { range: [-2, 2] }),
  }),
})
```

## 値変化の購読

```js
const unsubscribe = obj.onValuesChange((values) => {
  mesh.rotation.x = values.rotation.x * Math.PI
})

// 購読解除
unsubscribe()
```

## onChange / val によるポインター購読

```js
import { onChange, val } from '@theatre/core'

onChange(obj.props.x, (newValue) => console.log(newValue))

console.log(val(obj.props.position.x))
```

## オブジェクトの名前空間（階層化）

```js
const box0 = sheet.object('Basics / Boxes / box-0', { x: 0 })
const box1 = sheet.object('Basics / Boxes / box-1', { x: 0 })
```

## オブジェクトの再構成

```js
const obj = sheet.object('obj', { foo: 0 })
const obj2 = sheet.object('obj', { bar: 0 }, { reconfigure: true })
```

`reconfigure: true` を指定すると既存オブジェクトの Props が置き換わる。

## オブジェクトのデタッチ

```js
sheet.detachObject('obj')
```

## Studio の初期化（開発環境限定・Vite）

```js
import studio from '@theatre/studio'

if (import.meta.env.DEV) {
  studio.initialize()
}
```

## Studio の初期化（@theatre/r3f 拡張付き）

```js
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'

if (import.meta.env.DEV) {
  studio.initialize()
  studio.extend(extension)
}
```

## theatric による React コントロール初期化

```js
import { initialize } from 'theatric'

initialize({
  assets: { baseUrl: '/theatric-assets' },
})
```
