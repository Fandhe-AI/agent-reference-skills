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

新たに作るカテゴリ直下の `README.md` はカテゴリ名の H1 見出しと索引表のみで構成し、前置きの説明文を書かない（既存の README の扱いは下記「既存 README の扱い」）。`samples/` `scripts/` 直下の README.md も同じ書式に従う。

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

- **索引表**: `| Name | Description | Path |` のヘッダー行と、空行を挟まない次の行の 3 列の区切り行（`| --- | --- | --- |` 等。ダッシュ数や前後の空白の差異は問わない）と、それに続く 1 行以上のデータ行（空行、または見出し・リスト・引用・コードフェンスなど別のブロックの始まりの直前までの行。GFM と同じく、`|` で始まらない行もデータ行に含める）のまとまり。ヘッダー行の次の行が区切り行でないもの（区切り行が無い、または空行を挟む）は GFM で表にならないため、索引表として成立しない（書式違反）。データ行が 1 行も無い表も書式違反とする。ヘッダーが `| Name | Description | Path |` でない表（補足の表）は索引表ではない
- **列の分割**: 行は GitHub Flavored Markdown の規則で列に分ける。エスケープしていない `|` は、バッククォートの中でも列を分ける。セル内の `|` は `\|` と書く
- **適合行**: 成立した索引表のデータ行で、次をすべて満たすもの
  1. `|` で始まり、3 列である
  2. Path セルにリンクがちょうど 1 つある
  3. リンク先が `./` で始まり、検査中の README 自身（`./README.md`）ではない（`./<file>.md#<anchor>` のようにアンカーが付いてもよく、判定はアンカーを除いたパスで行う）
  4. リンク先が同じディレクトリのページ `./<file>.md` なら、表示名が `<file>.md`（`[<file>.md](./<file>.md)`）。`references/` 配下の README で直下の子ディレクトリを指す行（`./<subdir>/README.md`・`./<subdir>/<file>.md`）は表示名を問わない（`[doc-blocks/](./doc-blocks/README.md)` のような既存の表記も可）。それ以外のリンク先（孫以下、ディレクトリ外、`samples/` `scripts/` の README から子ディレクトリ）は適合しない
- **リンク先の正規化**: ファイルの実在確認と網羅性の突合は、ファイルを指すリンク（`#notes` のようなフラグメントだけのリンク、`https:` `mailto:` などの URI スキーム付きのリンク、`/` で始まる絶対パスを除いたもの）だけを対象にし、リンク先から先頭の `./` と `#` 以降のフラグメントを除いたパスを使う（`./mathematical_functions.md#abs` は `mathematical_functions.md` として確かめる）。README に書くリンクはアンカーを含めて元のまま保つ
- リンク切れの確認は、索引表の行に限らず README の中のファイルを指すすべてのリンクに行う。索引の網羅性（ページが索引に載っているか）は、成立した索引表の適合行のリンク先だけで判定する

### 既存 README の扱い

- **再生成する README**: 次の両方を満たすもの。readme-indexer がページから再生成する（Name・Description はページから抽出し直す。既存の子索引の行の Description と表示名は引き継ぐ）
  - 下記の生成ツールが出力する README ではない
  - README が無い、または H1 と索引表 1 つだけ（データ行の無い表・表が無いものを含む）で、再生成で失われる行が無い。つまり、アンカー付きの行（`./<file>.md#<anchor>`）、同じページを指す行の重複、readme-indexer が載せない先（孫以下・ディレクトリ外、`samples/` `scripts/` の README から子ディレクトリ）を指すリンク、Name・Description のセルの中のリンク（再生成では引き継がれない）のいずれも無い（表示名・`./` の有無・列数・1 行のリンク数の違反は再生成で直るので妨げない）
