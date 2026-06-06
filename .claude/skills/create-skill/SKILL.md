---
name: create-skill
description: >
  新しいライブラリ/フレームワークの参照スキルを skills/<library>/ に新規作成するワークフロー。
  公式ドキュメント調査から SKILL.md 作成・検証・CLAUDE.md 反映までを Agent 委譲で進める。
  「スキルを追加して」「<library> のリファレンスを作って」などで使用。
model: sonnet
user-invocable: true
argument-hint: "<library> [base_url] (例: create-skill zod https://zod.dev)"
---

# create-skill

`skills/<library>/` に新しいライブラリ/フレームワークの参照スキルを作成するオーケストレーションスキル。

## 使い方

```
/create-skill zod https://zod.dev    # library と base_url を指定
/create-skill hono                   # base_url 省略時は調査で特定する
```

| 引数 | 必須 | 説明 |
| --- | --- | --- |
| `library` | 必須 | 追加するライブラリ/フレームワークの名前（例: `zod`, `hono`） |
| `base_url` | 任意 | 公式ドキュメントのベース URL。省略時は Step 1〜2 で特定する |

main（このスキル自身）は計画・委譲・統合・報告に徹し、ドキュメントの読み込みや references の執筆は専門 Agent に委譲する（`.claude/rules/delegation.md` 準拠）。

**base_url の確定**: 引数で渡されなかった場合、Step 1 の skill-coverage-analyzer に公式ドキュメントの正規 URL を報告させる（不明なら Step 3 冒頭の reference-researcher `mode=survey` で WebSearch により特定する）。確定した URL は Step 2 の計画に記録し、以降の Step 3・Step 4 の全 Agent には**この確定済み base_url** を渡す（各 Agent が個別に URL を再探索しないようにする）。

## フロー

### Step 1: スキルの要否を確認する

**skill-coverage-analyzer（subagent_type: skill-coverage-analyzer、model: opus）**に委譲し、以下を確認させる。渡すパラメータ: `target`（= 引数の `<library>`）、`base_url`（引数で渡された場合のみ）。

- 既存スキルと重複していないか
- ドキュメントの規模・構造から scope 候補（例: `core`, `plugins`, `cli`）を列挙
- `base_url` が未指定の場合は公式ドキュメントの正規 URL を併せて報告させる

スキルが不要と判断された場合はユーザーに確認を取り、中断するかどうかを決める。

### Step 2: 実装計画を作成する

`create-plan` スキルを呼び出し、`_/local-plans/<library>-skill.md` に計画を作成する。

計画には以下を含める。

- スキルの概要と対象ドキュメント URL
- scope の分割方針と各 scope の担当カテゴリ一覧
- references ディレクトリ構造（ツリー形式）
- 実装ステップと完了条件
- 検証方法

Step 1 で scope が確定しなかった場合は、計画の scope 分割を暫定とし、Step 3 冒頭の `mode=survey` 調査結果で確定してから計画に反映する（survey 後に scope 分割方針を更新する）。

### Step 3: references を並列生成する

Step 1・Step 2 で確定した scope 分割に従い、各 scope に対して **reference-researcher（subagent_type: reference-researcher、model: sonnet）**を**並列**起動し、対象カテゴリの references（個別ページ .md）と `README.md` インデックスを生成させる。各 reference-researcher が自身で公式ドキュメントのナビゲーションを取得してページ一覧を確定する（main は公式ドキュメントを読まない）。

scope が未確定の場合は、先に reference-researcher を `mode=survey` で1つ起動してサイト構造の調査だけを行わせる（survey モードはファイルを書き出さずカテゴリ候補のみ報告する。この起動では `scope`・`output_dir` を渡さない）。その結果（カテゴリ一覧）をもとに scope を分割してから、各 scope を `mode=full`（既定）で並列起動する。カテゴリ数が多い場合は 1 Agent = 1 カテゴリを目安に分割する。

各 Agent に渡すパラメータ:

| パラメータ | 内容 |
| --- | --- |
| `library` | ライブラリ名 |
| `base_url` | Step 1〜2 で確定した公式ドキュメントの URL（省略時に特定したものを含む） |
| `scope` | 担当スコープ。原則 **1 Agent = 1 カテゴリ**。複数カテゴリをまとめる場合のみカンマ区切りで指定する |
| `output_dir` | 単一カテゴリなら `skills/<library>/references/<category>/`。複数カテゴリ（カンマ区切り scope）の場合は `skills/<library>/references/`（ルート）を渡し、Agent 側がカテゴリ別サブディレクトリを作成する |
| `mode` | `full`（既定）。scope 未確定時の事前調査だけは `survey` で起動する |

### Step 4: samples と scripts を並列生成する

references の生成と並行、または完了後に以下を並列起動する。

