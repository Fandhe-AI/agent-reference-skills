---
name: commitlint
description: >
  commitlint (Conventional Commits メッセージ検証ツール) リファレンス。
  rules 設定、plugins、shareable-config、@commitlint/config-conventional、
  Husky / lefthook / simple-git-hooks 連携、CI 統合、custom rules。
user-invocable: false
model: sonnet
---

# commitlint リファレンス

commitlint 公式ドキュメントの全 API・ガイドを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/commitlint/
  SKILL.md
  references/
    guides/
      README.md
      ai-agents.md
      ci-setup.md
      getting-started.md
      local-setup.md
      use-prompt.md
    reference/
      README.md
      cli.md
      community-projects.md
      configuration.md
      examples.md
      plugins.md
      prompt.md
      rules.md
      rules-configuration.md
    api/
      README.md
      format.md
      lint.md
      load.md
      read.md
    concepts/
      README.md
      commit-conventions.md
      shareable-config.md
    support/
      README.md
      releases.md
      troubleshooting.md
      upgrade.md
  samples/
    README.md
    getting-started.md
    local-setup-husky.md
    custom-rules.md
    shareable-config.md
    ci-github-actions.md
    configuration-formats.md
    validate-issue-reference.md
  scripts/
    README.md
    install.md
    setup.md
    cli.md
    validate.md
    prompt.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| インストール、初期設定、Husky 連携、Git フック設定 | guides | [references/guides/README.md](references/guides/README.md) |
| CI 環境（GitHub Actions 等）での commitlint 設定 | guides | [references/guides/README.md](references/guides/README.md) |
| AI エージェント（Claude Code、Copilot、Cursor）との連携 | guides | [references/guides/README.md](references/guides/README.md) |
| 対話型コミットメッセージ作成（prompt-cli） | guides | [references/guides/README.md](references/guides/README.md) |
| CLI オプション、設定ファイル形式、全オプション | reference | [references/reference/README.md](references/reference/README.md) |
| ルール一覧、ルール設定（Level / Applicable / Value） | reference | [references/reference/README.md](references/reference/README.md) |
| プラグイン作成・登録 | reference | [references/reference/README.md](references/reference/README.md) |
| cz-commitlint プロンプト設定 | reference | [references/reference/README.md](references/reference/README.md) |
| @commitlint/lint, load, read, format の Node.js API | api | [references/api/README.md](references/api/README.md) |
| lint 結果のフォーマット・出力 | api | [references/api/README.md](references/api/README.md) |
| Conventional Commits フォーマット、スコープの扱い | concepts | [references/concepts/README.md](references/concepts/README.md) |
| 共有設定（shareable config）の作成・配布 | concepts | [references/concepts/README.md](references/concepts/README.md) |
| エラー解決、よくある問題のトラブルシューティング | support | [references/support/README.md](references/support/README.md) |
| バージョンアップグレード、validate-commit-msg 移行 | support | [references/support/README.md](references/support/README.md) |
| 典型的な使い方・設定例を確認したい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・検証コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
