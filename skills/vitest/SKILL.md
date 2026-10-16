---
name: vitest
description: >
  Vitest 5 (Vite ネイティブテストフレームワーク) リファレンス。
  test, describe, it, expect, vi.fn, vi.mock, vi.spyOn, vi.when、
  beforeEach / afterEach、test.extend fixtures、test tags / annotations、
  coverage (v8 / istanbul)、snapshot、vitest.config.ts、projects (old workspace)、
  Vitest Browser Mode (vitest-browser-react, locators, expect.element)、UI モード、bench fixture。
user-invocable: false
model: sonnet
---

# Vitest API リファレンス

Vitest — Vite ネイティブのテストフレームワーク。
テスト作成・レビュー・リファクタリング時に参照する。

Target: Vitest v5.0.5 (vitest-dev/vitest tag v5.0.5; Node ^22.12.0 / ^24 / >=26, Vite ^6.4 / ^7 / ^8 as a peer dependency)

## ディレクトリ構成

```text
skills/vitest/
  SKILL.md
  references/
    api/
      README.md
      test-api.md
      expect.md
      vi.md
      hooks.md
    guide/
      README.md
      benchmarking.md
      cli.md
      common-errors.md
      config.md
      coverage.md
      debugging.md
      environment.md
      extending-matchers.md
      filtering.md
      improving-performance.md
      in-source.md
      lifecycle.md
      migration-jest.md
      migration-mocha.md
      migration-v5.md
      open-telemetry.md
      parallelism.md
      profiling-test-performance.md
      snapshot.md
      test-annotations.md
      test-context.md
      test-tags.md
      testing-types.md
      ui.md
      workspace.md
    patterns/
      README.md
      async.md
      mocking.md
      mocking-classes.md
      mocking-dates.md
      mocking-file-system.md
      mocking-globals.md
      mocking-requests.md
    browser-mode/
      README.md
      overview.md
      why.md
      multiple-setups.md
      browser-config.md
      locators.md
      interactivity-api.md
      assertions.md
      commands.md
      context-api.md
      render-function.md
      component-testing.md
      visual-regression-testing.md
      aria-snapshots.md
      trace-view.md
      playwright-traces.md
    recipes/
      README.md
      browser-locators.md
      cancellable.md
      conditional-mocking.md
      custom-assertions.md
      db-transaction.md
      disable-isolation.md
      explicit-resources.md
      parallel-sequential.md
      schema-matching.md
      type-narrowing.md
      wait-for.md
      watch-templates.md
    advanced/
      README.md
      getting-started.md
      running-tests.md
      extending-reporters.md
      custom-pool.md
      benchmark-provider.md
  samples/
    README.md
    basic-test.md
    benchmark-fixture.md
    browser-component-test.md
    conditional-mocking-vi-when.md
    coverage-setup.md
    describe-and-hooks.md
    mocking-modules.md
    parameterized-tests.md
    snapshot-testing.md
    spy-on-methods.md
    test-environment.md
    type-testing.md
    workspace-setup.md
  scripts/
    README.md
    cli.md
    coverage.md
    install.md
    setup.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| describe, it/test, hooks (aroundEach / onTestFinished), modifiers, each/for を使いたい | api | [references/api/README.md](references/api/README.md) |
| expect のマッチャー（等値・型・数値・コレクション・スナップショット・非同期）を調べたい | api | [references/api/README.md](references/api/README.md) |
| vi.fn, vi.mock, vi.spyOn, タイマー, スタブを使いたい | api | [references/api/README.md](references/api/README.md) |
| vitest.config.ts の設定オプションを調べたい | guide | [references/guide/README.md](references/guide/README.md) |
| CLI コマンド・フラグを調べたい（リファレンス） | guide | [references/guide/README.md](references/guide/README.md) |
| カバレッジ (v8 / istanbul) を設定したい | guide | [references/guide/README.md](references/guide/README.md) |
| テスト環境 (jsdom, happy-dom, edge-runtime) を切り替えたい | guide | [references/guide/README.md](references/guide/README.md) |
| スナップショットテスト・型テスト・projects (旧 workspace) を設定したい | guide | [references/guide/README.md](references/guide/README.md) |
| Test Context / fixtures・tags・annotations・filtering・lifecycle を知りたい | guide | [references/guide/README.md](references/guide/README.md) |
| カスタムマッチャー・reporters・UI・debugging・in-source testing を使いたい | guide | [references/guide/README.md](references/guide/README.md) |
| パフォーマンス改善・プロファイリング・並列実行・OpenTelemetry・benchmarking を調べたい | guide | [references/guide/README.md](references/guide/README.md) |
| よくあるエラーの原因と対処を知りたい | guide | [references/guide/README.md](references/guide/README.md) |
| v4 → v5 / Jest / Mocha からの移行手順を知りたい | guide | [references/guide/README.md](references/guide/README.md) |
| モックパターン (vi.fn, vi.mock, vi.spyOn, 部分モック) を知りたい | patterns | [references/patterns/README.md](references/patterns/README.md) |
| 日付・グローバル・ファイルシステム・HTTP リクエスト・クラスを詳細にモックしたい | patterns | [references/patterns/README.md](references/patterns/README.md) |
| 非同期テスト・フェイクタイマーのパターンを知りたい | patterns | [references/patterns/README.md](references/patterns/README.md) |
| Browser Mode (locators, interactivity, expect.element, component testing) を使いたい | browser-mode | [references/browser-mode/README.md](references/browser-mode/README.md) |
| Browser Mode の visual regression・trace view・browser 設定を調べたい | browser-mode | [references/browser-mode/README.md](references/browser-mode/README.md) |
| 実践レシピ (DB transaction, vi.when, using, wait-for, isolation) を知りたい | recipes | [references/recipes/README.md](references/recipes/README.md) |
| プログラマティック API・カスタム reporter・カスタム pool・benchmark provider を実装したい | advanced | [references/advanced/README.md](references/advanced/README.md) |
| 典型的な使い方・実例を参照したい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・セットアップ手順を知りたい | scripts | [scripts/README.md](scripts/README.md) |
