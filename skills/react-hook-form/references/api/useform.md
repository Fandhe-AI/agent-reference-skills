# useForm

`useForm` は React Hook Form の中核となるカスタムフックで、フォーム全体の管理を担う。オプションを受け取り、フォーム操作用のメソッド群を返す。

## シグネチャ

```typescript
useForm<TFieldValues extends FieldValues = FieldValues>(
  props?: UseFormProps<TFieldValues>
): UseFormReturn<TFieldValues>
```

## オプション

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'onSubmit' \| 'onBlur' \| 'onChange' \| 'onTouched' \| 'all'` | `'onSubmit'` | バリデーション実行タイミングの戦略。`onSubmit`: 送信時のみ。`onBlur`: blur イベント時。`onChange`: change イベント毎（パフォーマンスに注意）。`onTouched`: 初回 blur 後は change 毎。`all`: blur と change の両方。 |
| `reValidateMode` | `'onChange' \| 'onBlur' \| 'onSubmit'` | `'onChange'` | 送信後の再バリデーション戦略。`mode` が `onSubmit` の場合に特に有効。 |
| `defaultValues` | `FieldValues \| () => Promise<FieldValues>` | `{}` | フォームのデフォルト値。非同期関数も指定可能。キャッシュされるため、リセットには `reset` API を使用する。`undefined` は避け、各フィールドに適切なデフォルト値を指定すること。 |
| `values` | `FieldValues` | — | 外部ソースからリアクティブにフォーム値を更新する。外部の状態管理やサーバーデータとの連携に使用。 |
| `errors` | `FieldErrors` | — | サーバーから返されたエラーでフォームを更新する。 |
| `resetOptions` | `KeepStateOptions` | — | `values` や `defaultValues` が更新された際の状態保持動作を設定する。 |
| `resolver` | `Resolver` | — | 外部スキーマバリデーションライブラリ（Yup, Zod, Joi, Vest, Ajv など）との統合用。`values` と `errors` プロパティを持つオブジェクトを返す必要がある。 |
| `context` | `object` | — | `resolver` に注入されるコンテキストオブジェクト。バリデーション時に追加情報を渡す場合に使用。 |
| `shouldFocusError` | `boolean` | `true` | バリデーションエラー発生時に最初のエラーフィールドに自動フォーカスするかどうか。 |
| `shouldUnregister` | `boolean` | `false` | `true` にするとアンマウント時にフィールドを自動登録解除し、ネイティブフォームに近い動作になる。値は input 自体に保持される。 |
| `shouldUseNativeValidation` | `boolean` | `false` | ブラウザのネイティブ制約バリデーション API を使用する。`true` の場合、ブラウザ標準のエラーメッセージが表示される。 |
| `progressive` | `boolean` | `false` | SSR フレームワークでのプログレッシブエンハンスメントを有効にする。 |
| `delayError` | `number` | — | エラー表示を遅延させるミリ秒数。ユーザーが入力中にエラーが即座に表示されるのを防ぐ。 |
| `disabled` | `boolean` | `false` | フォーム全体と全入力フィールドを無効にする。 |
| `criteriaMode` | `'firstError' \| 'all'` | `'firstError'` | エラーレポートの制御。`firstError`: 各フィールド最初のエラーのみ。`all`: 全エラーを収集（`types` オブジェクトで取得）。 |

## 戻り値

| Name | Type | Description |
|------|------|-------------|
| `register` | `Function` | input 要素をフォームに登録する |
| `unregister` | `Function` | input の登録を解除する |
| `formState` | `Object` | フォーム全体の状態（dirty, errors, isValid など） |
| `watch` | `Function` | フィールド値の変更を監視する |
| `handleSubmit` | `Function` | フォーム送信を処理する |
| `reset` | `Function` | フォーム全体をリセットする |
| `resetField` | `Function` | 個別フィールドをリセットする |
| `setError` | `Function` | エラーを手動で設定する |
| `clearErrors` | `Function` | エラーをクリアする |
| `setValue` | `Function` | フィールド値をプログラム的に設定する |
| `setFocus` | `Function` | 特定フィールドにフォーカスする |
| `getValues` | `Function` | フォーム値を取得する（再レンダリングなし） |
| `getFieldState` | `Function` | 個別フィールドの状態を取得する |
| `trigger` | `Function` | バリデーションを手動で実行する |
| `control` | `Object` | Controller や useWatch に渡す制御オブジェクト |
| `Form` | `Component` | フォーム送信を管理するコンポーネント（Beta） |
| `subscribe` | `Function` | 再レンダリングなしでフォーム状態を購読する |

## コード例

```tsx
import { useForm } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true })} />
      {errors.firstName && <span>名前は必須です</span>}

      <input {...register("email", { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
      {errors.email && <span>有効なメールアドレスを入力してください</span>}

      <input type="submit" />
    </form>
  );
}
```

### 非同期デフォルト値

```tsx
const { register, handleSubmit } = useForm({
  defaultValues: async () => {
    const response = await fetch("/api/user");
    return await response.json();
  },
});
```

### resolver（Zod）

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "名前は必須です"),
  age: z.number().min(18, "18歳以上である必要があります"),
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

## 重要なルール / 注意事項

- `defaultValues` に `undefined` を含めないこと。コントロールドコンポーネントのデフォルトと競合する。
- `defaultValues` はキャッシュされる。リセットするには `reset` API を使用する。
- `shouldUnregister: true` の場合、`useEffect` でのフォーム値購読はできない。
- `resolver` は `{ values: {}, errors: {} }` の形式でオブジェクトを返す必要がある。
- `mode: 'onChange'` はパフォーマンスに影響するため、必要な場合のみ使用する。
