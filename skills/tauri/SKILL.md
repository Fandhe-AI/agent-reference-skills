---
name: tauri
description: >
  Tauri (Rust + WebView のデスクトップ / モバイルアプリフレームワーク, v2) の Electron とは別リファレンス。
  tauri.conf.json, tauri CLI, command / invoke / Channel, AppHandle,
  Tauri capabilities / permissions (ACL), @tauri-apps/api, sidecar, WebDriver。
user-invocable: false
---

# Tauri v2

> 分割 PR の途中段階。現在収録済み: references/{cli, config, develop}。冒頭説明に挙げた残りの範囲は後続 PR で追加し、最終 PR でこの行を削除する。

## 対象バージョン

Tauri v2。版 pin は次のとおり。

- tauri crate 2.12.4
- @tauri-apps/api 2.12.4
- @tauri-apps/cli 2.12.3
- 公式ドキュメント: tauri-docs の v2 ブランチ、commit 32f68c5
- 公式プラグイン: plugins-workspace の各 v2 タグ（プラグインごとに最新タグ。各ページの `source:` を参照）

除外: Tauri v3 alpha と Tauri v1。

## ディレクトリ構成

各カテゴリの全ページは各 `README.md` の索引表を参照する（下記は主要ページのみ）。

```text
skills/tauri/
  SKILL.md
  references/
    develop/                # コマンド呼び出し・状態管理・sidecar・resources・プラグイン開発・デバッグ・テスト・WebDriver
      README.md
      calling-rust.md
      calling-frontend.md
      state-management.md
      sidecar.md
      plugin-development.md
      mobile-plugin-development.md
      mocking.md
      webdriver-overview.md
    config/                 # tauri.conf.json の各設定オブジェクト
      README.md
      overview.md
      app-config.md
      build-config.md
      bundle-config.md
      window-config.md
      security-config.md
    cli/                    # tauri CLI サブコマンド
      README.md
      dev.md
      build.md
      bundle.md
      android.md
      ios.md
      plugin.md
      signer.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Rust コマンドをフロントエンドから呼びたい（invoke / Channel） | develop | [references/develop/README.md](references/develop/README.md) |
| 状態管理・sidecar・resources・アイコン・プラグイン開発・デバッグ・テスト・WebDriver | develop | [references/develop/README.md](references/develop/README.md) |
| tauri.conf.json の window / bundle / build / app / security 設定 | config | [references/config/README.md](references/config/README.md) |
| tauri dev / build / bundle / android / ios / icon / signer / plugin コマンドのオプション | cli | [references/cli/README.md](references/cli/README.md) |
