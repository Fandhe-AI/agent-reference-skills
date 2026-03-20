# useController

制御コンポーネント（React-Select、AntD、MUI など）を React Hook Form と統合するためのカスタムフック。`register` が使えない外部コンポーネントに対して、フォーム状態の接続を提供する。

## シグネチャ

```typescript
useController(props?: UseControllerProps): {
  field: UseControllerReturn['field'];
  fieldState: UseControllerReturn['fieldState'];
  formState: UseControllerReturn['formState'];
}
```

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `name` | `FieldPath` | はい | - | フィールドの一意な名前 |
| `control` | `Control` | いいえ | - | `useForm` から取得する制御オブジェクト。`FormProvider` 使用時は省略可 |
| `rules` | `Object` | いいえ | - | バリデーションルール（`required`, `min`, `max`, `minLength`, `maxLength`, `pattern`, `validate`） |
| `shouldUnregister` | `boolean` | いいえ | `false` | アンマウント時にフィールドを登録解除し、`defaultValues` も削除する |
| `disabled` | `boolean` | いいえ | `false` | 入力を無効化する。無効時は送信データから値が除外される |
| `defaultValue` | `unknown` | いいえ | - | フィールドのデフォルト値。`undefined` は不可。フィールドレベルまたはフォームレベルで設定 |
| `exact` | `boolean` | いいえ | `false` | フィールド名の購読で完全一致を有効にする |

## Return

### field オブジェクト

| Name | Type | Description |
|------|------|-------------|
| `onChange` | `(value: any) => void` | 入力値をフォーム状態に送信する |
| `onBlur` | `() => void` | 入力のインタラクション（タッチ）を報告する |
| `value` | `unknown` | 制御コンポーネントの現在の値 |
| `name` | `string` | 登録されたフィールド名 |
| `ref` | `React.Ref` | フォーカス管理のためのリファレンス（エラー時のフォーカス移動に使用） |
| `disabled` | `boolean` | 入力の無効状態 |

### fieldState オブジェクト

| Name | Type | Description |
|------|------|-------------|
| `invalid` | `boolean` | フィールドのバリデーション状態（エラーがあれば `true`） |
| `isTouched` | `boolean` | ユーザーがフィールドに触れたかどうか |
| `isDirty` | `boolean` | フィールドが変更されたかどうか |
| `error` | `object` | フィールド固有のエラー情報 |

### formState オブジェクト

| Name | Type | Description |
|------|------|-------------|
| `isDirty` | `boolean` | フォーム全体の変更状態 |
| `dirtyFields` | `object` | 変更されたフィールドの一覧 |
| `touchedFields` | `object` | タッチされたフィールドの一覧 |
| `defaultValues` | `object` | フォームのデフォルト値 |
| `isSubmitted` | `boolean` | フォームが送信されたかどうか |
| `isSubmitSuccessful` | `boolean` | 送信が成功したかどうか |
| `isSubmitting` | `boolean` | 送信中かどうか |
| `isLoading` | `boolean` | 非同期 defaultValues のロード中かどうか |
| `submitCount` | `number` | 送信回数 |
| `isValid` | `boolean` | バリデーションエラーがないかどうか |
| `isValidating` | `boolean` | バリデーション実行中かどうか |
| `validatingFields` | `object` | 非同期バリデーション中のフィールド |
| `errors` | `object` | フィールドエラーメッセージ |
| `disabled` | `boolean` | フォームが無効化されているかどうか |

## コード例

### 基本的な使い方

```tsx
import { useController, useForm } from "react-hook-form";

function TextField({ name, control, rules }) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <div>
      <input
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        ref={field.ref}
      />
      {invalid && <p>{error?.message}</p>}
    </div>
  );
}

function App() {
  const { handleSubmit, control } = useForm({
    defaultValues: { firstName: "" },
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <TextField name="firstName" control={control} rules={{ required: true }} />
      <button type="submit">送信</button>
    </form>
  );
}
```

### チェックボックス（配列値）パターン

```tsx
function Checkboxes({ name, control, options }) {
  const { field } = useController({ control, name });
  const [value, setValue] = useState(field.value || []);

  return (
    <>
      {options.map((option) => (
        <label key={option}>
          <input
            type="checkbox"
            value={option}
            checked={value.includes(option)}
            onChange={(e) => {
              const newValue = e.target.checked
                ? [...value, option]
                : value.filter((v) => v !== option);
              setValue(newValue);
              field.onChange(newValue);
            }}
          />
          {option}
        </label>
      ))}
    </>
  );
}
```

## 重要なルール

1. **二重登録の禁止**: `{...field}` と `{...register()}` を同じフィールドに同時使用しないこと。`useController` がフィールド登録を管理する。
2. **単一インスタンス**: 1 つのコンポーネントに対して 1 つの `useController` を使用する。複数必要な場合はリネームする。
3. **defaultValue に `undefined` は不可**: `defaultValue` には `undefined` を使用できない。フォームレベルの `defaultValues` で設定すること。
4. **dirty 状態の追跡**: `isDirty` を正確に追跡するには、フォームレベルで `defaultValues` を設定する必要がある。
5. **ローカル状態との併用**: `useState` と組み合わせて UI 状態を管理できる（上記チェックボックス例を参照）。
