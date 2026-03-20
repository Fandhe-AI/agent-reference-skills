# useForm — resetField

`resetField` メソッドは個別のフィールドの状態と値をリセットする。フォーム全体ではなく、特定のフィールドのみをリセットしたい場合に使用する。

## シグネチャ

```typescript
resetField: (name: string, options?: ResetFieldOptions) => void
```

## 引数

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | リセットするフィールド名。`register` で登録済みのフィールド名と完全に一致する必要がある。 |
| `options` | `ResetFieldOptions` | No | リセット動作のカスタマイズ。 |

## オプション

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `keepError` | `boolean` | `false` | `true` の場合、フィールドのバリデーションエラーを保持する。 |
| `keepDirty` | `boolean` | `false` | `true` の場合、`dirtyFields` の状態を保持する。 |
| `keepTouched` | `boolean` | `false` | `true` の場合、`touchedFields` の状態を保持する。 |
| `defaultValue` | `unknown` | — | リセット先のカスタム値。指定するとフィールドの値と `defaultValue` の両方が更新される。`undefined` は不可。省略すると元の `defaultValue` に戻る。 |

## コード例

### 基本的なリセット

```tsx
import { useForm } from "react-hook-form";

function App() {
  const { register, resetField, formState: { errors } } = useForm({
    defaultValues: { firstName: "", lastName: "" },
  });

  return (
    <form>
      <input {...register("firstName", { required: true })} />
      {errors.firstName && <span>必須です</span>}

      <button type="button" onClick={() => resetField("firstName")}>
        firstName をリセット
      </button>
    </form>
  );
}
```

### エラーを保持してリセット

```tsx
resetField("firstName", { keepError: true });
```

### 新しいデフォルト値でリセット

```tsx
resetField("firstName", { defaultValue: "新しい名前" });
```

### dirty 状態を保持してリセット

```tsx
resetField("firstName", { keepDirty: true });
```

## 副作用

`resetField` を呼び出すと、以下のフォーム状態が自動的に再評価される:

- `isValid` — バリデーションが再実行され、フォームの有効性が再計算される。
- `isDirty` — フィールドのリセットにより、フォーム全体の dirty 状態が再計算される。

## 重要なルール / 注意事項

- フィールド名は `register` で登録されたものと完全一致する必要がある。一致しない場合、操作は暗黙的に失敗する。
- `defaultValue` オプションに `undefined` は渡せない。
- `defaultValue` を指定すると、そのフィールドの `defaultValue` 自体が更新される（以降の `isDirty` 比較に影響）。
- フォーム全体をリセットする場合は `reset` メソッドを使用すること。
