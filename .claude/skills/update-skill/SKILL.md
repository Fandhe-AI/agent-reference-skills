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

`mode` は `check` / `apply` のいずれかのみ受け付ける。これら以外の値が渡された場合は処理を進めず、正しい値を問い返す（reference-updater 側にも同じ検証があるが、無効値を下流へ流さないよう main でも弾く）。

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

スコープが広い場合（カテゴリ数が多い等）は scope を分割して reference-updater を並列起動する。**scope 分割は既存の全 references カテゴリを漏れなく分担させる（どのカテゴリも必ずいずれかの scoped ジョブに割り当て、取りこぼしを作らない）**。これにより既存カテゴリの `references/` 変更は必ずいずれかの scoped 実行（`mode=apply` 時）で適用される。

ただし scoped 実行は `samples/` `scripts/` を対象にしないため、**scope 分割した場合は、入力 `mode` が `check`・`apply` のいずれであっても、scoped 実行に加えて scope 未指定（全体）の reference-updater を `mode=check` で1回実行し、`samples/` `scripts/` の差分を検出してレポートに含める**。この全体検出は Step 1（差分検出）の一部であり、Step 2 への継続有無や入力 mode とは独立に必ず行う。この全体 check は安全網も兼ね、万一いずれの scoped ジョブにも割り当てられていない既存カテゴリの変更が検出された場合は、後述の取りこぼし適用で拾う。

> **重要**: この全体実行は必ず `mode=check`（検出のみ）とする。`mode=apply` にすると、scoped 実行で適用済みの `references/` を全体実行が再 diff・再適用し、同一ファイルを二重編集してしまう。`references/` の適用は scoped 実行だけが担い、全体実行は検出専用とする（reference-updater は mode を問わず `samples/` `scripts/` を書き換えないため、検出は check で十分）。

各 scoped 実行と全体実行（check）の「変更カテゴリ一覧」をマージして、後続の readme-indexer 対象と Step 2 の新規/変更追従対象を確定する。

入力 `mode=check` の場合は、上記の全体検出まで含めた差分レポート（`references` / `samples` / `scripts` を網羅）をユーザーに提示して終了する。

### Step 2: 更新を適用する（mode=apply 時）

reference-updater は `mode=apply` 時に `references/` の**既存ファイルの更新（Edit）まで行う**が、`samples/` `scripts/` の変更と**新規項目の作成は行わない**。差分レポートに記載された後続作業のうち、reference-updater が担当しない以下を委譲する（新規作成は reference-updater 側で行わないため二重作成は起きない）。

**新規項目の作成**:
- 新しい references カテゴリ → **reference-researcher（subagent_type: reference-researcher、model: sonnet）**へ委譲。新規カテゴリが複数ある場合は **1 Agent = 1 カテゴリ**で並列起動し、各 Agent に `scope`＝当該カテゴリ、`output_dir`＝`skills/<library>/references/<category>/` を渡す（create-skill Step 3 と同じ規約）
- **既存カテゴリ内の新規ページ** → 同じく **reference-researcher** へ委譲。reference-updater は `mode=apply` でも新規ページを Write せず推奨アクションに回すため（reference-updater Step 4 mode=apply の規則2）、新規ページが report-only で取り残されないよう、当該カテゴリに対し `scope`＝該当カテゴリ、`output_dir`＝`skills/<library>/references/<category>/` を渡して起動する。**この委譲では「新規ページのみ作成（既存ファイルは更新しない）」と明示的に指示する**（reference-researcher 行動原則4）。既存ページの内容更新は scoped な reference-updater（`mode=apply`）が既に担当済みのため、reference-researcher には既存ファイルを触らせず不足ページの新規作成だけを行わせ、同一ファイルが両 Agent によって異なる戦略で二重編集されるのを防ぐ
- 新しい samples ユースケース → **sample-curator（subagent_type: sample-curator、model: sonnet）**へ委譲。渡すパラメータ: `library`, `skill_dir`（`skills/<library>/`）, `base_url`（任意）
- 新しい CLI/コマンド → **script-collector（subagent_type: script-collector、model: sonnet）**へ委譲。渡すパラメータ: `library`, `skill_dir`（`skills/<library>/`）, `base_url`（任意）

