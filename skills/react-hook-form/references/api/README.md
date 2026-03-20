# React Hook Form — API

## Hooks

| Name | Description | Path |
|------|-------------|------|
| `useForm` | フォーム管理の中心フック。バリデーション戦略、デフォルト値、resolver 等を設定 | [./useform.md](./useform.md) |
| `useController` | 制御コンポーネント向けフック。外部 UI ライブラリとの統合に使用 | [./usecontroller.md](./usecontroller.md) |
| `useFormContext` | `FormProvider` 経由でフォームメソッドにアクセスするフック | [./useformcontext.md](./useformcontext.md) |
| `useWatch` | 特定フィールドの変更を購読し、コンポーネントレベルで再レンダリングを分離 | [./usewatch.md](./usewatch.md) |
| `useFormState` | フォーム状態の変更を購読し、再レンダリングを分離 | [./useformstate.md](./useformstate.md) |
| `useFieldArray` | 動的フィールド配列の操作（追加・削除・並べ替え等） | [./usefieldarray.md](./usefieldarray.md) |
| `useLens` | 型安全なレンズでネストされたフォーム構造を操作（`@hookform/lenses`） | [./uselens.md](./uselens.md) |

## Functions

| Name | Description | Path |
|------|-------------|------|
| `createFormControl` | React Context なしでフォーム状態を作成・購読する関数 | [./createformcontrol.md](./createformcontrol.md) |

## useForm メソッド

| Name | Description | Path |
|------|-------------|------|
| `register` | 入力フィールドを登録しバリデーションルールを適用 | [./useform-register.md](./useform-register.md) |
| `unregister` | 入力フィールドの登録を解除 | [./useform-unregister.md](./useform-unregister.md) |
| `formState` | フォーム状態オブジェクト（isDirty, errors, isValid 等） | [./useform-formstate.md](./useform-formstate.md) |
| `watch` | 指定フィールドの値を監視し再レンダリングをトリガー | [./useform-watch.md](./useform-watch.md) |
| `subscribe` | フォーム状態の変更を再レンダリングなしで購読 | [./useform-subscribe.md](./useform-subscribe.md) |
| `handleSubmit` | フォームバリデーション成功時にデータを受け取る関数 | [./useform-handlesubmit.md](./useform-handlesubmit.md) |
| `reset` | フォーム全体の状態・値をリセット | [./useform-reset.md](./useform-reset.md) |
| `resetField` | 個別フィールドの状態・値をリセット | [./useform-resetfield.md](./useform-resetfield.md) |
| `setError` | 手動でフィールドエラーを設定 | [./useform-seterror.md](./useform-seterror.md) |
| `clearErrors` | フォームのエラーを手動でクリア | [./useform-clearerrors.md](./useform-clearerrors.md) |
| `setValue` | 登録済みフィールドの値を動的に更新 | [./useform-setvalue.md](./useform-setvalue.md) |
| `setFocus` | プログラム的に入力フィールドにフォーカス | [./useform-setfocus.md](./useform-setfocus.md) |
| `getValues` | フォーム値を再レンダリングなしで取得 | [./useform-getvalues.md](./useform-getvalues.md) |
| `getFieldState` | 個別フィールドの状態（isDirty, isTouched, error）を取得 | [./useform-getfieldstate.md](./useform-getfieldstate.md) |
| `trigger` | バリデーションを手動でトリガー | [./useform-trigger.md](./useform-trigger.md) |
| `control` | Controller や useWatch 等に渡す内部制御オブジェクト | [./useform-control.md](./useform-control.md) |
| `Form` | フォーム送信を処理するコンポーネント（Beta） | [./useform-form.md](./useform-form.md) |

## Components

| Name | Description | Path |
|------|-------------|------|
| `Controller` | 制御コンポーネントのラッパー。render prop で UI ライブラリと統合 | [./controller.md](./controller.md) |
| `FormProvider` | `useFormContext` で使用するコンテキストプロバイダー | [./formprovider.md](./formprovider.md) |
| `Watch` | `useWatch` のコンポーネント版。JSX 内で宣言的に値を監視 | [./watch-component.md](./watch-component.md) |
| `ErrorMessage` | フィールドのエラーメッセージを表示（`@hookform/error-message`） | [./errormessage.md](./errormessage.md) |
| `FormStateSubscribe` | `useFormState` のコンポーネント版。JSX 内で状態を購読 | [./formstatesubscribe.md](./formstatesubscribe.md) |