- **sample-curator（subagent_type: sample-curator、model: sonnet）** — `skills/<library>/samples/` に典型ユースケースの実例を生成させる。渡すパラメータ: `library`, `skill_dir`（`skills/<library>/`）, `base_url`（Step 1〜2 で確定したもの）
- **script-collector（subagent_type: script-collector、model: sonnet）** — `skills/<library>/scripts/` にコピペ可能なコマンド集を生成させる。渡すパラメータ: `library`, `skill_dir`（`skills/<library>/`）, `base_url`（Step 1〜2 で確定したもの）

ライブラリの性質上 samples または scripts が不要と判断される場合（例: ガイドライン型スキル）はスキップしてよい。

### Step 5: SKILL.md を作成する

Step 3（references）と **Step 4 で実際に起動した Agent**（samples / scripts）の完了を確認後、**skill-author（subagent_type: skill-author、model: sonnet）**に委譲して `skills/<library>/SKILL.md` を作成させる。Step 4 で samples / scripts を不要と判断してスキップした場合は、その分の完了を待たずに Step 3 の完了のみで先へ進む（起動していない Agent の完了は待たない）。samples / scripts を先に確定させることで、SKILL.md のツリー・マッピング表に確実に反映される。

渡すパラメータ:

| パラメータ | 内容 |
| --- | --- |
| `library` | ライブラリ名 |
| `skill_dir` | `skills/<library>/` |
| `user-invocable` | 配布スキルは通常 `false`（skill-anatomy 準拠） |

skill-author が生成する内容:

- YAML frontmatter（name / description / user-invocable）
- ディレクトリツリー
- 探索手順
- タスク→カテゴリ→README マッピングテーブル

skill-author は自身で description を最適化せず、最適化が必要なら main へ「委譲提案」を返す。**その提案があった場合、または後続 Step 6 の reference-linter が description の不備を指摘した場合に、main が description-optimizer（subagent_type: description-optimizer、model: sonnet）へ委譲する**（渡すパラメータ: `skill_dir`＝`skills/<library>/`）。

### Step 6: 品質を検証する

以下の Agent を起動して品質を検証する。いずれにも検証対象を限定する `skill_dir`（`skills/<library>/`）を渡す（未指定だと linter が `skills/` 全体を走査し、validator の対象ディレクトリが不定になる）。

- **reference-linter（subagent_type: reference-linter、model: haiku）** — references 本文・samples/scripts 本文・各 README 索引・SKILL.md frontmatter のフォーマット準拠を確認させる（渡すパラメータ: `skill_dir`）
- **skill-structure-validator（subagent_type: skill-structure-validator、model: haiku）** — SKILL.md とディレクトリ構造が skill-anatomy 準拠かを確認させる（渡すパラメータ: `skill_dir`）

指摘事項は内容に応じて該当 Agent に差し戻し、修正後に再検証する。

- references 本文の不備 → **reference-researcher**
- samples 本文の不備 → **sample-curator**
- scripts 本文の不備 → **script-collector**
- 各カテゴリ `README.md` 索引の不備 → **readme-indexer**
- SKILL.md の `description`（ヒット率・長さ・YAML の `#` 起因の不備）→ **description-optimizer**
- SKILL.md のツリー・マッピング表・`description` 以外の frontmatter の不備 → **skill-author**

### Step 7: CLAUDE.md を更新する

`update-docs` スキルを呼び出し、CLAUDE.md の「Current Skills」一覧とリポジトリ構造ツリーに新スキルを反映する。

### Step 8: コミットする（任意）

ユーザーからコミットの指示があれば `create-commit` スキルでコミットを作成する。

## 検証

- [ ] `ls skills/<library>/SKILL.md` でファイルが存在することを確認する
- [ ] `head -10 skills/<library>/SKILL.md` で frontmatter（name / description / user-invocable）が正しく記述されていることを確認する
- [ ] `ls skills/<library>/references/` 配下に各カテゴリの references と `README.md` が存在することを確認する
- [ ] samples / scripts を生成した場合は `ls skills/<library>/samples/` `ls skills/<library>/scripts/` の存在を、スキップした場合は SKILL.md のツリー・マッピング表に当該行が含まれていないことを確認する
- [ ] reference-linter と skill-structure-validator の検証が PASS していることを確認する
- [ ] CLAUDE.md の「Current Skills」一覧に `<library>` が追加されていることを確認する

## 注意事項

- `.claude/` 配下を編集する場合は `.claude/rules/dotclaude-via-temp.md` に従い `_/dotclaude/` 経由で行う
- references の本文はドキュメント原文の言語（通常英語）で記述する
- description と SKILL.md 内の日本語説明文は `.claude/rules/description-style.md` および `.claude/rules/japanese-style.md` に準拠する
- main 自身は公式ドキュメントを直接読み込まず、必ず専門 Agent に委譲する

## 関連

**Agents**: reference-researcher, sample-curator, script-collector, skill-author, description-optimizer, reference-linter, skill-structure-validator, skill-coverage-analyzer

**Rules**: delegation, skill-anatomy, reference-template, description-style

**Skills**: create-plan, update-docs, create-commit
