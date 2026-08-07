# React Hook Form — FAQs

## パフォーマンス

React Hook Form は非制御コンポーネントベースで設計されている。`register` が ref をキャプチャし、`Controller` が再レンダリングスコープを管理する。これにより入力時の再レンダリングを最小化し、マウント速度を向上させる。

## アクセシブルなエラー表示

```tsx
<input
  {...register("name", { required: true })}
  aria-invalid={errors.name ? "true" : "false"}
/>
{errors.name && <span role="alert">This field is required</span>}
```

## クラスコンポーネントとの互換性

React Hook Form はフックベースのため、クラスコンポーネントでは直接使用できない。関数コンポーネントでラップし、props 経由でデータを渡す。

## フォームリセット方法

| メソッド | 動作 |
|---------|------|
| `HTMLFormElement.reset()` | input/select/checkbox の値のみクリア |
| `react-hook-form の reset()` | 全フィールドの値をリセットし、全エラーをクリア |

## フォーム値の初期化

```tsx
// 同期
useForm({ defaultValues: { firstName: "", lastName: "" } })

// 非同期
useForm({ defaultValues: async () => fetch("/api/user").then(res => res.json()) })

// リアクティブ更新（外部データソース）
useForm({ values: externalData, resetOptions: { keepDirtyValues: true } })
```

## ref の共有

```tsx
const { ref, ...rest } = register("test")

<input
  {...rest}
  ref={(e) => {
    ref(e)
    myCustomRef.current = e
  }}
/>
```

## ref なしの登録

`useEffect` 内で手動登録し、`setValue` / `setError` で管理:

```tsx
useEffect(() => {
  register("test")
}, [register])

<input onChange={(e) => setValue("test", e.target.value)} />
```

## 最初のキー入力で値が消える

`value` ではなく `defaultValue` を使用する。React Hook Form は非制御入力が前提。

## React Hook Form vs Formik vs Redux Form

| 項目 | React Hook Form | Formik | Redux Form |
|------|----------------|--------|------------|
| サイズ | 8.5KB | 15KB | 26.4KB |
| 再レンダリング | 最小限 | 状態変更ごと | Redux 変更ごと |
| API | Hooks | Components + Hooks | Components |

## watch vs getValues vs state

| API | 再レンダリング | 用途 |
|-----|--------------|------|
| `watch` | あり（フィールド変更時） | フィールド値に基づく条件付きレンダリング |
| `getValues` | なし | イベントハンドラ内での値取得 |
| `local state` | あり（入力ごと） | 通常の React state 管理 |

## 条件付きレンダリングとデフォルト値

三項演算子で入力を切り替える場合、一意の `key` prop を設定して React にコンポーネントの変更を認識させる:

```tsx
{isA ? <input key="a" {...register("a")} /> : <input key="b" {...register("b")} />}
```

## モーダル / タブ内のフォーム

各モーダル/タブに個別のフォームを作成し、送信データをローカル/グローバル state にキャプチャ。最終的に結合して処理する。
