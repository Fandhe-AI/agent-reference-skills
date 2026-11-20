---
name: delegation
description: 委譲方針とタスク→Agent マッピング・モデル戦略。main は対話・計画・委譲・報告に徹し、token を消費する実作業を専門サブエージェントへ委譲する。
applies_to: 全エージェント / main
---

# 委譲方針

main エージェントは「対話・計画・委譲・報告」に徹する。
token を消費する実作業（ドキュメント調査、references 作成、SKILL.md 作成、description 最適化、README 索引生成、構造検証、lint、スキル棚卸し）はすべて専門サブエージェントへ委譲する。

## やってよいこと

- ユーザーとの対話・要件整理
- 作業計画の立案と実行順序の決定
- サブエージェントへの委譲指示の発行
- 完了後のサマリー報告（ファイルパス・変更点の箇条書き）
- 軽微な frontmatter 修正（1行以内の誤字訂正など）

## やってはいけないこと

- 公式ドキュメントのクロール・内容調査（reference-researcher に委譲）
- references/ 配下のページ新規作成（reference-researcher に委譲）／既存スキルの最新ドキュメント追従・更新（reference-updater に委譲）
- SKILL.md の新規作成・description 変更（skill-author / description-optimizer に委譲）
- README 索引表の再生成（readme-indexer に委譲）
- スキル構造の検証・lint（skill-structure-validator / reference-linter に委譲）
- スキル棚卸し・手薄カテゴリの分析（skill-coverage-analyzer に委譲）
- 「単純だから」「数行だから」を理由に委譲をスキップすること

## 委譲先マッピング

| タスク | 委譲先 Agent | model |
| --- | --- | --- |
| 新ライブラリの公式ドキュメント調査・references 作成（scope 毎に並列） | reference-researcher | sonnet |
| 追加すべきスキル・手薄カテゴリの棚卸し・提案 | skill-coverage-analyzer | opus |
| SKILL.md の作成・更新 | skill-author | sonnet |
| description のヒット率・長さ最適化 | description-optimizer | sonnet |
| README 索引表の再生成 | readme-indexer | haiku |
| スキルの構造整合性の検証 | skill-structure-validator | haiku |
| 個別ファイル・frontmatter の lint | reference-linter | haiku |
| 計画・作業の完了検証 | plan-verifier | sonnet |
| 実例・典型ワークフローの作成（samples/） | sample-curator | sonnet |
| 実行可能コマンドの収集・整理（scripts/） | script-collector | sonnet |
| 既存スキルの公式ドキュメント追従・更新 | reference-updater | sonnet |

## モデル戦略

opus はリポジトリ横断分析（コスト高につき棚卸し等に限定）、sonnet は調査・作成・検証、haiku は判定不要の機械的検証・整形に使用する。

## 関連

- `.claude/rules/skill-anatomy.md`
- `.claude/rules/dotclaude-via-temp.md`
