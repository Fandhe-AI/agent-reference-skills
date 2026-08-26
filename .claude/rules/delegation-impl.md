---
description: 作成・編集フェーズの委譲ルール。skills/・.claude/agents/・.claude/rules/ などを変更する際に適用する。
paths:
  - "skills/**"
  - ".claude/agents/**"
  - ".claude/rules/**"
  - "CLAUDE.md"
  - "README.md"
---

# 委譲ルール（作成・編集フェーズ）

委譲の原則・調査系マッピングは `./delegation.md` を参照。本ファイルは**作成・編集モード**に特化する。
委譲先はテンプレート（template-skills）の cli 系 Agent 構成ではなく、**本リポジトリに実在する Agent** へ合わせて調整済み。

## 委譲先マッピング（作成・編集系）

| 対象 | subagent_type | model | 適用ルール |
|-----|--------------|-------|-----------|
| `skills/<name>/SKILL.md` の作成・更新 | `skill-author` | sonnet | `./skill-anatomy.md` |
| `description` フィールドの最適化 | `description-optimizer` | sonnet | `./description-style.md` |
| カテゴリ README 索引表の再生成 | `readme-indexer` | haiku | `./reference-template.md` |
| `samples/` の実例整備 | `sample-curator` | sonnet | `./skill-anatomy.md` |
| `scripts/` のコマンド収集 | `script-collector` | sonnet | `./skill-anatomy.md` |
| スキル構造の整合性検証（読み取り専用） | `skill-structure-validator` | haiku | `./skill-anatomy.md` |
| 個別ファイル・frontmatter の lint（読み取り専用） | `reference-linter` | haiku | `./reference-template.md` |
| 計画・作業の完了検証（読み取り専用） | `plan-verifier` | sonnet | — |

本リポジトリには cli 系リポの `agent-author` / `rules-author` / `docs-writer` / `skill-reviewer` /
`security-auditor` / `frontmatter-linter` に相当する専任 Agent は無い。存在しない Agent へ委譲しない:

- `.claude/agents/`・`.claude/rules/` の作成・編集は main が `./dotclaude-via-temp.md` 準拠で行う（`./agent-authoring.md` を遵守）
- `CLAUDE.md`・`README.md` の一覧更新は `update-docs` スキル（`.claude/skills/update-docs/`）で行う
- セキュリティ観点の確認は各作業者が `./security.md` のチェックリストで自己チェックする

## 委譲プロンプト必須項目

サブエージェントへの委譲プロンプトには必ず以下を含める:

1. **目的**: 何を作成・編集するか
2. **入力**: 参照すべきファイルパス・既存の仕様
3. **出力先**: 作成・編集するファイルの絶対パス
4. **観点**: 品質基準・チェックすべき観点
5. **適用ルール**: 遵守すべきルールファイルの相対パス

例:

```
subagent_type: skill-author
prompt: |
  目的: foo-library スキルの SKILL.md を作成する
  入力: skills/vitest/SKILL.md（既存スキルの参考）、skills/foo-library/references/
  出力先: skills/foo-library/SKILL.md
  観点: ./skill-anatomy.md に従った frontmatter・探索手順・マッピング表
  適用ルール: .claude/rules/skill-anatomy.md, .claude/rules/description-style.md
```

## .claude/ 配下の編集について

`.claude/agents/`・`.claude/rules/` を編集する場合は `./dotclaude-via-temp.md` に従い、**直接書き込まず `_/dotclaude/` を経由**して最終配置する。
