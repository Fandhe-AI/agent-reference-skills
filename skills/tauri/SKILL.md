---
name: tauri
description: >
  Tauri (Rust + WebView のデスクトップ / モバイルアプリフレームワーク, v2) の Electron とは別リファレンス。
  tauri.conf.json, tauri CLI, command / invoke / Channel, AppHandle, Tauri capabilities / permissions (ACL),
  @tauri-apps/api, 公式プラグイン (fs, dialog, updater, store, sql), sidecar, 署名・配布, WebDriver。
user-invocable: false
---

# Tauri v2

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
3. 該当ページの `.md` を Read して詳細を確認する
4. Rust 側 API は `rust-api`、フロントエンド側 API は `js-api` または `plugin-js-api-*`、プラグインの導入・設定・permission はガイド側 `plugins-core` / `plugins-app` を引く

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| tauri.conf.json の window / bundle / build / app / security 設定 | config | [references/config/README.md](references/config/README.md) |
| tauri dev / build / bundle / android / ios / icon / signer / plugin コマンドのオプション | cli | [references/cli/README.md](references/cli/README.md) |
