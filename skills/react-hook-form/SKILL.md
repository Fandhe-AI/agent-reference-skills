---
name: react-hook-form
description: >
  React Hook Form v7 (RHF、非制御フォームライブラリ) リファレンス。
  別名: rhf, React-Hook-Form。
  useForm, register, handleSubmit, watch, setValue, getValues, reset、
  Controller (制御コンポーネント連携)、useFieldArray (動的フィールド)、
  バリデーション、resolver (Zod / Yup / Joi 連携)、エラーメッセージ、formState。
user-invocable: false
model: sonnet
---

# React Hook Form v7 リファレンス

React Hook Form v7 の全 API ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/react-hook-form/
  SKILL.md
  references/
    get-started/
      README.md
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
      useform-getfieldstate.md
      useform-trigger.md
      useform-control.md
      useform-form.md
      controller.md
      formprovider.md
      watch-component.md
      errormessage.md
      formstatesubscribe.md
    typescript/
      README.md
    advanced/
      README.md
    faqs/
      README.md
    dev-tools/
      README.md
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
| インストール、基本的なフォーム作成、バリデーションルール、スキーマ統合 | get-started | [references/get-started/README.md](references/get-started/README.md) |
| useForm, register, handleSubmit, reset, watch, setValue, getValues | api | [references/api/README.md](references/api/README.md) |
| Controller, useController, FormProvider, useFormContext | api | [references/api/README.md](references/api/README.md) |
| useFieldArray (動的フィールド)、useLens、createFormControl | api | [references/api/README.md](references/api/README.md) |
| useWatch, useFormState, subscribe, formState | api | [references/api/README.md](references/api/README.md) |
| 型定義、ジェネリクス、FieldPath, Resolver 型 | typescript | [references/typescript/README.md](references/typescript/README.md) |
| アクセシビリティ、ウィザードフォーム、テスト、仮想リスト | advanced | [references/advanced/README.md](references/advanced/README.md) |
| パフォーマンス、クラスコンポーネント、watch vs getValues、条件付きレンダリング | faqs | [references/faqs/README.md](references/faqs/README.md) |
| DevTools のインストール・デバッグ | dev-tools | [references/dev-tools/README.md](references/dev-tools/README.md) |
| 典型的な使い方を知りたい、実装例を参照したい | samples | [samples/README.md](samples/README.md) |
| インストール・開発環境セットアップのコマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
