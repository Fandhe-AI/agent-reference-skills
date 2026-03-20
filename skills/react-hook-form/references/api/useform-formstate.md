# useForm — formState

`formState` はフォーム全体の状態情報を格納するオブジェクトで、ユーザーの操作状況やバリデーション結果を追跡する。パフォーマンス最適化のため Proxy でラップされている。

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `isDirty` | `boolean` | いずれかの入力が `defaultValues` から変更されたかどうか。`defaultValues` の提供が前提。 |
| `dirtyFields` | `object` | 変更された個別フィールドを追跡するオブジェクト。`defaultValues` との比較結果。 |
| `touchedFields` | `object` | ユーザーが操作した（フォーカス→ブラー）全フィールドを記録するオブジェクト。 |
| `defaultValues` | `object` | `useForm` の `defaultValues` または `reset` で設定された初期値。 |
| `isSubmitted` | `boolean` | フォームが送信された後 `true` になる。`reset` が呼ばれるまで維持される。 |
| `isSubmitSuccessful` | `boolean` | ランタイムエラーなしに送信が成功した場合 `true`。 |
| `isSubmitting` | `boolean` | フォーム送信中は `true`。非同期 `onSubmit` の完了を追跡可能。 |
| `isLoading` | `boolean` | 非同期 `defaultValues` の読み込み中に `true`。非同期デフォルト値のみ対象。 |
| `submitCount` | `number` | フォーム送信の試行回数。 |
| `isValid` | `boolean` | バリデーションエラーがない場合 `true`。`mode` の設定に依存して初回評価タイミングが異なる。 |
| `isValidating` | `boolean` | バリデーション実行中に `true`。 |
| `validatingFields` | `object` | 非同期バリデーション中のフィールドを特定するオブジェクト。 |
| `errors` | `object` | フィールドごとのエラーメッセージを格納するオブジェクト。 |
| `disabled` | `boolean` | `useForm` の `disabled` オプションの状態を反映。 |
| `isReady` | `boolean` | サブスクリプションの初期化が完了したかどうか。 |

## Proxy による購読の仕組み

`formState` は JavaScript の `Proxy` でラップされており、実際にアクセスされたプロパティのみが購読される。これにより、未使用のプロパティの変更では再レンダリングが発生しない。

### 正しい使い方

```tsx
// レンダリング前にプロパティをデストラクチャリングする
const { isDirty, errors } = formState;

// または直接アクセスする
return <p>{formState.errors.name?.message}</p>;
```

### 誤った使い方

```tsx
// 条件付きアクセスは購読が登録されない可能性がある
if (someCondition) {
  formState.isDirty; // 購読が不安定
}
```

## コード例

### 基本的な使い方

```tsx
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isDirty,
      isSubmitting,
      isValid,
      touchedFields,
      dirtyFields,
    },
  } = useForm({
    mode: "onChange",
    defaultValues: { firstName: "", email: "" },
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input {...register("firstName", { required: true })} />
      {errors.firstName && <span>必須フィールドです</span>}

      <button type="submit" disabled={!isDirty || !isValid || isSubmitting}>
        送信
      </button>
    </form>
  );
}
```

### useEffect での使用

```tsx
// formState 全体を依存配列に含める
const { formState } = useForm();

useEffect(() => {
  if (formState.isSubmitSuccessful) {
    reset();
  }
}, [formState, reset]);
```

## 重要なルール / 注意事項

- Proxy が機能するには、レンダリング前にプロパティにアクセスまたはデストラクチャリングする必要がある。
- `useEffect` の依存配列には `formState` 全体を含めること。個別プロパティではなく全体を指定する。
- 論理演算子で条件付きにアクセスすると、Proxy の購読が正しく動作しない場合がある。値はデストラクチャリングで取り出すこと。
- `isDirty` を正確に機能させるには、`useForm` で全入力の `defaultValues` を提供する必要がある。
- ファイル入力はアプリケーションレベルで管理する必要がある。
- カスタムオブジェクトや `File` インスタンスは dirty 追跡に対応していない。
