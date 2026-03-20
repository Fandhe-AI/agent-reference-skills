# Controller

制御コンポーネント（React-Select、AntD、MUI など）をラップするためのコンポーネント。`useController` のコンポーネント版であり、render prop パターンでフィールドのバインディングを提供する。

## シグネチャ

```tsx
<Controller
  name={string}          // 必須
  control={Control}
  render={Function}      // 必須
  rules={Object}
  defaultValue={unknown}
  disabled={boolean}
  shouldUnregister={boolean}
  exact={boolean}
/>
```

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `name` | `FieldPath` | はい | - | フィールドの一意な名前 |
| `control` | `Control` | いいえ | - | `useForm` の制御オブジェクト。`FormProvider` 使用時は省略可 |
| `render` | `Function` | はい | - | React 要素を返す render 関数。`field`, `fieldState`, `formState` を引数に受け取る |
| `rules` | `Object` | いいえ | - | バリデーションルール（`required`, `min`, `max`, `minLength`, `maxLength`, `pattern`, `validate`） |
| `defaultValue` | `unknown` | いいえ | - | フィールドのデフォルト値。`undefined` は不可 |
| `disabled` | `boolean` | いいえ | `false` | 入力を無効化する。送信データから値が除外される |
| `shouldUnregister` | `boolean` | いいえ | `false` | アンマウント時にフィールドを登録解除する。`useFieldArray` との併用は避ける |
| `exact` | `boolean` | いいえ | `false` | フィールド名の購読で完全一致を有効にする |

## render 関数の引数

### field オブジェクト

| Name | Type | Description |
|------|------|-------------|
| `onChange` | `(value: any) => void` | 値をフォーム状態に送信する。値に `undefined` は使用不可 |
| `onBlur` | `() => void` | インタラクション/タッチイベントを報告する |
| `value` | `unknown` | 制御コンポーネントの現在の値 |
| `disabled` | `boolean` | 入力の無効状態 |
| `name` | `string` | 登録されたフィールド名 |
| `ref` | `React.Ref` | エラー時のフォーカス管理用リファレンス |

### fieldState オブジェクト

| Name | Type | Description |
|------|------|-------------|
| `invalid` | `boolean` | バリデーションの状態 |
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
| `errors` | `object` | フィールドエラーメッセージ |

## コード例

### Web（React）での使用

```tsx
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";

function App() {
  const { handleSubmit, control } = useForm({
    defaultValues: { dateField: new Date() },
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Controller
        control={control}
        name="dateField"
        render={({ field: { onChange, onBlur, value } }) => (
          <ReactDatePicker
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
          />
        )}
      />
      <button type="submit">送信</button>
    </form>
  );
}
```

### React Native での使用

```tsx
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, View } from "react-native";

function App() {
  const { handleSubmit, control } = useForm({
    defaultValues: { firstName: "" },
  });

  return (
    <View>
      <Controller
        control={control}
        name="firstName"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <Button title="送信" onPress={handleSubmit(console.log)} />
    </View>
  );
}
```

### バリデーション付き

```tsx
<Controller
  control={control}
  name="email"
  rules={{
    required: "メールアドレスは必須です",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "有効なメールアドレスを入力してください",
    },
  }}
  render={({ field, fieldState: { error } }) => (
    <div>
      <input {...field} />
      {error && <span>{error.message}</span>}
    </div>
  )}
/>
```

## 重要なルール

1. **二重登録の禁止**: Controller と `register()` を同じフィールドに使用しないこと。Controller が内部でフィールド登録を行う。
2. **値のクリアには `null` か空文字を使用**: `onChange` に `undefined` を渡してはならない。値をクリアする場合は `null` または `""` を使用する。
3. **defaultValues の設定**: `useForm` の `defaultValues` でデフォルト値を一元管理することを推奨。dirty 状態の比較基準となる。
4. **shouldUnregister と useFieldArray**: `shouldUnregister` を `useFieldArray` と併用すると予期しない動作になるため避けること。
