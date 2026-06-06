---
name: syncpack
description: >
  Syncpack (モノレポ依存バージョン同期ツール) リファレンス。
  .syncpackrc 設定、lint / fix / update / format コマンド、
  versionGroups, semverGroups, updateGroups, customTypes, source,
  catalog プロトコル, semverRangeOnly, minimumReleaseAge, severity,
  sourceMode, package.json 整列、依存バージョン揃え、CI 連携。
user-invocable: false
model: sonnet
---

# Syncpack リファレンス

Syncpack（syncpack.dev）の全ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/syncpack/
  SKILL.md
  references/
    guide/
      README.md
      getting-started.md
      migrate-v14.md
      migrate-v15.md
      peer-dependencies.md
      whats-new.md
    commands/
      README.md
      fix.md
      format.md
      json.md
      lint.md
      list.md
      update.md
    version-groups/
      README.md
      banned.md
      catalog.md
      highest-semver.md
      ignored.md
      lowest-semver.md
      pinned.md
      range-only.md
      same-minor.md
      same-range.md
      snapped-to.md
    semver-groups/
      README.md
      ignored.md
      with-range.md
    update-groups/
      README.md
      ignored.md
      targeted.md
    config/
      README.md
      syncpackrc.md
      custom-types.md
      dependency-groups.md
      format-bugs.md
      format-repository.md
      indent.md
      max-concurrent-requests.md
      minimum-release-age.md
      semver-groups.md
      severity.md
      sort-az.md
      sort-exports.md
      sort-first.md
      sort-packages.md
      source.md
      source-mode.md
      strict.md
      update-groups.md
    reference/
      README.md
      dependency-types.md
      glossary.md
      specifier-types.md
      status.md
  samples/
    README.md
    basic-lint-and-fix.md
    ban-dependency.md
    ci-workflow.md
    custom-types.md
    format-package-json.md
    minimal-config.md
    pin-version.md
    semver-range-policy.md
    snap-to-source.md
    update-dependencies.md
    workspace-protocol.md
  scripts/
    README.md
    cli.md
    install.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| インストール、初期設定、Getting Started | guide | [references/guide/README.md](references/guide/README.md) |
| v14 / v15 移行、マイグレーション | guide | [references/guide/README.md](references/guide/README.md) |
| peerDependencies の誤検知対策 | guide | [references/guide/README.md](references/guide/README.md) |
| What's New、新機能確認 | guide | [references/guide/README.md](references/guide/README.md) |
| syncpack lint、バージョン不一致チェック | commands | [references/commands/README.md](references/commands/README.md) |
| syncpack fix、バージョン修正 | commands | [references/commands/README.md](references/commands/README.md) |
| syncpack update、最新バージョン更新 | commands | [references/commands/README.md](references/commands/README.md) |
| syncpack format、package.json 整形 | commands | [references/commands/README.md](references/commands/README.md) |
| syncpack list / json、依存関係出力 | commands | [references/commands/README.md](references/commands/README.md) |
| 特定バージョンに固定（pinned）、最高・最低バージョンに統一 | version-groups | [references/version-groups/README.md](references/version-groups/README.md) |
| 依存関係の禁止（banned）、チェック除外（ignored） | version-groups | [references/version-groups/README.md](references/version-groups/README.md) |
| catalog プロトコル強制、pnpm/Bun catalog 対応 | version-groups | [references/version-groups/README.md](references/version-groups/README.md) |
| snapTo、sameRange、sameMinor、semverRangeOnly ポリシー | version-groups | [references/version-groups/README.md](references/version-groups/README.md) |
| semver range 統一（^ ~ 固定）、range チェック除外 | semver-groups | [references/semver-groups/README.md](references/semver-groups/README.md) |
| updateGroups、patch/minor のみ更新制限 | update-groups | [references/update-groups/README.md](references/update-groups/README.md) |
| 特定依存のアップデート除外 | update-groups | [references/update-groups/README.md](references/update-groups/README.md) |
| .syncpackrc 設定ファイル、設定形式 | config | [references/config/README.md](references/config/README.md) |
| customTypes、source、sourceMode、dependencyGroups 設定 | config | [references/config/README.md](references/config/README.md) |
| sortAz、sortFirst、sortExports、sortPackages、ソート設定 | config | [references/config/README.md](references/config/README.md) |
| minimumReleaseAge、maxConcurrentRequests、severity、strict | config | [references/config/README.md](references/config/README.md) |
| formatBugs、formatRepository、indent 設定 | config | [references/config/README.md](references/config/README.md) |
| 依存関係型一覧（dev, peer, prod 等）、specifier 型、ステータスコード、用語集 | reference | [references/reference/README.md](references/reference/README.md) |
| 典型的な使い方を知りたい、CI 連携、設定例 | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
