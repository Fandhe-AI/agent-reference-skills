# useForm — trigger

`trigger` メソッドはバリデーションを手動で実行する。フォーム全体、単一フィールド、または複数フィールドのバリデーションをプログラム的にトリガーできる。

## シグネチャ

```typescript
trigger: (
  name?: string | string[],
  options?: { shouldFocus?: boolean }
) => Promise<boolean>
```

## 引数

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string \| string[] \| undefined` | No | バリデーション対象の指定。省略で全フィールド。 |
| `options` | `{ shouldFocus?: boolean }` | No | フォーカスオプション。 |

## 引数パターン

| パターン | 説明 | 例 |
|----------|------|-----|
| 引数なし（`undefined`） | 全フィールドのバリデーションを実行 | `trigger()` |
| `string` | 単一フィールドのバリデーションを実行 | `trigger("email")` |
| `string[]` | 複数フィールドのバリデーションを実行 | `trigger(["email", "name"])` |

## オプション

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `shouldFocus` | `boolean` | `false` | `true` にすると、エラー発生時に対象フィールドにフォーカスする。登録済み input にのみ有効。 |

## 戻り値

| Type | Description |
|------|-------------|
| `Promise<boolean>` | バリデーション成功時は `true`、失敗時は `false`。 |

## コード例

### 全フィールドのバリデーション

```tsx
import { useForm } from "react-hook-form";

function App() {
  const { register, trigger, formState: { errors } } = useForm();

  const validateAll = async () => {
    const isValid = await trigger();
    console.log("フォームは有効:", isValid);
  };

  return (
    <form>
      <input {...register("firstName", { required: true })} />
      <input {...register("email", { required: true })} />

      <button type="button" onClick={validateAll}>
        全バリデーション
      </button>
    </form>
  );
}
```

### 単一フィールドのバリデーション

```tsx
const validateEmail = async () => {
  const isValid = await trigger("email");
  if (isValid) {
    console.log("メールアドレスは有効です");
  }
};
```

### 複数フィールドのバリデーション

```tsx
const validateStep = async () => {
  const isValid = await trigger(["firstName", "lastName", "email"]);
  if (isValid) {
    // 次のステップに進む
    goToNextStep();
  }
};
```

### ネストフィールドのバリデーション

```tsx
await trigger("user.email");
await trigger("items.0.title");
```

### フォーカス付きバリデーション

```tsx
await trigger("email", { shouldFocus: true });
```

### ウィザード形式フォームでの使用

```tsx
function WizardForm() {
  const { register, trigger } = useForm();
  const [step, setStep] = useState(1);

  const nextStep = async () => {
    const fieldsToValidate =
      step === 1
        ? ["firstName", "lastName"]
        : ["email", "phone"];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <form>
      {step === 1 && (
        <>
          <input {...register("firstName", { required: true })} />
          <input {...register("lastName", { required: true })} />
        </>
      )}
      {step === 2 && (
        <>
          <input {...register("email", { required: true })} />
          <input {...register("phone")} />
        </>
      )}
      <button type="button" onClick={nextStep}>
        次へ
      </button>
    </form>
  );
}
```

## 重要なルール / 注意事項

- 単一フィールド名（`string`）を指定した場合のみ、レンダリングの最適化が適用される。そのフィールドのみが再レンダリングされる。
- `string[]` または `undefined` を指定した場合は、`formState` 全体の再レンダリングがトリガーされる。
- 非同期バリデーションにも対応。`Promise<boolean>` が返されるため、`await` で結果を待機できる。
- `shouldFocus` オプションは `register` で `ref` が登録されている input にのみ機能する。
