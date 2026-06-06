---
name: update-skill
description: >
  既存スキルの references / samples / scripts が公式ドキュメントの最新版に追従しているか確認し更新するワークフロー。
  reference-updater Agent で差分検出し、必要なファイルを更新して CLAUDE.md まで反映する。
  「<library> のスキルを最新化して」「リファレンスを更新して」などで使用。
model: sonnet
user-invocable: true
argument-hint: "<library> [check|apply] (例: update-skill zod apply)"
---

# update-skill

`skills/<library>/` の references / samples / scripts を公式ドキュメントの最新版に追従させるオーケストレーションスキル。

## 使い方

```
/update-skill zod          # 差分レポートのみ（既定: check）
/update-skill zod apply    # 差分を確認して更新まで適用
```

| 引数 | 必須 | 説明 |
| --- | --- | --- |
| `library` | 必須 | 更新対象のライブラリ名（例: `zod`, `hono`） |
| `mode` | 任意 | `check`（差分レポートのみ）または `apply`（更新まで適用）。既定: `check` |

main（このスキル自身）は委譲・統合・報告に徹し、ドキュメントの調査・ファイルの差分適用は専門 Agent に委譲する（`.claude/rules/delegation.md` 準拠）。

## フロー

### Step 1: 差分を検出する

**reference-updater（subagent_type: reference-updater、model: sonnet）**を起動し、公式ドキュメントとの差分を検出させる。

渡すパラメータ:

| パラメータ | 内容 |
| --- | --- |
| `library` | ライブラリ名 |
| `skill_dir` | `skills/<library>/` |
| `mode` | 受け取った mode 引数（既定: `check`） |

スコープが広い場合（カテゴリ数が多い等）は scope を分割して reference-updater を並列起動する。ただし scoped 実行は `samples/` `scripts/` を更新しないため、scope 分割した場合は別途 scope 未指定（全体）の reference-updater を1回実行するか、`samples/` `scripts/` の追従が必要なら sample-curator / script-collector に直接委譲する。

mode=check の場合は差分レポートをユーザーに提示して終了する。

### Step 2: 更新を適用する（mode=apply 時）

reference-updater は `references/` の既存ファイルのみを Edit し、`samples/` `scripts/` への変更も新規項目の作成も自身では行わない。差分レポートに記載された後続作業を以下へ委譲する（reference-updater は実作業をしないため二重作成は起きない）。

**新規項目の作成**:
- 新しい references カテゴリ → **reference-researcher（subagent_type: reference-researcher、model: sonnet）**へ委譲
- 新しい samples ユースケース → **sample-curator（subagent_type: sample-curator、model: sonnet）**へ委譲
- 新しい CLI/コマンド → **script-collector（subagent_type: script-collector、model: sonnet）**へ委譲

**既存 samples / scripts の変更追従**（reference-updater が「更新要」と報告した場合）:
- API 変更で既存サンプルが古くなった → **sample-curator** へ委譲し、該当ユースケースを再生成させる
- CLI コマンド変更で既存スクリプトが古くなった → **script-collector** へ委譲し、該当カテゴリを再生成させる

複数の作業が必要な場合は並列起動する。

### Step 3: 索引・エントリポイントを再生成する

更新後、以下を順に実行する。

1. **readme-indexer（subagent_type: readme-indexer、model: haiku）** — reference-updater の更新レポートで変更のあった references カテゴリ、および変更があった `skills/<library>/samples/` `skills/<library>/scripts/` の `README.md` 索引を再生成させる（reference-updater は apply 時に README 索引を再生成しないため、ここで必ず実行する）
2. **skill-author（subagent_type: skill-author、model: sonnet）** — `skills/<library>/SKILL.md` のディレクトリツリーとマッピング表を更新させる（カテゴリの追加・削除があった場合のみ）

### Step 4: 品質を検証する

以下の Agent を起動して品質を確認する。

- **reference-linter（subagent_type: reference-linter、model: haiku）** — 更新ファイルのフォーマット・テンプレート準拠を確認させる
- **skill-structure-validator（subagent_type: skill-structure-validator、model: haiku）** — SKILL.md とディレクトリ構造が skill-anatomy 準拠かを確認させる

指摘事項があれば該当 Agent（reference-updater または skill-author）に差し戻し、修正後に再検証する。

### Step 5: CLAUDE.md を反映する

カテゴリ追加等でスキルの構成が大きく変わった場合は `update-docs` スキルを呼び出し、CLAUDE.md のリポジトリ構造ツリーを更新する。

### Step 6: コミットする（任意）

ユーザーからコミットの指示があれば `create-commit` スキルでコミットを作成する。

## 検証

- [ ] reference-updater による差分検出が完了していることを確認する
- [ ] mode=apply 時: `git diff skills/<library>/` で差分が適用されていることを確認する
- [ ] reference-linter と skill-structure-validator の検証が PASS していることを確認する
- [ ] CLAUDE.md が最新のスキル構成を反映していることを確認する（構成変更があった場合）

## 注意事項

- `.claude/` 配下を編集する場合は `.claude/rules/dotclaude-via-temp.md` に従い `_/dotclaude/` 経由で行う
- main 自身は公式ドキュメントを直接読み込まず、必ず専門 Agent に委譲する

## 関連

**Agents**: reference-updater, reference-researcher, sample-curator, script-collector, readme-indexer, skill-author, reference-linter, skill-structure-validator

**Rules**: delegation, skill-anatomy, reference-template

**Skills**: update-docs, create-commit
