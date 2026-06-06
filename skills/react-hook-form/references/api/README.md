# API

| Name | Description | Path |
|------|-------------|------|
| Controller | 制御コンポーネント（React-Select、AntD、MUI など）をラップするためのコンポーネント。 | [controller.md](./controller.md) |
| createFormControl | React Context を使わずにフォーム状態を作成する関数。 | [createformcontrol.md](./createformcontrol.md) |
| ErrorMessage | React Hook Form のエラーメッセージを表示するためのコンポーネント。 | [errormessage.md](./errormessage.md) |
| FormProvider | `useForm` の全メソッドを React Context 経由で子コンポーネントに配信するプロバイダーコンポーネント。 | [formprovider.md](./formprovider.md) |
| FormStateSubscribe | `useFormState` フックのコンポーネント版。 | [formstatesubscribe.md](./formstatesubscribe.md) |
| useController | 制御コンポーネント（React-Select、AntD、MUI など）を React Hook Form と統合するためのカスタムフック。 | [usecontroller.md](./usecontroller.md) |
| useFieldArray | 動的なフォームフィールド（追加・削除・並べ替え）を管理するためのカスタムフック。 | [usefieldarray.md](./usefieldarray.md) |
| useForm | useForm は React Hook Form の中核となるカスタムフックで、フォーム全体の管理を担う。 | [useform.md](./useform.md) |
| useForm — clearErrors | clearErrors メソッドはフォームのエラーをクリアする。 | [useform-clearerrors.md](./useform-clearerrors.md) |
| useForm — control | control はフォームの内部制御を管理するオブジェクトで、Controller、useWatch、useFormState、useFieldArray などのコンポーネントやフックに渡して使用する。 | [useform-control.md](./useform-control.md) |
| useForm — Form | Form コンポーネント（Beta）はフォーム送信を管理するラッパーコンポーネントで、標準の HTML form 要素と密接に連携する。 | [useform-form.md](./useform-form.md) |
| useForm — formState | formState はフォーム全体の状態情報を格納するオブジェクトで、ユーザーの操作状況やバリデーション結果を追跡する。 | [useform-formstate.md](./useform-formstate.md) |
| useForm — getFieldState | getFieldState メソッドは個別フィールドの状態（dirty, touched, エラー）を取得する。 | [useform-getfieldstate.md](./useform-getfieldstate.md) |
| useForm — getValues | getValues メソッドはフォームの値を取得する。 | [useform-getvalues.md](./useform-getvalues.md) |
| useForm — handleSubmit | handleSubmit メソッドはフォーム送信を処理する。 | [useform-handlesubmit.md](./useform-handlesubmit.md) |
| useForm — register | register メソッドは input 要素をフォームに登録し、バリデーションルールを適用する。 | [useform-register.md](./useform-register.md) |
| useForm — reset | reset メソッドはフォーム全体の状態（値、エラー、dirty 状態など）をリセットする。 | [useform-reset.md](./useform-reset.md) |
| useForm — resetDefaultValues | resetDefaultValues メソッドはフォームのデフォルト値を更新し、それに伴い dirty/valid 状態を再計算する。 | [useform-resetdefaultvalues.md](./useform-resetdefaultvalues.md) |
| useForm — resetField | resetField メソッドは個別のフィールドの状態と値をリセットする。 | [useform-resetfield.md](./useform-resetfield.md) |
| useForm — setError | setError メソッドはフィールドに手動でエラーを設定する。 | [useform-seterror.md](./useform-seterror.md) |
| useForm — setFocus | setFocus メソッドは登録済みの input フィールドにプログラム的にフォーカスを設定する。 | [useform-setfocus.md](./useform-setfocus.md) |
| useForm — setValue | setValue メソッドは登録済みフィールドの値をプログラム的に設定する。 | [useform-setvalue.md](./useform-setvalue.md) |
| useForm — setValues | setValues メソッドは複数のフォームフィールドの値を一括で更新する。 | [useform-setvalues.md](./useform-setvalues.md) |
| useForm — subscribe | subscribe メソッドは、コンポーネントの再レンダリングなしにフォーム状態の変更を購読する。 | [useform-subscribe.md](./useform-subscribe.md) |
| useForm — trigger | trigger メソッドはバリデーションを手動で実行する。 | [useform-trigger.md](./useform-trigger.md) |
| useForm — unregister | unregister メソッドは、登録済みの input フィールドの登録を解除し、対応するバリデーションルールと値を削除する。 | [useform-unregister.md](./useform-unregister.md) |
| useForm — watch | `watch` メソッドは指定したフィールドの値の変更を監視し、条件付きレンダリングや値の表示に使用する。 | [useform-watch.md](./useform-watch.md) |
| useFormContext | 深くネストされたコンポーネント構造で、props のバケツリレー（prop drilling）を避けるためのカスタムフック。 | [useformcontext.md](./useformcontext.md) |
| useFormState | フォーム状態を購読するためのカスタムフック。 | [useformstate.md](./useformstate.md) |
| useLens | 型安全にネストされたフォームデータを操作するためのレンズ（Lens）パターンのフック。 | [uselens.md](./uselens.md) |
| useWatch | フォームフィールドの値を購読し、変更を検知するためのカスタムフック。 | [usewatch.md](./usewatch.md) |
| Watch | `useWatch` フックのコンポーネント版。 | [watch-component.md](./watch-component.md) |
