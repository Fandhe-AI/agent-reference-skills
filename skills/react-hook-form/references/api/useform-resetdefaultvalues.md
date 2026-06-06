# useForm — resetDefaultValues

`resetDefaultValues` メソッドはフォームのデフォルト値を更新し、それに伴い dirty/valid 状態を再計算する。v7.77.0 以降で利用可能。`reset()` と異なり、ユーザーが入力した値には影響せず、デフォルト値の基準線のみを更新する。

## バージョン要件

- v7.77.0+

## シグネチャ

```typescript
resetDefaultValues: (
  values: DefaultValues<TFieldValues> | TFieldValues,
  options?: {
    keepDirty?: boolean;
    keepIsValid?: boolean;
  }
) => void
```

## 引数

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `values` | `DefaultValues<TFieldValues> \| TFieldValues` | Yes | 新しいデフォルト値として設定するオブジェクト。 |
| `options` | `Object` | No | 状態保持オプション。 |

## オプション

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `keepDirty` | `boolean` | `false` | `true` にすると、現在の `dirtyFields` 状態を保持する。デフォルト値更新後の dirty 状態再計算をスキップする。 |
| `keepIsValid` | `boolean` | `false` | `true` にすると、現在の `isValid` 状態を保持する。 |

## reset() との違い

| | `resetDefaultValues` | `reset` |
|---|---|---|
| ユーザー入力値への影響 | なし（値はそのまま） | あり（デフォルト値に戻す） |
| デフォルト値の更新 | あり | あり（値を渡した場合） |
| dirty 状態の再計算 | あり（新しいデフォルト値基準） | あり |
| isSubmitted のリセット | なし | あり |

## コード例

### サーバーデータでデフォルト値を更新

```tsx
import { useForm } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

function UserProfileForm({ userId }: { userId: string }) {
  const { register, handleSubmit, resetDefaultValues } = useForm<FormValues>({
    defaultValues: { firstName: "", lastName: "", email: "" },
  });

  // 保存成功後にデフォルト値を現在の値に更新（dirty 状態をクリア）
  const onSubmit = async (data: FormValues) => {
    await saveUser(userId, data);
    // ユーザーが入力した値はそのままに、デフォルト値を更新
    resetDefaultValues(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input {...register("email")} />
      <button type="submit">保存</button>
    </form>
  );
}
```

### keepDirty オプションで状態を保持

```tsx
// デフォルト値は更新するが、dirty 状態は現在のまま保持
resetDefaultValues(newDefaults, { keepDirty: true });
```

### subscribe との組み合わせ

```tsx
const { subscribe, resetDefaultValues } = useForm({
  defaultValues: { name: "" },
});

// サブスクリプション内で resetDefaultValues は呼ばないこと（無限ループの原因）
```

## 重要なルール / 注意事項

- `resetDefaultValues` はユーザーの入力済み値を変更しない。デフォルト値の基準線のみを更新する。
- 呼び出し後、`isDirty` は新しいデフォルト値と現在の入力値の差分で再計算される。
- `subscribe` のコールバック内で呼び出すと無限ループになるため禁止。
- v7.77.0 以前は `reset(values)` でデフォルト値と入力値を同時に更新する必要があったが、`resetDefaultValues` により分離が可能になった。

## Related

- [reset](./useform-reset.md)
- [resetField](./useform-resetfield.md)
- [formState](./useform-formstate.md)
- [useForm](./useform.md)
