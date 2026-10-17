---
name: react-hook-form
description: >
  React Hook Form v7 (RHF、非制御フォームライブラリ) リファレンス。別名 rhf / React-Hook-Form。
  useForm, register, handleSubmit, watch, setValue, getValues, getErrors, reset、
  Controller, useFieldArray / FieldArray, formState / FormState, ErrorMessage、
  resolver (Zod / Yup / Joi)、バリデーション、Server Actions / useActionState、
  DevTools (@hookform/devtools)、TypeScript 型。
user-invocable: false
model: sonnet
---

# React Hook Form v7 リファレンス

React Hook Form v7 の全 API ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## 対象バージョン

- ライブラリ: react-hook-form v7.90.0（GitHub Releases の latest stable、2026-10-10 公開。v8.0.0-beta.4 は prerelease のため対象外）
- ドキュメント原本: GitHub `react-hook-form/documentation` の master commit `2ab1b24db1292116df5f5611253017a5eafd4833`（現行リリースタグは v1〜v3 のみのため commit pin）、2026-10-16 取得
- 参照先: https://react-hook-form.com（`/docs/...`、`/get-started`、`/ts`、`/advanced-usage`、`/dev-tools`）
- `ErrorMessage` は v7.88 から本体内蔵。`FormState`（旧 `FormStateSubscribe`）のファイル名は `formstatesubscribe.md` を維持

## ディレクトリ構成

```text
skills/react-hook-form/
  SKILL.md
  references/
    get-started/
      README.md
      installation.md
      register-fields.md
      apply-validation.md
      integrating-existing-form.md
      ui-libraries.md
      controlled-inputs.md
      global-state.md
      handle-errors.md
      integrating-services.md
      schema-validation.md
      react-native.md
      typescript-quickstart.md
      design-philosophy.md
    api/
      README.md
      useform.md
      usecontroller.md
      useformcontext.md
      usewatch.md
      useformstate.md
      usefieldarray.md
      uselens.md
      createformcontrol.md
      useform-register.md
      useform-unregister.md
      useform-formstate.md
      useform-watch.md
      useform-subscribe.md
      useform-handlesubmit.md
      useform-reset.md
      useform-resetfield.md
      useform-resetdefaultvalues.md
      useform-seterror.md
      useform-clearerrors.md
      useform-setvalue.md
      useform-setvalues.md
      useform-setfocus.md
      useform-getvalues.md
      useform-geterrors.md
      useform-getfieldstate.md
      useform-trigger.md
      useform-control.md
      useform-form.md
      controller.md
      formprovider.md
      watch-component.md
      fieldarray-component.md
      errormessage.md
      formstatesubscribe.md
    typescript/
      README.md
      resolver.md
      submit-handler.md
      control.md
      use-form-return-props.md
      use-form-method-types.md
      component-props-types.md
      field-array-types.md
      controller-types.md
      error-types.md
      field-path-types.md
      mode-register-options.md
      form-state-types.md
      opaque-types.md
      nested-value.md
    advanced/
      README.md
      accessibility.md
      wizard-form.md
      smart-form-component.md
      error-messages.md
      connect-form.md
      formprovider-performance.md
      controlled-mixed-uncontrolled.md
      custom-hook-resolver.md
      virtualized-lists.md
      testing-form.md
      transform-and-parse.md
      server-actions.md
      registering-opaque-types.md
    faqs/
      README.md
      faqs.md
    dev-tools/
      README.md
      devtools.md
  samples/
    README.md
    basic-form.md
    schema-validation.md
    controlled-component.md
    field-array.md
    form-provider.md
    async-submit.md
    watch-conditional-fields.md
    reset-after-submit.md
    typescript-typed-form.md
  scripts/
    README.md
    install.md
    develop.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| インストール、基本的なフォーム作成、バリデーションルール、スキーマ統合、React Native、UI ライブラリ統合 | get-started | [references/get-started/README.md](references/get-started/README.md) |
| useForm, register, handleSubmit, reset, watch, setValue, getValues, getErrors | api | [references/api/README.md](references/api/README.md) |
| Controller, useController, FormProvider, useFormContext | api | [references/api/README.md](references/api/README.md) |
| useFieldArray / FieldArray (動的フィールド)、useLens、createFormControl | api | [references/api/README.md](references/api/README.md) |
| useWatch, useFormState, subscribe, formState, FormState (旧 FormStateSubscribe) | api | [references/api/README.md](references/api/README.md) |
| ErrorMessage (v7.88 から本体内蔵) でエラー表示 | api | [references/api/README.md](references/api/README.md) |
| 型定義、ジェネリクス、Resolver / SubmitHandler / UseFormReturn / FieldErrors / RegisterOptions / OpaqueTypes、FieldPath | typescript | [references/typescript/README.md](references/typescript/README.md) |
| Server Actions / useActionState、Smart Form、Connect Form、FormProvider のパフォーマンス、Transform and Parse | advanced | [references/advanced/README.md](references/advanced/README.md) |
| アクセシビリティ、ウィザードフォーム、テスト、仮想リスト | advanced | [references/advanced/README.md](references/advanced/README.md) |
| パフォーマンス、クラスコンポーネント、watch vs getValues、条件付きレンダリング | faqs | [references/faqs/README.md](references/faqs/README.md) |
| DevTools のインストール・デバッグ | dev-tools | [references/dev-tools/README.md](references/dev-tools/README.md) |
| 典型的な使い方を知りたい、実装例を参照したい | samples | [samples/README.md](samples/README.md) |
| インストール・開発環境セットアップのコマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