- **手で保守する README**: 生成ツールが出力する README でも再生成する README でもない README（前置きの説明文、`##` 節ごとの複数の索引表、`syncpack` の `update-groups/README.md` の共通プロパティ表のような補足の節、`anthropic-*` / `openai-*` の README レベル距離線、関数ごとのアンカー付きの行などを持つもの）。readme-indexer は書き込まない。下記「更新する README の選び方」で対象になったときは、呼び出し元（main）が、変更したページ・子索引に合わせて該当する表の行を直接直す（行の追加・改名・削除と Name・Description の更新）。reference-linter と skill-structure-validator の指摘も、対象になったかどうかにかかわらず main がこの定義を満たすように直す。これは delegation.md の「README 索引表の再生成」には当たらない。既存の内容は削除しない
- **生成ツールが出力する README**: スキルの SKILL.md のディレクトリツリーで、そのカテゴリまたは祖先のディレクトリに `機械生成` または `機械変換` と注記されたもの（`gcp-*` の `gcloud/` `rest/` `iam/` 等、`gcp-bigquery` の `googlesql-syntax/` `legacy-sql/` 等）と、`gcp-services-index` のすべての README。readme-indexer は書き込まず、README を直接編集もしない。生成ツール（`_/tools/gcp/` 等）を直して再生成する。生成ツールは `.gitignore` の対象の `_/` にあり、メンテナーの作業ツリーにしか無い。生成ツールが無いチェックアウトでは、対象の README と未解消の指摘を報告して終える
- **更新する README の選び方**: README を書くのは readme-indexer と、手で保守する README を直す main だけ（reference-researcher・sample-curator・script-collector はページだけを書き、作成・変更・改名・削除したファイルを返す）。作業の後、次の README を対象にし、深い階層から処理する。対象は `references/<category>/` 以下・`samples/`・`scripts/` の README に限る（ページを `references/` 直下に置くスキルでは `references/README.md` も対象）
  - 作成・改名・削除したファイルと、H1 または概要行（Description の抽出元）を変更したファイル（子索引を含む）にリンクしている既存の README
  - 新しいファイル（改名後のパスを含む）については、新しいページならそのページのディレクトリから、新しい子索引なら親ディレクトリから上へたどって最初に見つかる既存の README（`references/<category>/`・`samples/`・`scripts/` より上には上がらない。`references/` 直下のページは `references/README.md`）。その README から直接載せられない（孫以下になる）ときは、ページのディレクトリからその README の直下までの間の各ディレクトリに索引を新設し、深い順に処理する。見つかった README のディレクトリのページを親の README が直接載せている（親で集約している）ときは、親の README も対象にする
  - README の無いディレクトリは、新しいカテゴリ（`references/<category>/`）、初めて作った `samples/`・`scripts/`、索引を新設すると決めた子ディレクトリ（上の項目で載せられないとき、上へたどって既存の README が見つからないときを含む）だけを対象にする
  - 対象のうち、再生成する README は readme-indexer に `category_dir` として渡し、手で保守する README は main が直し、生成ツールが出力する README は生成ツールで再生成する
- **索引する対象の無いディレクトリ**（readme-indexer の Step 1 の候補が 0 件。直下のページも、載せる子索引・子ディレクトリのページも無い）: README を削除も書き換えもせず、対象の README を報告する（扱いは呼び出し元がユーザーに確認する）
- **ページから取る Name・Description**: Name はページの H1、Description は H1 の後の最初の本文の行（空行・見出し・メタデータ行・引用・コードフェンス・表・HTML コメント・フロントマターを飛ばす）。Description に含まれる Markdown のリンク（`[text](url)`）は表示テキスト `text` だけにする（相対リンクは README を起点に解決され、子ディレクトリのページから取ると別のページを指すため）。readme-indexer の再生成でも、main が手で保守する README に反映するときも同じにする。ただし main が手で保守する README の既存の行を更新するときは、既存の Name・Description のセルにあるリンクのうち README から正しく解決されるもの（`https:` などの URL と、README を起点に実在するページを指す相対リンク）を残す。子索引の行の Name は子索引の H1 に合わせる。ページから取った Description が長い場合は 50 文字程度で切り詰め、末尾に `…` を付ける（既存の子索引の行から引き継ぐ Description は切り詰めない）

## 関連

- `.claude/rules/skill-anatomy.md`
- `.claude/rules/japanese-style.md`
