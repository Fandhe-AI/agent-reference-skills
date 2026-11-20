---
name: reference-template
description: 個別リファレンスページのテンプレート（Signature / Options / Notes / Related）と README 索引表の書式規約。
paths:
  - "skills/**/*.md"
---

# リファレンスファイル書式

個別リファレンスページと README 索引の書式規約。

## 個別ページの書式

```markdown
# Name

## Signature / Usage

\`\`\`ts
functionName(param: Type): ReturnType
\`\`\`

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| option | string | — | 説明 |

## Notes

- 重要な挙動・制約・バージョン差異

## Related

- [RelatedName](../other-category/related-page.md)
```

## 規約

- 空セクションは省略する（`## Notes` に書くことがなければ丸ごと削除）
- コード例は最小1つ必須。過剰に増やさない
- 本文はドキュメント原文の言語（通常英語）で書く。日本語は SKILL.md の description と探索ガイドのみ
- `## Related` のリンクは相対パスを使用する
- `## Options / Props` が存在する場合は必ず表形式。散文で書かない

## README 索引の書式

カテゴリ直下の `README.md` はカテゴリ名の H1 見出しと索引表のみで構成する。前置きの説明文は書かない。`samples/` `scripts/` 直下の README.md も同じ書式に従う。

```markdown
# <category>

| Name | Description | Path |
| --- | --- | --- |
| functionName | One-line description in source language | [functionName.md](./functionName.md) |
```

- Path のリンクは README.md と同じディレクトリ内の相対パス（`./<file>.md`）にする。`samples/<file>` `scripts/<file>` のようにディレクトリ名を重ねない
- 例外として、`references/` 配下でページを子ディレクトリに分けた階層型カテゴリ（`gcp-*` の `references/rest/<api>/`、`storybook` の `references/api/`、`nvidia-cuda` の `references/cutlass/` 等）では、どの階層の README でも、Path に (1) 同じディレクトリの個別ページ `./<file>.md`、(2) 直下の子ディレクトリの索引 `./<subdir>/README.md`、(3) 直下の子ディレクトリのページ `./<subdir>/<file>.md`（子ディレクトリに README を置かず親で集約する形。`chakra-ui` の `references/components/` 等） を置いてよく、1 つの表に混在してよい。子ディレクトリに README があるときは (2) で指すのを基本とし、README が無い子ディレクトリのページは親の README から (3) で指す。子ディレクトリの README も同じ書式（H1 と索引表のみ）に従う。孫以下のディレクトリのページを直接指さない。子索引の行はリンク先で判定し、表示名は問わない（`[doc-blocks/](./doc-blocks/README.md)` のような既存の表記も可）。`samples/` `scripts/` の README には適用しない
- Path セルのリンクは 1 行に 1 つにする。個別ページと子索引の両方を載せるときは行を分ける

## 関連

- `.claude/rules/skill-anatomy.md`
- `.claude/rules/japanese-style.md`
