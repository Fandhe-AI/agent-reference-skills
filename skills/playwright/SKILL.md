---
name: playwright
description: >
  Playwright (E2E / コンポーネントテストフレームワーク) リファレンス。
  test, expect, page, locator, getByRole / getByText / getByLabel / getByTestId、
  toBeVisible, click, fill, route, mock, fixtures、
  playwright.config.ts、auth 永続化、trace viewer、codegen、UI モード。
user-invocable: false
model: sonnet
---

# Playwright E2E テストフレームワーク リファレンス

Playwright の全 API ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/playwright/
  SKILL.md
  references/
    getting-started/
      README.md
      ci.md
      running-and-debugging.md
      writing-tests.md
    test-runner/
      README.md
      annotations.md
      configuration.md
      fixtures.md
      global-setup.md
      parallelism.md
      projects.md
      reporters.md
      retries.md
      timeouts.md
      web-server.md
    core-concepts/
      README.md
      actions.md
      assertions.md
      auto-waiting.md
      emulation.md
      frames.md
      isolation.md
      locators.md
      pages.md
    guides/
      README.md
      accessibility.md
      api-testing.md
      aria-snapshots.md
      authentication.md
      best-practices.md
      dialogs-downloads.md
      events.md
      mock-browser-apis.md
      network.md
      parameterize.md
      pom.md
      visual-testing.md
    tooling/
      README.md
      cli.md
      codegen.md
      test-agents.md
      trace-viewer.md
      ui-mode.md
    advanced/
      README.md
      browsers.md
      chrome-extensions.md
      component-testing.md
      evaluate.md
      service-workers.md
      typescript.md
    api/
      README.md
      assertions.md
      browser-context.md
      locator.md
      page.md
      request.md
  samples/
    README.md
    accessibility-testing.md
    api-testing.md
    authentication.md
    basic-test.md
    codegen.md
    configuration.md
    custom-fixtures.md
    device-emulation.md
    dialog-handling.md
    locators.md
    network-mocking.md
    page-object-model.md
    parameterized-tests.md
    visual-testing.md
  scripts/
    README.md
    install.md
    cli.md
    generate.md
    debug.md
    ci.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| テスト作成の基本、最初のテスト、CI セットアップ、デバッグ実行 | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| playwright.config.ts、fixtures、annotations、parallelism、sharding、retries、timeouts | test-runner | [references/test-runner/README.md](references/test-runner/README.md) |
| locators、assertions、actions、auto-waiting、emulation、frames、isolation | core-concepts | [references/core-concepts/README.md](references/core-concepts/README.md) |
| 認証、ネットワークモック、API テスト、ビジュアルテスト、POM、アクセシビリティ、ベストプラクティス | guides | [references/guides/README.md](references/guides/README.md) |
| CLI コマンド、codegen、trace viewer、UI mode、test agents | tooling | [references/tooling/README.md](references/tooling/README.md) |
| TypeScript、ブラウザ管理、Chrome 拡張、コンポーネントテスト、evaluate、service workers | advanced | [references/advanced/README.md](references/advanced/README.md) |
| Page、Locator、BrowserContext、APIRequestContext、Assertions クラス API | api | [references/api/README.md](references/api/README.md) |
| 典型的な使い方を知りたい、実装サンプルを参照したい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・CI 実行・デバッグコマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