**既存 references カテゴリの変更適用**:
- 通常は scope 分割が全カテゴリを網羅するため、既存ページの変更は各 scoped 実行（`mode=apply`）で適用済みになる。
- 安全網として、全体 check のレポートに**いずれの scoped ジョブにも割り当てられていなかった既存カテゴリの変更**が現れた場合は、そのカテゴリに対して追加で **reference-updater を `mode=apply`・`scope`＝該当カテゴリ**で実行し、変更を適用する（report-only のまま放置しない）。scoped 実行と対象カテゴリが重複しないため二重適用は起きない。

**既存 samples / scripts の変更追従**（reference-updater が「更新要」と報告した場合）:
- API 変更で既存サンプルが古くなった → **sample-curator** へ委譲し、該当ユースケースを再生成させる（渡すパラメータ: `library`, `skill_dir`, `base_url`（任意）。`scope` で対象ユースケースを絞り込んでもよい）
- CLI コマンド変更で既存スクリプトが古くなった → **script-collector** へ委譲し、該当カテゴリを再生成させる（渡すパラメータ: `library`, `skill_dir`, `base_url`（任意）)

複数の作業が必要な場合は並列起動する。

### Step 3: 索引・エントリポイントを再生成する

更新後、以下を順に実行する。

1. **readme-indexer（subagent_type: readme-indexer、model: haiku）** — reference-updater の更新レポートの「変更カテゴリ一覧」に挙がった references カテゴリ、および変更があった `samples/` `scripts/` の `README.md` 索引を再生成させる（reference-updater は apply 時に README 索引を再生成しないため、ここで必ず実行する）。**変更のあったカテゴリ/ディレクトリごとに `category_dir`（例: `skills/<library>/references/<category>/`, `skills/<library>/samples/`, `skills/<library>/scripts/`）を渡して起動する**（readme-indexer は 1 起動 = 1 カテゴリ）
2. **skill-author（subagent_type: skill-author、model: sonnet）** — `skills/<library>/SKILL.md` のディレクトリツリーとマッピング表を更新させる（カテゴリの追加・削除があった場合のみ）。渡すパラメータ: `library`、`skill_dir`（`skills/<library>/`）、`user-invocable`（既存 SKILL.md の値を踏襲）

### Step 4: 品質を検証する

以下の Agent を起動して品質を確認する。いずれにも検証対象を限定する `skill_dir`（`skills/<library>/`）を渡す（未指定だと linter が `skills/` 全体を走査し、validator の対象ディレクトリが不定になる）。

- **reference-linter（subagent_type: reference-linter、model: haiku）** — 更新ファイルの references 本文・samples/scripts 本文・各 README 索引・SKILL.md frontmatter のフォーマット準拠を確認させる（渡すパラメータ: `skill_dir`）
- **skill-structure-validator（subagent_type: skill-structure-validator、model: haiku）** — SKILL.md とディレクトリ構造が skill-anatomy 準拠かを確認させる（渡すパラメータ: `skill_dir`）

指摘事項は内容に応じて該当 Agent に差し戻し、修正後に再検証する。

- references 本文（既存ファイルの不備）→ **reference-updater**
- references 本文（新規ページの不備）→ **reference-researcher**
- samples 本文の不備 → **sample-curator**
- scripts 本文の不備 → **script-collector**
- 各カテゴリ `README.md` 索引の不備 → **readme-indexer**
- SKILL.md の `description`（ヒット率・長さ・YAML の `#` 起因の不備）→ **description-optimizer**
- SKILL.md のツリー・マッピング表・`description` 以外の frontmatter の不備 → **skill-author**

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
