# useForm — setValues

`setValues` メソッドは複数のフォームフィールドの値を一括で更新する。v7.74.0 以降で利用可能。個別フィールドを順番に `setValue` で更新するよりも効率的で、冗長な深いクローンをスキップしてパフォーマンスを向上させる。

## バージョン要件

- v7.74.0+

## シグネチャ

```typescript
setValues: (
  value: Partial<TFieldValues> | ((current: TFieldValues) => Partial<TFieldValues>),
  options?: {
    shouldValidate?: boolean;
    shouldDirty?: boolean;
    shouldTouch?: boolean;
  }
) => void
```

## 引数

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `Partial<TFieldValues> \| ResetAction<TFieldValues>` | Yes | 設定するフィールド値のオブジェクト、または現在の値を引数に取りパーシャルオブジェクトを返す関数。 |
| `options` | `SetValueConfig` | No | 状態更新オプション。 |

## オプション

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `shouldValidate` | `boolean` | `false` | `true` にすると、値の設定後にバリデーションを実行する。 |
| `shouldDirty` | `boolean` | `false` | `true` にすると、`dirtyFields` と `isDirty` を更新する。 |
| `shouldTouch` | `boolean` | `false` | `true` にすると、対象フィールドを touched 状態にする。 |

## コード例

### オブジェクトで一括設定

```tsx
import { useForm } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

function App() {
  const { register, setValues } = useForm<FormValues>({
    defaultValues: { firstName: "", lastName: "", email: "" },
  });

  const fillForm = () => {
    setValues({
      firstName: "太郎",
      lastName: "山田",
      email: "taro@example.com",
    });
  };

  return (
    <form>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input {...register("email")} />
      <button type="button" onClick={fillForm}>
        フォームを埋める
      </button>
    </form>
  );
}
```

### コールバック関数で更新

```tsx
// 現在の値を元に一部のフィールドを更新
setValues((currentValues) => ({
  ...currentValues,
  firstName: "更新後の名前",
}));
```

### バリデーション付きで設定

```tsx
setValues(
  { firstName: "太郎", email: "taro@example.com" },
  { shouldValidate: true, shouldDirty: true }
);
```

## 重要なルール / 注意事項

- `setValue` の一括版として設計されており、複数フィールドを効率的に更新する。各フィールドで個別の `setValue` を呼ぶよりパフォーマンスが高い。
- `undefined` の値を含むフィールドは更新されない。
- フィールド配列の操作には `useFieldArray` の `replace` や `update` メソッドを使用すること。

## Related

- [setValue](./useform-setvalue.md)
- [reset](./useform-reset.md)
- [useForm](./useform.md)
