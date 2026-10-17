---
name: typescript
description: >
  TypeScript (tsc, 6.0 / 7.0 Go 製ネイティブ版) リファレンス。
  tsconfig.json compilerOptions, strict, moduleResolution, project references (tsc -b),
  generics, conditional / mapped / template literal types, utility types, narrowing,
  .d.ts, checkJs, ESM / CJS interop, --checkers / --builders。
user-invocable: false
---

# TypeScript

## 対象バージョン

- tsc 本体: TypeScript 7.0.2（npm latest、2026-07-08、Go 製ネイティブ移植）。原本は microsoft/typescript-go のタグ `typescript/v7.0.2` の `README.md` / `CHANGES.md` と公式ブログ announcing-typescript-7-0
- 言語・handbook・tsconfig リファレンス: TypeScript 6.0 記述（サイトは typescript@6.0.2 でビルド）。microsoft/TypeScript-Website の commit `04569788cf46f97e2f16356639bc9635c88c0a61`（v2 ブランチ、docs 用タグ無しのため SHA pin、取得日 2026-10-16）
- 型・エラーの挙動は 6.0 = 7.0（typescript-go README）
- 7.1（next、新 API）は未収録

## ディレクトリ構成

```text
skills/typescript/
  SKILL.md
  references/
    handbook/
      README.md
      basics.md
      everyday-types.md
      narrowing.md
      more-on-functions.md
      object-types.md
      classes.md
      modules.md
      type-declarations.md
      understanding-errors.md
    modules/
      README.md
      introduction.md
      theory.md
      module-syntax.md
      module-option.md
      module-resolution-option.md
      esm-cjs-interop.md
      choosing-compiler-options.md
    declaration-files/
      README.md
      introduction.md
      by-example.md
      library-structures.md
      dos-and-donts.md
      deep-dive.md
      consumption.md
      publishing.md
      templates.md
      template-global.md
      template-global-modifying-module.md
      template-global-plugin.md
      template-module.md
      template-module-class.md
      template-module-function.md
      template-module-plugin.md
    javascript/
      README.md
      intro-to-js-with-ts.md
      type-checking-javascript-files.md
      jsdoc-types.md
      jsdoc-classes.md
      jsdoc-documentation-and-other.md
      creating-dts-from-js.md
    project-config/
      README.md
      tsconfig-json.md
      compiler-options-cli.md
      compiler-options-in-msbuild.md
      configuring-watch.md
      integrating-with-build-tools.md
      project-references.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/<category>/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| 基本型・関数・クラス・オブジェクト型・narrowing を知りたい | handbook | [references/handbook/README.md](references/handbook/README.md) |
| ESM / CJS・module / moduleResolution の選び方を知りたい | modules | [references/modules/README.md](references/modules/README.md) |
| .d.ts の書き方・公開・型パッケージ利用を知りたい | declaration-files | [references/declaration-files/README.md](references/declaration-files/README.md) |
| JS ファイルの型検査・JSDoc 注釈・.d.ts 生成をしたい | javascript | [references/javascript/README.md](references/javascript/README.md) |
| tsconfig.json の構成・project references・watch・ビルドツール連携を設定したい | project-config | [references/project-config/README.md](references/project-config/README.md) |
