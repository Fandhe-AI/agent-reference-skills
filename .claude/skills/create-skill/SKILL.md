---
name: create-skill
description: >
  新しいライブラリ/フレームワークの参照スキルを skills/<library>/ に新規作成するワークフロー。
  公式ドキュメント調査から SKILL.md 作成・検証・CLAUDE.md 反映までを Agent 委譲で進める。
  「スキルを追加して」「<library> のリファレンスを作って」などで使用。
user-invocable: true
argument-hint: <library> [base_url]
---

# 新規配布スキルの作成

`skills/<library>/` に新しいライブラリ/フレームワークの参照スキルを作成するオーケストレーションスキル。

## 役割

新スキル作成の一連の流れを統括する。main（このスキル自身）は計画・委譲・統合・報告に徹し、ドキュメントの読み込みや references の執筆は専門 Agent に委譲する（`.claude/rules/delegation.md` 準拠）。

## 入力

| 引数 | 必須 | 説明 |
| --- | --- | --- |
| `library` | 必須 | 追加するライブラリ/フレームワークの名前（例: `zod`, `hono`） |
| `base_url` | 任意 | 公式ドキュメントのベース URL。省略時は調査で特定する |

## 手順

### Step 1: スキルの要否確認（任意）

`skill-coverage-analyzer`（モデル: opus）に委譲し、以下を確認する。

- 既存スキルと重複していないか
- ドキュメントの規模・構造から scope 候補（例: `core`, `plugins`, `cli`）を列挙

スキルが不要と判断された場合はユーザーに確認を取り、中断するかどうかを決める。

### Step 2: 実装計画の作成

`create-plan` スキルを呼び出し、`_/local-plans/<library>-skill.md` に計画を作成する。

計画には以下を含める。

- スキルの概要と対象ドキュメント URL
- scope の分割方針と各 scope の担当カテゴリ一覧
- references ディレクトリ構造（ツリー形式）
- 実装ステップと完了条件
- 検証方法

### Step 3: references の生成（並列）

公式ドキュメントのナビゲーションを確認し、scope を分割する。各 scope に対して `reference-researcher`（モデル: sonnet）を**並列**起動する。

各 Agent に渡すパラメータ:

| パラメータ | 内容 |
| --- | --- |
| `library` | ライブラリ名 |
| `base_url` | 公式ドキュメントの URL |
| `scope` | 担当スコープ（例: `core`, `plugins`） |
| `output_dir` | `skills/<library>/references/<category>/` |

各 Agent は対象カテゴリの references（個別ページ .md）と `README.md` インデックスを生成する。

### Step 3b: samples と scripts の生成（並列・references 生成と並行可）

references の生成と並行、または完了後に以下を並列起動する。

- `sample-curator`（モデル: sonnet）— `skills/<library>/samples/` に典型ユースケースの実例を生成する。渡すパラメータ: `library`, `skill_dir`（`skills/<library>/`）, `base_url`
- `script-collector`（モデル: sonnet）— `skills/<library>/scripts/` にコピペ可能なコマンド集を生成する。渡すパラメータ: `library`, `skill_dir`（`skills/<library>/`）, `base_url`

ライブラリの性質上 samples または scripts が不要と判断される場合（例: ガイドライン型スキル）はスキップしてよい。

### Step 4: SKILL.md の作成

全 scope の完了を確認後、`skill-author`（モデル: sonnet）に委譲して `skills/<library>/SKILL.md` を作成する。

- YAML frontmatter（name / description / user-invocable）
- ディレクトリツリー
- 探索手順
- タスク→カテゴリ→README マッピングテーブル

description の品質が不十分な場合は `description-optimizer`（モデル: sonnet）に差し戻して改善する。

### Step 5: 検証

以下の Agent を起動して品質を検証する。

- `reference-linter`（モデル: haiku）— references 本文のフォーマット・テンプレート準拠を確認
- `skill-structure-validator`（モデル: haiku）— SKILL.md とディレクトリ構造が skill-anatomy 準拠かを確認

指摘事項があれば該当 Agent（reference-researcher または skill-author）に差し戻し、修正後に再検証する。

### Step 6: CLAUDE.md の更新

`update-docs` スキルを呼び出し、CLAUDE.md の「Current Skills」一覧とリポジトリ構造ツリーに新スキルを反映する。

### Step 7: コミット（任意）

ユーザーからコミットの指示があれば `create-commit` スキルでコミットを作成する。

## 完了条件

- `skills/<library>/SKILL.md` が skill-anatomy 準拠で作成済み
- `skills/<library>/references/` 配下に各カテゴリの references と `README.md` が存在
- `skills/<library>/samples/` 配下に実例ファイルと `README.md` が存在（生成した場合）
- `skills/<library>/scripts/` 配下にコマンドファイルと `README.md` が存在（生成した場合）
- `reference-linter` と `skill-structure-validator` の検証が PASS
- CLAUDE.md の「Current Skills」一覧に `<library>` が追加済み

## 注意

- `.claude/` 配下を編集する場合は `.claude/rules/dotclaude-via-temp.md` に従い `_/dotclaude/` 経由で行う
- references の本文はドキュメント原文の言語（通常英語）で記述する
- description と SKILL.md 内の日本語説明文は `.claude/rules/description-style.md` および `.claude/rules/japanese-style.md` に準拠する
- main 自身は公式ドキュメントを直接読み込まず、必ず専門 Agent に委譲する

## 関連

**Agents**: reference-researcher, sample-curator, script-collector, skill-author, description-optimizer, reference-linter, skill-structure-validator, skill-coverage-analyzer

**Rules**: delegation, skill-anatomy, reference-template, description-style

**Skills**: create-plan, update-docs, create-commit
