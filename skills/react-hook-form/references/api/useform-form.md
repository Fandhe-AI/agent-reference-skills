# useForm — Form

`Form` コンポーネント（Beta）はフォーム送信を管理するラッパーコンポーネントで、標準の HTML `<form>` 要素と密接に連携する。デフォルトで POST リクエストを FormData で送信する。

## シグネチャ

```tsx
<Form
  control={control}
  action="/api/endpoint"
  onSubmit={onSubmitHandler}
  onSuccess={onSuccessHandler}
  onError={onErrorHandler}
  headers={headers}
  validateStatus={validateStatus}
  method="post"
  render={renderProp}
>
  {children}
</Form>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `control` | `Control` | — | `useForm` から取得した `control` オブジェクト。 |
| `children` | `React.ReactNode` | — | フォームの子要素。 |
| `render` | `({ submit }) => React.ReactNode` | — | ヘッドレスレンダリング用の render prop。React Native で使用。 |
| `onSubmit` | `({ formData, data, event }) => void` | — | バリデーション成功後に呼ばれるコールバック。`formData`、パース済み `data`、イベントを受け取る。 |
| `onSuccess` | `({ response }) => void` | — | サーバーレスポンスが成功した場合のコールバック。 |
| `onError` | `({ response }) => void` | — | リクエスト失敗時のコールバック。`root.server` エラーが自動的に設定される。 |
| `headers` | `Record<string, string>` | — | リクエストヘッダー。JSON 送信には `{ 'Content-Type': 'application/json' }` を指定。 |
| `validateStatus` | `(status: number) => boolean` | — | HTTP ステータスコードの成功/失敗判定関数。 |
| `action` | `string` | — | サーバーエンドポイントの URL。 |
| `method` | `string` | `'post'` | HTTP メソッド。 |
| `encType` | `string` | — | フォームのエンコーディングタイプ。 |

## コード例

### React Web — action prop での使用

```tsx
import { useForm, Form } from "react-hook-form";

function App() {
  const { register, control } = useForm({
    defaultValues: { name: "", email: "" },
  });

  return (
    <Form
      action="/api/submit"
      control={control}
      onSuccess={() => {
        alert("送信成功！");
      }}
      onError={() => {
        alert("送信に失敗しました");
      }}
    >
      <input {...register("name")} />
      <input {...register("email")} />
      <button type="submit">送信</button>
    </Form>
  );
}
```

### React Web — 手動送信

```tsx
import { useForm, Form } from "react-hook-form";

function App() {
  const { register, control } = useForm();

  return (
    <Form
      onSubmit={async ({ formData, data, event }) => {
        await fetch("/api/submit", {
          method: "POST",
          body: formData,
        });
      }}
    >
      <input {...register("name")} />
      <button type="submit">送信</button>
    </Form>
  );
}
```

### JSON での送信

```tsx
<Form
  action="/api/submit"
  control={control}
  headers={{
    "Content-Type": "application/json",
  }}
  onSuccess={() => console.log("成功")}
>
  <input {...register("name")} />
  <button type="submit">送信</button>
</Form>
```

### React Native での使用

```tsx
import { useForm, Form } from "react-hook-form";
import { View, TextInput, Button } from "react-native";

function App() {
  const { register, control } = useForm();

  return (
    <Form
      action="/api/submit"
      control={control}
      render={({ submit }) => (
        <View>
          <TextInput {...register("name")} />
          <Button title="送信" onPress={() => submit()} />
        </View>
      )}
    />
  );
}
```

### バリデーションステータスのカスタマイズ

```tsx
<Form
  action="/api/submit"
  control={control}
  validateStatus={(status) => status >= 200 && status < 300}
>
  ...
</Form>
```

## 重要なルール / 注意事項

- デフォルトでは POST メソッドで FormData として送信する。JSON で送信するには `headers` に `Content-Type: application/json` を指定する。
- `onSubmit` コールバックまたは `handleSubmit` を使用して、送信前にデータを加工または除外できる。
- プログレッシブエンハンスメントは SSR フレームワークでのみ機能し、`useForm` の `progressive: true` オプションが必要。
- Beta 機能であるため、API が変更される可能性がある。
- React Native では `render` prop を使用し、`submit` 関数を明示的に呼び出す。
- `onError` が呼ばれた場合、`root.server` エラーが自動的に `formState.errors` に設定される。
