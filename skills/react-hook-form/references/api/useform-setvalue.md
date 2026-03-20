# useForm — setValue

`setValue` メソッドは登録済みフィールドの値をプログラム的に設定する。バリデーションや dirty 状態の更新もオプションで制御可能。

## シグネチャ

```typescript
setValue: (
  name: string,
  value: unknown,
  config?: {
    shouldValidate?: boolean;
    shouldDirty?: boolean;
    shouldTouch?: boolean;
  }
) => void
```

## 引数

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | 対象フィールド名。ドット記法でネストフィールドを指定。 |
| `value` | `unknown` | Yes | 設定する値。`undefined` は不可。 |
| `config` | `SetValueConfig` | No | 状態更新オプション。 |

## オプション

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `shouldValidate` | `boolean` | `false` | `true` にすると、値の設定後にバリデーションを実行する。`errors` と `isValid` が更新される。フィールドレベルでのみ `touchedFields` が更新される。 |
| `shouldDirty` | `boolean` | `false` | `true` にすると、`defaultValues` と比較して `dirtyFields` と `isDirty` を更新する。フィールドレベルでのみ更新。 |
| `shouldTouch` | `boolean` | `false` | `true` にすると、フィールドを touched 状態にする。 |

## コード例

### 基本的な使い方

```tsx
import { useForm } from "react-hook-form";

function App() {
  const { register, setValue, handleSubmit } = useForm({
    defaultValues: { firstName: "", lastName: "" },
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />

      <button type="button" onClick={() => setValue("firstName", "太郎")}>
        名前を設定
      </button>

      <input type="submit" />
    </form>
  );
}
```

### バリデーション付き

```tsx
setValue("firstName", "太郎", { shouldValidate: true });
```

### dirty 状態の更新付き

```tsx
setValue("firstName", "太郎", { shouldDirty: true });
```

### 複数オプション

```tsx
setValue("firstName", "太郎", {
  shouldValidate: true,
  shouldDirty: true,
  shouldTouch: true,
});
```

### ドット記法によるネストフィールド

```tsx
// 推奨: ドット記法で個別指定
setValue("user.firstName", "太郎");
setValue("user.lastName", "山田");

// 非推奨: オブジェクトをまとめて渡す（パフォーマンスが低下する可能性）
setValue("user", { firstName: "太郎", lastName: "山田" });
```

### 依存フィールドの自動計算

```tsx
const { watch, setValue, formState } = useForm();
const [a, b] = watch(["a", "b"]);

useEffect(() => {
  if (formState.touchedFields.a && formState.touchedFields.b) {
    setValue("c", `${a} ${b}`);
  }
}, [setValue, a, b, formState]);
```

## 重要なルール / 注意事項

- ドット記法でフィールドを個別に指定するのがパフォーマンス面で推奨される。ネストオブジェクトをまとめて渡すより効率的。
- フィールド配列を更新する場合は、`setValue` よりも `useFieldArray` の `replace` や `update` メソッドを使用することを推奨。
- 再レンダリングはエラーの修正/発生時、または `dirty`/`touched` 状態が変化した場合にのみ発生する。
- 未登録フィールドに `setValue` を使用しても新しいフィールドは作成されない。
- `setValue` を使用する前にフィールドを `register` で登録すること。
- `value` に `undefined` を渡すことはできない。
