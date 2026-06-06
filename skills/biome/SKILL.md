---
name: biome
description: >
  Biome (Rust 製の高速 JavaScript / TypeScript フォーマッター・リンター) リファレンス。
  biome.json 設定、biome check / lint / format コマンド、ルール、suppressions、
  ESLint / Prettier からの移行、import 整理、CI 連携、monorepo 対応。
user-invocable: false
model: sonnet
---

# Biome リファレンス

Biome（biomejs.dev）の全ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/biome/
  SKILL.md
  references/
    guides/
      README.md
      getting-started.md
      configure-biome.md
      integrate-in-vcs.md
      migrate-eslint-prettier.md
      big-projects.md
      manual-installation.md
      investigate-slowness.md
      upgrade-to-biome-v2.md
    formatter/
      README.md
      introduction.md
      differences-with-prettier.md
      option-philosophy.md
    analyzer/
      README.md
      suppressions.md
    linter/
      README.md
      introduction.md
      domains.md
      plugins.md
      javascript-rules.md
      javascript-sources.md
      css-rules.md
      css-sources.md
      json-rules.md
      json-sources.md
      graphql-rules.md
      graphql-sources.md
      html-rules.md
    assist/
      README.md
      introduction.md
      javascript-actions.md
      javascript-sources.md
      css-actions.md
      html-actions.md
      json-actions.md
    reference/
      README.md
      cli.md
      configuration.md
      diagnostics.md
      gritql.md
      reporters.md
      vscode.md
      zed.md
      environment-variables.md
    recipes/
      README.md
      continuous-integration.md
      git-hooks.md
      badges.md
      renovate.md
    internals/
      README.md
      language-support.md
      philosophy.md
  samples/
    README.md
    getting-started.md
    format-and-lint.md
    configuration.md
    vcs-integration.md
    git-hooks.md
    ci-github-actions.md
    monorepo-setup.md
    suppressions.md
    migrate-from-eslint-prettier.md
  scripts/
    README.md
    install.md
    setup.md
    cli.md
    ci.md
    migrate.md
    docker.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| インストール、初期設定、biome init | guides | [references/guides/README.md](references/guides/README.md) |
| ESLint/Prettier からの移行、biome migrate | guides | [references/guides/README.md](references/guides/README.md) |
| モノレポ対応、extends、共有設定 | guides | [references/guides/README.md](references/guides/README.md) |
| VCS 統合、--changed、--staged | guides | [references/guides/README.md](references/guides/README.md) |
| パフォーマンス問題、遅い、トレーシング | guides | [references/guides/README.md](references/guides/README.md) |
| コードフォーマット、インデント、行幅 | formatter | [references/formatter/README.md](references/formatter/README.md) |
| Prettier との違い、フォーマット差異、オプション哲学 | formatter | [references/formatter/README.md](references/formatter/README.md) |
| biome-ignore、抑制コメント、suppress | analyzer | [references/analyzer/README.md](references/analyzer/README.md) |
| リンタールール、lint エラー、ルール設定 | linter | [references/linter/README.md](references/linter/README.md) |
| ドメイン（React, Next.js, Vue）設定 | linter | [references/linter/README.md](references/linter/README.md) |
| GritQL プラグイン、カスタムルール | linter | [references/linter/README.md](references/linter/README.md) |
| ESLint / Stylelint ルールとの対応表 | linter | [references/linter/README.md](references/linter/README.md) |
| import ソート、キーソート、organizeImports | assist | [references/assist/README.md](references/assist/README.md) |
| useSortedKeys、useSortedProperties、CSS アクション | assist | [references/assist/README.md](references/assist/README.md) |
| CLI コマンド、biome check/lint/format/ci | reference | [references/reference/README.md](references/reference/README.md) |
| biome.json 設定、全オプション | reference | [references/reference/README.md](references/reference/README.md) |
| 診断、レポーター、環境変数 | reference | [references/reference/README.md](references/reference/README.md) |
| VS Code 拡張、Zed 設定、GritQL 構文 | reference | [references/reference/README.md](references/reference/README.md) |
| CI/CD、GitHub Actions、Git Hooks | recipes | [references/recipes/README.md](references/recipes/README.md) |
| Renovate による biome.json 自動更新 | recipes | [references/recipes/README.md](references/recipes/README.md) |
| 言語サポート状況、対応言語 | internals | [references/internals/README.md](references/internals/README.md) |
| 開発哲学、プロジェクト原則 | internals | [references/internals/README.md](references/internals/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
