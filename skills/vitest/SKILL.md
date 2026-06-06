---
name: vitest
description: >
  Vitest (Vite ネイティブテストフレームワーク) リファレンス。
  test, describe, it, expect, vi.fn, vi.mock, vi.spyOn、
  beforeEach / afterEach / beforeAll / afterAll、coverage (v8 / istanbul)、snapshot、
  vitest.config.ts、ワークスペース、ブラウザモード、UI モード、bench。
user-invocable: false
model: sonnet
---

# Vitest API リファレンス

Vitest — Vite ネイティブのテストフレームワーク。
テスト作成・レビュー・リファクタリング時に参照する。

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
    guide/
      README.md
      cli.md
      config.md
      coverage.md
      environment.md
      snapshot.md
      testing-types.md
      workspace.md
    patterns/
      README.md
      mocking.md
      async.md
  samples/
    README.md
    basic-test.md
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
| describe, it/test, hooks, modifiers, each/for を使いたい | api | [references/api/README.md](references/api/README.md) |
| expect のマッチャー（等値・型・数値・コレクション・スナップショット・非同期）を調べたい | api | [references/api/README.md](references/api/README.md) |
| vi.fn, vi.mock, vi.spyOn, タイマー, スタブを使いたい | api | [references/api/README.md](references/api/README.md) |
| vitest.config.ts の設定オプションを調べたい | guide | [references/guide/README.md](references/guide/README.md) |
| CLI コマンド・フラグを調べたい（リファレンス） | guide | [references/guide/README.md](references/guide/README.md) |
| カバレッジ (v8 / istanbul) を設定したい | guide | [references/guide/README.md](references/guide/README.md) |
| テスト環境 (jsdom, happy-dom, edge-runtime) を切り替えたい | guide | [references/guide/README.md](references/guide/README.md) |
| スナップショットテスト・型テスト・ワークスペースを設定したい | guide | [references/guide/README.md](references/guide/README.md) |
| モックパターン (vi.fn, vi.mock, vi.spyOn, 部分モック) を知りたい | patterns | [references/patterns/README.md](references/patterns/README.md) |
| 非同期テスト・フェイクタイマーのパターンを知りたい | patterns | [references/patterns/README.md](references/patterns/README.md) |
| 典型的な使い方・実例を参照したい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・セットアップ手順を知りたい | scripts | [scripts/README.md](scripts/README.md) |
