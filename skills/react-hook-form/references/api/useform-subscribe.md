# useForm — subscribe

`subscribe` メソッドは、コンポーネントの再レンダリングなしにフォーム状態の変更を購読する。外部システムとの連携やアナリティクスなど、UI 更新が不要な場面に適している。

## シグネチャ

```typescript
subscribe: (props: {
  name?: string[];
  formState?: Partial<ReadFormState>;
  callback: (state: FormState) => void;
  exact?: boolean;
}) => () => void
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string[] \| undefined` | `undefined` | 購読するフィールド名の配列。`undefined` の場合はフォーム全体を購読。 |
| `formState` | `Partial<ReadFormState>` | — | 購読する状態プロパティを選択。`values`, `isDirty`, `dirtyFields`, `touchedFields`, `isValid`, `errors`, `validatingFields`, `isValidating` が指定可能。 |
| `callback` | `(state: FormState) => void` | — | 状態変更時に呼ばれるコールバック関数。指定した状態がデストラクチャリングで取得可能。 |
| `exact` | `boolean` | `false` | フィールド名の完全一致を有効にする。 |

## 戻り値

| Type | Description |
|------|-------------|
| `() => void` | 購読解除関数。呼び出すと購読を停止する。 |

## コード例

### 基本的な値の購読

```tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function App() {
  const { register, subscribe } = useForm({
    defaultValues: { name: "", email: "" },
  });

  useEffect(() => {
    const unsubscribe = subscribe({
      formState: { values: true },
      callback: ({ values }) => {
        console.log("フォーム値が変更されました:", values);
      },
    });

    return () => unsubscribe();
  }, [subscribe]);

  return (
    <form>
      <input {...register("name")} />
      <input {...register("email")} />
    </form>
  );
}
```

### 特定フィールドの購読

```tsx
useEffect(() => {
  const unsubscribe = subscribe({
    name: ["email"],
    formState: { values: true, errors: true },
    callback: ({ values, errors }) => {
      console.log("email:", values.email);
      if (errors.email) {
        console.log("エラー:", errors.email.message);
      }
    },
  });

  return () => unsubscribe();
}, [subscribe]);
```

### バリデーション状態の購読

```tsx
useEffect(() => {
  const unsubscribe = subscribe({
    formState: { isValid: true, isDirty: true },
    callback: ({ isValid, isDirty }) => {
      // 外部システムにフォーム状態を同期
      analytics.track("formState", { isValid, isDirty });
    },
  });

  return () => unsubscribe();
}, [subscribe]);
```

## 重要なルール / 注意事項

- コールバック内で `setValue` や `reset` などの状態変更メソッドを呼び出してはならない。無限ループの原因になる。
- 再レンダリングは発生しない。UI の更新が必要な場合は `watch` や `useWatch` を使用すること。
- メモリリーク防止のため、必ずクリーンアップ関数で `unsubscribe` を実行すること。
- `watch` のコールバック形式の代替として推奨される方法。
