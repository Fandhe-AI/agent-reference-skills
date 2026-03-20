---
name: playwright
description: >
  Playwright (E2E テストフレームワーク) リファレンス。
  test, expect, page, locator, getByRole, toBeVisible,
  click, fill, route, mock, fixtures, config, auth, trace
user-invocable: false
---

# Playwright E2E テストフレームワーク リファレンス

Playwright の全 API ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/playwright/
├── SKILL.md                              ← このファイル（エントリーポイント）
└── references/
    ├── getting-started/README.md         ← 入門ガイド（3ページ）
    ├── test-runner/README.md             ← テストランナー設定（10ページ）
    ├── core-concepts/README.md           ← コア概念（8ページ）
    ├── guides/README.md                  ← 実践ガイド（12ページ）
    ├── tooling/README.md                 ← ツール（5ページ）
    ├── advanced/README.md                ← 上級トピック（6ページ）
    └── api/README.md                     ← API リファレンス（5ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| テスト作成の基本、最初のテスト、CI セットアップ | getting-started | [references/getting-started/README.md](./references/getting-started/README.md) |
| playwright.config.ts、fixtures、annotations、parallel、retries | test-runner | [references/test-runner/README.md](./references/test-runner/README.md) |
| locators、assertions、actions、auto-waiting、emulation | core-concepts | [references/core-concepts/README.md](./references/core-concepts/README.md) |
| 認証、ネットワークモック、API テスト、ビジュアルテスト、POM | guides | [references/guides/README.md](./references/guides/README.md) |
| CLI コマンド、codegen、trace viewer、UI mode、test agents | tooling | [references/tooling/README.md](./references/tooling/README.md) |
| TypeScript、ブラウザ管理、Chrome 拡張、コンポーネントテスト | advanced | [references/advanced/README.md](./references/advanced/README.md) |
| Page、Locator、BrowserContext、Request、Assertions クラス API | api | [references/api/README.md](./references/api/README.md) |
