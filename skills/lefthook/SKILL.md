---
name: lefthook
description: >
  Lefthook (高速並列 Git hooks マネージャー) リファレンス。
  lefthook.yml 設定、pre-commit / pre-push / commit-msg 等のフック、
  parallel / piped 実行、glob / run / tags フィルタ、
  CI スキップ、staged_files、Husky からの移行。
user-invocable: false
model: sonnet
---

# Lefthook リファレンス

Lefthook（lefthook.dev）の全ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/lefthook/
  SKILL.md
  references/
    installation/
      README.md
      overview.md
      node.md
      ruby.md
      go.md
      python.md
      swift.md
      homebrew.md
      winget.md
      scoop.md
      deb.md
      rpm.md
      alpine.md
      arch.md
      snap.md
      devbox.md
      mise.md
      manual.md
    configuration/
      README.md
      global-settings.md
      hook-settings.md
      command-settings.md
      script-settings.md
      source-dir.md
      remotes.md
    usage/
      README.md
      commands.md
      environment-variables.md
    examples/
      README.md
      commitlint.md
      filters.md
      lefthook-local.md
      remotes.md
      skip.md
      stage-fixed.md
      wrap-commands.md
  samples/
    README.md
    basic-setup.md
    parallel-execution.md
    auto-fix-and-stage.md
    commitlint-integration.md
    local-override.md
    conditional-skip.md
    monorepo-setup.md
    shared-config-via-remotes.md
  scripts/
    README.md
    cli.md
    install.md
    run-with-env.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Lefthook のインストール・セットアップ | installation | [references/installation/README.md](references/installation/README.md) |
| npm / yarn / pnpm / pip / gem でのインストール | installation | [references/installation/README.md](references/installation/README.md) |
| Homebrew / Scoop / Winget / APK / AUR でのインストール | installation | [references/installation/README.md](references/installation/README.md) |
| バイナリ手動インストール・mise / devbox 対応 | installation | [references/installation/README.md](references/installation/README.md) |
| lefthook.yml のグローバル設定 | configuration | [references/configuration/README.md](references/configuration/README.md) |
| Hook 設定（parallel, piped, follow, skip） | configuration | [references/configuration/README.md](references/configuration/README.md) |
| Command 設定（run, glob, files, stage_fixed） | configuration | [references/configuration/README.md](references/configuration/README.md) |
| Script 設定・source_dir の変更 | configuration | [references/configuration/README.md](references/configuration/README.md) |
| remotes による設定共有 | configuration | [references/configuration/README.md](references/configuration/README.md) |
| lefthook install / run / add / validate / dump | usage | [references/usage/README.md](references/usage/README.md) |
| 環境変数（LEFTHOOK, LEFTHOOK_VERBOSE 等）による制御 | usage | [references/usage/README.md](references/usage/README.md) |
| commitlint / Commitizen 統合 | examples | [references/examples/README.md](references/examples/README.md) |
| ファイルフィルタリング（glob / staged_files / tags） | examples | [references/examples/README.md](references/examples/README.md) |
| lefthook-local.yml でのローカルオーバーライド | examples | [references/examples/README.md](references/examples/README.md) |
| 条件付きスキップ・ブランチ制限 | examples | [references/examples/README.md](references/examples/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
