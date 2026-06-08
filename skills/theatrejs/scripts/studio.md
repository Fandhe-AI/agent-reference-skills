# Studio

Theatre.js Studio の操作・プログラム制御コードスニペット集。

## Studio の表示・非表示

```js
import studio from '@theatre/studio'

studio.ui.hide()
studio.ui.restore()
```

## アニメーション状態の JSON 取得（プログラムによる保存）

```js
const stateJSON = studio.createContentOfSaveFile('My Project')
console.log(JSON.stringify(stateJSON))
```

`createContentOfSaveFile` は Studio UI の "Export" ボタン相当の動作をプログラムから実行する。

## undoable トランザクションによる Prop 値の変更

```js
studio.transaction(({ set, unset }) => {
  set(obj.props.x, 10)
  unset(obj.props.y)
})
```

## スクラブによる Prop 値の変更（undo レベルをまとめる）

```js
const scrub = studio.scrub()

scrub.capture(({ set }) => {
  set(obj.props.x, 10)
})

// 変更を確定
scrub.commit()

// または変更を破棄
// scrub.discard()
```

## 選択状態の設定

```js
studio.setSelection([sheet, obj])
```

## 選択変化の購読

```js
studio.onSelectionChange((selection) => {
  console.log(selection)
})
```

## 拡張機能の登録

```js
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'

studio.extend(extension)
```

## Studio プロジェクトの取得

```js
const studioProject = studio.getStudioProject()
```

## ツールセットの DOM レンダリング

```js
studio.ui.renderToolset('my-toolset', document.getElementById('toolbar'))
```
