---
name: update-skill
description: >
  既存スキルの references / samples / scripts が公式ドキュメントの最新版に追従しているか確認し更新するワークフロー。
  reference-updater Agent で差分検出し、必要なファイルを更新して CLAUDE.md まで反映する。
  「<library> のスキルを最新化して」「リファレンスを更新して」などで使用。
user-invocable: true
argument-hint: <library> [check|apply]
---

# 既存スキルの更新

`skills/<library>/` の references / samples / scripts を公式ドキュメントの最新版に追従させるオーケストレーションスキル。

## 役割

既存スキルの陳腐化チェックと更新を統括する。main（このスキル自身）は委譲・統合・報告に徹し、ドキュメントの調査・ファイルの差分適用は専門 Agent に委譲する（`.claude/rules/delegation.md` 準拠）。

## 入力

| 引数 | 必須 | 説明 |
| --- | --- | --- |
| `library` | 必須 | 更新対象のライブラリ名（例: `zod`, `hono`） |
| `mode` | 任意 | `check`（差分レポートのみ）または `apply`（更新まで適用）。既定: `check` |

## 手順

### Step 1: 差分検出

`reference-updater`（モデル: sonnet）を起動し、公式ドキュメントとの差分を検出する。

渡すパラメータ:

| パラメータ | 内容 |
| --- | --- |
| `library` | ライブラリ名 |
| `skill_dir` | `skills/<library>/` |
| `mode` | 受け取った mode 引数（既定: `check`） |

スコープが広い場合（カテゴリ数が多い等）は scope を分割して `reference-updater` を並列起動する。

mode=check の場合は差分レポートをユーザーに提示して終了する。

### Step 2: 更新の適用（mode=apply 時）

`reference-updater` が返した差分レポートを確認し、以下の観点で追加委譲を判断する。

**追加カテゴリがある場合**:
- 新しい references カテゴリ → `reference-researcher`（sonnet）へ委譲
- 新しい samples ユースケース → `sample-curator`（sonnet）へ委譲
- 新しい CLI/コマンド → `script-collector`（sonnet）へ委譲

複数の追加が必要な場合は並列起動する。

### Step 3: 索引・エントリポイントの再生成

更新後、以下を順に実行する。

1. `readme-indexer`（haiku）— 変更のあったカテゴリの `README.md` 索引を再生成する
2. `skill-author`（sonnet）— `skills/<library>/SKILL.md` のディレクトリツリーとマッピング表を更新する（カテゴリの追加・削除があった場合のみ）

### Step 4: 検証

以下の Agent を起動して品質を確認する。

- `reference-linter`（haiku）— 更新ファイルのフォーマット・テンプレート準拠を確認
- `skill-structure-validator`（haiku）— SKILL.md とディレクトリ構造が skill-anatomy 準拠かを確認

指摘事項があれば該当 Agent（reference-updater または skill-author）に差し戻し、修正後に再検証する。

### Step 5: CLAUDE.md の反映

カテゴリ追加等でスキルの構成が大きく変わった場合は `update-docs` スキルを呼び出し、CLAUDE.md のリポジトリ構造ツリーを更新する。

### Step 6: コミット（任意）

ユーザーからコミットの指示があれば `create-commit` スキルでコミットを作成する。

## 完了条件

- `reference-updater` による差分検出が完了している
- mode=apply 時: 差分が適用され、公式ドキュメント最新版と整合している
- `reference-linter` と `skill-structure-validator` の検証が PASS している
- CLAUDE.md が最新のスキル構成を反映している（構成変更があった場合）

## 注意

- `.claude/` 配下を編集する場合は `.claude/rules/dotclaude-via-temp.md` に従い `_/dotclaude/` 経由で行う
- main 自身は公式ドキュメントを直接読み込まず、必ず専門 Agent に委譲する

## 関連

**Agents**: reference-updater, reference-researcher, sample-curator, script-collector, readme-indexer, skill-author, reference-linter, skill-structure-validator

**Rules**: delegation, skill-anatomy, reference-template

**Skills**: update-docs, create-commit
