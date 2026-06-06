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
| `base_url` | 任意 | 公式ドキュメントのベース URL。省略時は調査で特定する |

main（このスキル自身）は計画・委譲・統合・報告に徹し、ドキュメントの読み込みや references の執筆は専門 Agent に委譲する（`.claude/rules/delegation.md` 準拠）。

## フロー

### Step 1: スキルの要否を確認する

**skill-coverage-analyzer（subagent_type: skill-coverage-analyzer、model: opus）**に委譲し、以下を確認させる。渡すパラメータ: `target`（= 引数の `<library>`）、`base_url`（引数で渡された場合のみ）。

- 既存スキルと重複していないか
- ドキュメントの規模・構造から scope 候補（例: `core`, `plugins`, `cli`）を列挙

スキルが不要と判断された場合はユーザーに確認を取り、中断するかどうかを決める。

### Step 2: 実装計画を作成する

`create-plan` スキルを呼び出し、`_/local-plans/<library>-skill.md` に計画を作成する。

計画には以下を含める。

- スキルの概要と対象ドキュメント URL
- scope の分割方針と各 scope の担当カテゴリ一覧
- references ディレクトリ構造（ツリー形式）
- 実装ステップと完了条件
- 検証方法

### Step 3: references を並列生成する

Step 1・Step 2 で確定した scope 分割に従い、各 scope に対して **reference-researcher（subagent_type: reference-researcher、model: sonnet）**を**並列**起動し、対象カテゴリの references（個別ページ .md）と `README.md` インデックスを生成させる。各 reference-researcher が自身で公式ドキュメントのナビゲーションを取得してページ一覧を確定する（main は公式ドキュメントを読まない）。

scope が未確定の場合は、先に reference-researcher を1つ起動してサイト構造の調査だけを行わせ、その結果（カテゴリ一覧）をもとに scope を分割してから並列起動する。

各 Agent に渡すパラメータ:

| パラメータ | 内容 |
| --- | --- |
| `library` | ライブラリ名 |
| `base_url` | 公式ドキュメントの URL |
| `scope` | 担当スコープ（例: `core`, `plugins`） |
| `output_dir` | `skills/<library>/references/<category>/` |

### Step 4: samples と scripts を並列生成する

references の生成と並行、または完了後に以下を並列起動する。

- **sample-curator（subagent_type: sample-curator、model: sonnet）** — `skills/<library>/samples/` に典型ユースケースの実例を生成させる。渡すパラメータ: `library`, `skill_dir`（`skills/<library>/`）, `base_url`
- **script-collector（subagent_type: script-collector、model: sonnet）** — `skills/<library>/scripts/` にコピペ可能なコマンド集を生成させる。渡すパラメータ: `library`, `skill_dir`（`skills/<library>/`）, `base_url`

ライブラリの性質上 samples または scripts が不要と判断される場合（例: ガイドライン型スキル）はスキップしてよい。

### Step 5: SKILL.md を作成する

Step 3（references）と Step 4（samples / scripts）の**両方の完了を確認後**、**skill-author（subagent_type: skill-author、model: sonnet）**に委譲して `skills/<library>/SKILL.md` を作成させる。samples / scripts を先に確定させることで、SKILL.md のツリー・マッピング表に確実に反映される。

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

description の品質が不十分な場合は **description-optimizer（subagent_type: description-optimizer、model: sonnet）**に差し戻して改善させる。

### Step 6: 品質を検証する

以下の Agent を起動して品質を検証する。

- **reference-linter（subagent_type: reference-linter、model: haiku）** — references 本文のフォーマット・テンプレート準拠を確認させる
- **skill-structure-validator（subagent_type: skill-structure-validator、model: haiku）** — SKILL.md とディレクトリ構造が skill-anatomy 準拠かを確認させる

指摘事項があれば該当 Agent（reference-researcher または skill-author）に差し戻し、修正後に再検証する。

### Step 7: CLAUDE.md を更新する

`update-docs` スキルを呼び出し、CLAUDE.md の「Current Skills」一覧とリポジトリ構造ツリーに新スキルを反映する。

### Step 8: コミットする（任意）

ユーザーからコミットの指示があれば `create-commit` スキルでコミットを作成する。

## 検証

- [ ] `ls skills/<library>/SKILL.md` でファイルが存在することを確認する
- [ ] `head -10 skills/<library>/SKILL.md` で frontmatter（name / description / user-invocable）が正しく記述されていることを確認する
- [ ] `ls skills/<library>/references/` 配下に各カテゴリの references と `README.md` が存在することを確認する
- [ ] `ls skills/<library>/samples/` および `scripts/` が存在することを確認する（生成した場合）
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
