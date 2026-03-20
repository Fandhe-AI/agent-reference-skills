# Watch

`useWatch` フックのコンポーネント版。render prop パターンを使い、JSX 内で宣言的にフォームフィールドの値を購読して使用できる。

## シグネチャ

```tsx
<Watch
  name={string | string[]}
  control={Control}
  compute={Function}
  defaultValue={unknown}
  disabled={boolean}
  exact={boolean}
  render={Function}       // 必須
/>
```

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `name` | `string \| string[] \| undefined` | いいえ | - | 監視するフィールド名。省略時はフォーム全体を監視 |
| `control` | `Control` | いいえ | - | `useForm` の制御オブジェクト。`FormProvider` 使用時は省略可 |
| `compute` | `Function` | いいえ | - | 監視した値をフィルタリング・変換するカスタム関数 |
| `defaultValue` | `unknown` | いいえ | - | 初回レンダリング時に返される値 |
| `disabled` | `boolean` | いいえ | `false` | `true` にすると購読を無効化する |
| `exact` | `boolean` | いいえ | `false` | フィールド名の完全一致を有効にする |
| `render` | `Function` | はい | - | 監視した値を受け取り React 要素を返す render 関数。値が変更されるたびに呼び出される |

## コード例

### 単一フィールドの監視

```tsx
import { useForm, Watch } from "react-hook-form";

function App() {
  const { register, control } = useForm({
    defaultValues: { name: "" },
  });

  return (
    <div>
      <form>
        <input {...register("name")} />
      </form>

      <Watch
        control={control}
        name="name"
        render={(value) => <p>入力値: {value}</p>}
      />
    </div>
  );
}
```

### 複数フィールドの監視

```tsx
function App() {
  const { register, control } = useForm({
    defaultValues: { foo: "", bar: "" },
  });

  return (
    <div>
      <form>
        <input {...register("foo")} />
        <input {...register("bar")} />
      </form>

      <Watch
        control={control}
        name={["foo", "bar"]}
        render={([foo, bar]) => (
          <p>
            foo: {foo}, bar: {bar}
          </p>
        )}
      />
    </div>
  );
}
```

### compute を使った値の変換

```tsx
<Watch
  control={control}
  name={["price", "quantity"]}
  compute={([price, quantity]) => price * quantity}
  render={(total) => <p>合計金額: {total}円</p>}
/>
```

### 条件付きレンダリング

```tsx
<Watch
  control={control}
  name="showDetails"
  render={(showDetails) =>
    showDetails ? (
      <div>
        <input {...register("details")} />
      </div>
    ) : null
  }
/>
```

## 重要なルール

1. **render prop は必須**: `render` 関数は必ず指定する必要がある。監視した値を引数として受け取り、React 要素を返す。
2. **宣言的な使用**: `Watch` コンポーネントは JSX 内で宣言的にフォーム値を購読する。カスタムフックが使えない場面（例: JSX 内で直接値を表示したい場合）に適している。
3. **選択的な再レンダリング**: 指定したフィールドの値が変更された時のみ、`render` 関数が再実行される。
4. **初回レンダリング**: 初回は `defaultValue` が使用される。`defaultValue` が指定されていない場合は `useForm` の `defaultValues` が使われる。
5. **useWatch との使い分け**: ロジック処理が必要な場合は `useWatch` フック、表示のみの場合は `Watch` コンポーネントが適している。
