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

カテゴリ直下の `README.md` はカテゴリ名の H1 見出しと索引表のみで構成する。新たに作る README には前置きの説明文を書かない。`samples/` `scripts/` 直下の README.md も同じ書式に従う。

```markdown
# <category>

| Name | Description | Path |
| --- | --- | --- |
| functionName | One-line description in source language | [functionName.md](./functionName.md) |
```

- Path のリンクは README.md と同じディレクトリ内の相対パス（`./<file>.md`）にする。`samples/<file>` `scripts/<file>` のようにディレクトリ名を重ねない
- 例外として、`references/` 配下でページを子ディレクトリに分けた階層型カテゴリ（`gcp-*` の `references/rest/<api>/`、`storybook` の `references/api/`、`nvidia-cuda` の `references/cutlass/` 等）では、どの階層の README でも、Path に (1) 同じディレクトリの個別ページ `./<file>.md`、(2) 直下の子ディレクトリの索引 `./<subdir>/README.md`、(3) 直下の子ディレクトリのページ `./<subdir>/<file>.md`（子ディレクトリに README を置かず親で集約する形。`chakra-ui` の `references/components/` 等） を置いてよく、1 つの表に混在してよい。子ディレクトリに README があるときは (2) で指すのを基本とし、README が無い子ディレクトリのページは親の README から (3) で指す。子ディレクトリの README も同じ書式に従う。孫以下のディレクトリのページを直接指さない。`samples/` `scripts/` の README には適用しない
- Path セルのリンクは 1 行に 1 つにする。個別ページと子索引の両方を載せるときは行を分ける

### 索引表と適合行の定義

reference-linter・skill-structure-validator・readme-indexer はこの定義を共通に使う。

- **索引表**: `| Name | Description | Path |` のヘッダー行と、空行を挟まない次の行の 3 列の区切り行（`| --- | --- | --- |` 等。ダッシュ数や前後の空白の差異は問わない）と、それに続く `|` で始まる行のまとまり。ヘッダー行の次の行が区切り行でないもの（区切り行が無い、または空行を挟む）は GFM で表にならないため、索引表として成立しない（書式違反）。ヘッダーが `| Name | Description | Path |` でない表（補足の表や旧書式の索引）は索引表ではない
- **列の分割**: 行は GitHub Flavored Markdown の規則で列に分ける。エスケープしていない `|` は、バッククォートの中でも列を分ける。セル内の `|` は `\|` と書く
- **適合行**: 成立した索引表のデータ行で、次をすべて満たすもの
  1. 3 列である
  2. Path セルにリンクがちょうど 1 つある
  3. リンク先が `./` で始まり、検査中の README 自身（`./README.md`）ではない（`./<file>.md#<anchor>` のようにアンカーが付いてもよく、判定はアンカーを除いたパスで行う）
  4. リンク先が同じディレクトリのページ `./<file>.md` なら、表示名が `<file>.md`（`[<file>.md](./<file>.md)`）。`references/` 配下の README で直下の子ディレクトリを指す行（`./<subdir>/README.md`・`./<subdir>/<file>.md`）は表示名を問わない（`[doc-blocks/](./doc-blocks/README.md)` のような既存の表記も可）。それ以外のリンク先（孫以下、ディレクトリ外、`samples/` `scripts/` の README から子ディレクトリ）は適合しない
- リンク切れの確認は、適合行かどうかにかかわらず、索引表のすべての行の相対リンクに行う。索引の網羅性（ページが索引に載っているか）は、適合行のリンク先だけで判定する

### 既存 README の扱い

- H1 と索引表 1 つだけの README は、readme-indexer がページから再生成する（Name・Description はページから抽出し直す。既存の子索引の行の Description と表示名は引き継ぐ）
- それ以外の README（前置きの説明文、`##` 節ごとの複数の索引表、`syncpack` の `update-groups/README.md` の共通プロパティ表のような補足の節、`anthropic-*` / `openai-*` の README レベル距離線、旧書式の索引を持つもの）は手で保守する。これらの内容は削除しない。readme-indexer は書き込まずに差分（載っていないページ・リンク切れの行・適合しない行）を報告し、呼び出し元がその報告に従って README を直接編集する

## 関連

- `.claude/rules/skill-anatomy.md`
- `.claude/rules/japanese-style.md`
