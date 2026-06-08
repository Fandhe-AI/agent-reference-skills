# Theatric

theatric パッケージ（React 向けコントロール UI）のコードスニペット集。

## 基本的な useControls の使用

```js
import { useControls } from 'theatric'

function MyComponent() {
  const { name, age } = useControls({ name: 'Andrew', age: 28 })
  return <div>{name} is {age}</div>
}
```

## 数値の範囲・ステップ指定

```js
import { useControls, types } from 'theatric'

const { age } = useControls({
  age: types.number(28, { range: [0, 150], nudgeMultiplier: 0.1 }),
})
```

## フォルダーによるグループ化

```js
const { x } = useControls({ x: 0 }, { folder: 'Position' })
```

## ボタンコントロールの追加

```js
import { useControls, button } from 'theatric'

useControls({
  reset: button(() => {
    console.log('reset clicked')
  }),
})
```

## アセット URL の取得

```js
import { useControls, types, getAssetUrl } from 'theatric'

const { image } = useControls({
  image: types.image('', {}),
})

const url = getAssetUrl(image)
```

## 命令型アクセス（$get / $set）

```js
const { $get, $set } = useControls({ age: 28 })

// 現在値の取得
const currentAge = $get((values) => values.age)

// 値の設定
$set((values) => values.age, 30)
```

## 初期化設定（アセットベース URL 指定）

```js
import { initialize } from 'theatric'

initialize({
  assets: { baseUrl: '/theatric-assets' },
})
```
