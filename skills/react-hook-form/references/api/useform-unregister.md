# useForm — unregister

`unregister` メソッドは、登録済みの input フィールドの登録を解除し、対応するバリデーションルールと値を削除する。単一または複数のフィールドを一度に解除可能。

## シグネチャ

```typescript
unregister: (name: string | string[], options?: UnregisterOptions) => void
```

## 引数

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string \| string[]` | Yes | 登録解除するフィールド名。配列で複数指定可能。 |
| `options` | `UnregisterOptions` | No | 状態保持オプション。 |

## オプション

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `keepDirty` | `boolean` | `false` | `isDirty` と `dirtyFields` の状態を保持する。ただし後続の入力操作が `defaultValues` との比較で状態を更新する可能性がある。 |
| `keepTouched` | `boolean` | `false` | `touchedFields` から入力を削除しない。 |
| `keepIsValid` | `boolean` | `false` | `isValid` の状態を保持する。ただしスキーマバリデーションの場合は更新される可能性がある。 |
| `keepError` | `boolean` | `false` | エラー状態のクリアを防止する。 |
| `keepValue` | `boolean` | `false` | 入力の現在の値を保持する。 |
| `keepDefaultValue` | `boolean` | `false` | `useForm` で定義された `defaultValue` を保持する。 |

## コード例

### 基本的な使い方

```tsx
import { useForm } from "react-hook-form";

function App() {
  const { register, unregister, handleSubmit } = useForm<{
    firstName: string;
    lastName: string;
  }>();

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />

      <button type="button" onClick={() => unregister("lastName")}>
        lastName を解除
      </button>

      <input type="submit" />
    </form>
  );
}
```

### 複数フィールドの解除

```tsx
unregister(["firstName", "lastName"]);
```

### オプション付き

```tsx
unregister("lastName", {
  keepDirty: true,
  keepError: true,
});
```

## 重要なルール / 注意事項

- 組み込みバリデーションは削除される。`register` で設定したバリデーションルールは、登録解除と同時に無効になる。
- スキーマバリデーション（Yup, Zod など）は影響を受けない。スキーマ定義は登録解除後も残るため、スキーマ側も適宜調整する必要がある。
- 登録解除後は対応する input コンポーネントをアンマウントすること。アンマウントしない場合、`register` のコールバックが再度フィールドを登録してしまう。
- 動的フォームで条件付きフィールドを削除する場合に特に有用。
