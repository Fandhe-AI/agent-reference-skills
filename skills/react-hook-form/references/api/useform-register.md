# useForm — register

`register` メソッドは input 要素をフォームに登録し、バリデーションルールを適用する。戻り値を input 要素にスプレッドすることで、値の追跡と検証が可能になる。

## シグネチャ

```typescript
register: (name: string, options?: RegisterOptions) => {
  ref: React.Ref;
  name: string;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
}
```

## 引数

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | フィールドの一意な名前。ドット記法でネストをサポート。 |
| `options` | `RegisterOptions` | No | バリデーションルールと動作設定。 |

## オプション

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `required` | `boolean \| string \| { value: boolean, message: string }` | — | 入力が必須かどうか。`string` を渡すとエラーメッセージになる。 |
| `minLength` | `number \| { value: number, message: string }` | — | 最小文字数。 |
| `maxLength` | `number \| { value: number, message: string }` | — | 最大文字数。 |
| `min` | `number \| string \| { value: number \| string, message: string }` | — | 最小値。日付フィールドの場合は `string`。 |
| `max` | `number \| string \| { value: number \| string, message: string }` | — | 最大値。日付フィールドの場合は `string`。 |
| `pattern` | `RegExp \| { value: RegExp, message: string }` | — | 正規表現によるバリデーション。 |
| `validate` | `Function \| Record<string, Function>` | — | カスタムバリデーション関数。`true` を返すと有効、`string` を返すとエラーメッセージ。オブジェクトで複数ルールを指定可能。非同期関数もサポート。 |
| `valueAsNumber` | `boolean` | `false` | 値を `Number` に変換してからバリデーションする。`setValueAs` と併用不可。 |
| `valueAsDate` | `boolean` | `false` | 値を `Date` に変換してからバリデーションする。`setValueAs` と併用不可。 |
| `setValueAs` | `(value: any) => any` | — | カスタム変換関数。`valueAsNumber` / `valueAsDate` と併用不可。 |
| `disabled` | `boolean` | `false` | 入力を無効にする。無効な入力の値は `undefined` になる。 |
| `onChange` | `(e: SyntheticEvent) => void` | — | カスタムの change イベントハンドラ。RHF の内部ハンドラと共に実行される。 |
| `onBlur` | `(e: SyntheticEvent) => void` | — | カスタムの blur イベントハンドラ。RHF の内部ハンドラと共に実行される。 |
| `value` | `unknown` | — | 静的な値の割り当て。`useEffect` 内で使用する。 |
| `shouldUnregister` | `boolean` | `false` | `true` の場合、アンマウント時にフィールドを登録解除する。 |
| `deps` | `string \| string[]` | — | 依存フィールドのバリデーションをトリガーする。このフィールドが変更された時に指定フィールドも再検証される。 |

## 戻り値

| Name | Type | Description |
|------|------|-------------|
| `ref` | `React.Ref` | フックと DOM 要素を接続する React ref。 |
| `name` | `string` | 登録されたフィールド名。 |
| `onChange` | `ChangeHandler` | input の change イベントを処理するハンドラ。 |
| `onBlur` | `ChangeHandler` | input の blur イベントを処理するハンドラ。 |

## ネストフィールド記法

| 記法 | 送信結果 |
|------|----------|
| `register("firstName")` | `{ firstName: 'value' }` |
| `register("user.email")` | `{ user: { email: 'value' } }` |
| `register("items.0.title")` | `{ items: [{ title: 'value' }] }` |

## コード例

### 基本的な使い方

```tsx
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { firstName: "", email: "" },
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input {...register("firstName", { required: "名前は必須です" })} />
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <input
        {...register("email", {
          required: "メールは必須です",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "有効なメールアドレスを入力してください",
          },
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="submit" />
    </form>
  );
}
```

### カスタムバリデーション

```tsx
<input
  {...register("username", {
    validate: {
      checkLength: (value) =>
        value.length >= 3 || "ユーザー名は3文字以上必要です",
      checkFormat: (value) =>
        /^[a-zA-Z0-9]+$/.test(value) || "英数字のみ使用可能です",
    },
  })}
/>
```

### 非同期バリデーション

```tsx
<input
  {...register("email", {
    validate: async (value) => {
      const response = await fetch(`/api/check-email?email=${value}`);
      const { available } = await response.json();
      return available || "このメールアドレスは既に使用されています";
    },
  })}
/>
```

### 値の変換

```tsx
<input
  type="number"
  {...register("age", { valueAsNumber: true, min: 18 })}
/>

<input
  {...register("price", {
    setValueAs: (v) => parseInt(v, 10),
  })}
/>
```

### 依存フィールド

```tsx
<input {...register("password")} type="password" />
<input
  {...register("confirmPassword", {
    deps: ["password"],
    validate: (value, formValues) =>
      value === formValues.password || "パスワードが一致しません",
  })}
  type="password"
/>
```

## 重要なルール / 注意事項

- フィールド名は一意でなければならず、数字で始めることはできない。
- ネストフィールドにはドット記法を使用する（ブラケット記法ではなく）。
- `disabled` な入力のフォームデータ値は `undefined` になる。
- 個別のオプションを削除することはできない。`false` に更新する必要がある。
- 予約語 `ref`、`_f` をフィールド名として使用しないこと。
- `valueAsNumber`、`valueAsDate`、`setValueAs` は互いに排他的。
