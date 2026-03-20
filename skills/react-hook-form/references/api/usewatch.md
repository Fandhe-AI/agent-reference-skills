# useWatch

フォームフィールドの値を購読し、変更を検知するためのカスタムフック。カスタムフックレベルで再レンダリングを分離し、親コンポーネントの再レンダリングを回避できる。

## シグネチャ

```typescript
useWatch(props?: UseWatchProps): unknown | unknown[] | { [key: string]: unknown }
```

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `name` | `string \| string[] \| undefined` | いいえ | - | 監視するフィールド名。省略時はフォーム全体を監視 |
| `control` | `Control` | いいえ | - | `useForm` の制御オブジェクト。`FormProvider` 使用時は省略可 |
| `compute` | `Function` | いいえ | - | 監視した値を変換する関数。フォームデータを受け取り、計算結果を返す |
| `defaultValue` | `unknown` | いいえ | - | 初回レンダリング時に返される初期値 |
| `disabled` | `boolean` | いいえ | `false` | `true` にすると購読を一時停止する |
| `exact` | `boolean` | いいえ | `false` | フィールド名の完全一致を有効にする |

## Return パターン

返り値は `name` の指定方法によって変わる。

```typescript
// 単一フィールド → 単一値
const value = useWatch({ name: "fieldName" });
// => unknown

// 複数フィールド → 配列
const [firstName, lastName] = useWatch({ name: ["firstName", "lastName"] });
// => unknown[]

// フォーム全体（name 省略） → オブジェクト
const formValues = useWatch();
// => { [key: string]: unknown }
```

## コード例

### 基本的な使い方

```tsx
import { useForm, useWatch } from "react-hook-form";

function App() {
  const { register, control } = useForm({
    defaultValues: { firstName: "", lastName: "" },
  });

  return (
    <form>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <Preview control={control} />
    </form>
  );
}

function Preview({ control }) {
  const firstName = useWatch({ control, name: "firstName" });
  const lastName = useWatch({ control, name: "lastName" });

  return (
    <p>
      プレビュー: {firstName} {lastName}
    </p>
  );
}
```

### compute を使った値の変換

```tsx
function TotalPrice({ control }) {
  const total = useWatch({
    control,
    name: ["price", "quantity"],
    compute: ([price, quantity]) => price * quantity,
  });

  return <p>合計: {total}円</p>;
}
```

### FormProvider との併用

```tsx
function WatchedField() {
  // FormProvider 内では control 不要
  const email = useWatch({ name: "email" });
  return <p>入力中のメール: {email}</p>;
}
```

### setValue との組み合わせ（タイミング問題の解決）

```tsx
function Component({ control, setValue }) {
  const watchedValue = useWatch({ control, name: "field" });

  // useWatch の購読前に setValue された値を取得するため
  // getValues と組み合わせる
  const currentValue = watchedValue ?? getValues("field");

  return <p>{currentValue}</p>;
}
```

## 重要なルール

1. **初回レンダリングでは defaultValue を返す**: `useWatch` は初回レンダリング時に `defaultValue`（または `useForm` の `defaultValues`）を返す。フォーム値の購読が確立される前の値であることに注意。

2. **実行順序に注意**: 購読が確立される前に `setValue` で値を更新しても、その値は `useWatch` に反映されない。更新は購読確立後に行うこと。

3. **render 用に最適化**: `useWatch` の返り値はレンダリングフェーズに最適化されており、`useEffect` の依存配列で変更検知に使うには外部の比較フックが推奨される。

```tsx
// useEffect 依存には直接使わない方がよい
// render 内で直接使用することを推奨
function Display({ control }) {
  const value = useWatch({ control, name: "field" });
  return <span>{value}</span>; // render で直接使用
}
```

4. **パフォーマンスの利点**: カスタムフックレベルで再レンダリングが分離されるため、`useWatch` を使用するコンポーネントのみが再レンダリングされ、親コンポーネントには影響しない。

5. **`watch` メソッドとの違い**: `useForm` の `watch` メソッドはフォームコンポーネント全体を再レンダリングするが、`useWatch` はフックを使用するコンポーネントのみを再レンダリングする。
