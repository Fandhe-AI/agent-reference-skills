# useForm — clearErrors

`clearErrors` メソッドはフォームのエラーをクリアする。全エラー、単一フィールド、または複数フィールドのエラーを選択的に削除可能。

## シグネチャ

```typescript
clearErrors: (name?: string | string[]) => void
```

## 引数

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string \| string[] \| undefined` | No | クリア対象。省略で全エラー削除。 |

## 引数パターン

| パターン | 説明 | 例 |
|----------|------|-----|
| 引数なし（`undefined`） | 全エラーを削除 | `clearErrors()` |
| `string` | 単一フィールドのエラーを削除 | `clearErrors("firstName")` |
| `string[]` | 複数フィールドのエラーを削除 | `clearErrors(["firstName", "lastName"])` |

## コード例

### 全エラーのクリア

```tsx
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm();

  return (
    <form>
      <input {...register("firstName", { required: true })} />
      {errors.firstName && <span>必須です</span>}

      <input {...register("lastName", { required: true })} />
      {errors.lastName && <span>必須です</span>}

      <button type="button" onClick={() => clearErrors()}>
        全エラーをクリア
      </button>
    </form>
  );
}
```

### 単一フィールドのクリア

```tsx
clearErrors("firstName");
```

### 複数フィールドのクリア

```tsx
clearErrors(["firstName", "lastName"]);
```

### ネストフィールドの親指定でクリア

```tsx
// "test" を指定すると、test.firstName と test.lastName のエラーも削除される
clearErrors("test");

// 特定の子フィールドのみ削除する場合
clearErrors("test.firstName");
```

### setError と組み合わせた使用

```tsx
const onSubmit = async (data: any) => {
  // 送信前にサーバーエラーをクリア
  clearErrors("root.serverError");

  try {
    await submitData(data);
  } catch {
    setError("root.serverError", {
      type: "server",
      message: "送信に失敗しました",
    });
  }
};
```

## 重要なルール / 注意事項

- バリデーションルール自体には影響しない。エラー表示をクリアするだけで、`register` で設定されたルールは維持される。
- `isValid` の `formState` プロパティには直接影響しない。有効性はバリデーションルールに基づいて再評価される。
- ネストフィールドの親名を指定すると、その配下の全子フィールドのエラーもクリアされる。
- `setError` で手動設定したエラーをクリアする場合にも使用する。
