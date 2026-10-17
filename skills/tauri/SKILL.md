---
name: tauri
description: >
  Tauri v2 (Rust + WebView のデスクトップ / モバイルアプリフレームワーク、Electron とは別) リファレンス。
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
- 公式プラグイン: plugins-workspace の各 v2 タグ（プラグインごとに最新タグ。タグは各ページの `## Notes` の Source 行を参照）

除外: Tauri v3 alpha と Tauri v1。

## ディレクトリ構成

各カテゴリの全ページは各 `README.md` の索引表を参照する（下記は主要ページのみ）。

```text
skills/tauri/
  SKILL.md
  references/
    getting-started/        # 概要・前提条件・プロジェクト作成・フロントエンド別ガイド・IPC・Process Model・v1/beta 移行
      README.md
      overview.md
      prerequisites.md
      create-project.md
      inter-process-communication.md
      process-model.md
      frontend-vite.md
      migrate-from-tauri-1.md
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
    security/               # capabilities / permissions / scope / runtime authority / CSP / ACL スキーマ
      README.md
      capabilities.md
      permissions.md
      scope.md
      runtime-authority.md
      csp.md
      core-permissions.md
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
    rust-api/               # tauri crate の Rust API
      README.md
      crate-overview.md
      builder.md
      app-handle.md
      command-macros.md
      manager.md
      state.md
      events.md
      plugin-builder.md
      webview-window.md
    js-api/                 # @tauri-apps/api
      README.md
      overview.md
      core.md
      event.md
      window.md
      webview-window.md
      menu.md
      tray.md
      path.md
    plugins-core/           # 公式コアプラグイン（ガイド）: fs / http / shell / sql / store / log など
      README.md
      overview.md
      file-system.md
      shell.md
      sql.md
      store.md
    plugin-js-api-core/     # 同 JS API (@tauri-apps/plugin-*)
      README.md
      fs.md
      http.md
      shell.md
      sql.md
      store.md
    plugins-app/            # アプリ機能プラグイン（ガイド）: dialog / updater / notification / deep-link / モバイル系など
      README.md
      dialog.md
      updater.md
      notification.md
      deep-linking.md
      global-shortcut.md
      window-state.md
    plugin-js-api-app/      # 同 JS API (@tauri-apps/plugin-*)
      README.md
      dialog.md
      updater.md
      notification.md
      deep-link.md
      clipboard-manager.md
    distribute/             # バンドル形式・署名・ストア・CI 配布
      README.md
      overview.md
      windows-installer.md
      dmg.md
      appimage.md
      sign-macos.md
      sign-windows.md
      app-store.md
      pipelines-github.md
  samples/
    README.md
    command-with-state-and-channel.md
    system-tray.md
    window-menu.md
    updater-check-install.md
    capabilities-for-windows-and-platforms.md
    webdriver-webdriverio.md
    github-actions-release.md
  scripts/
    README.md
    prerequisites.md
    create-project.md
    dev-build.md
    mobile.md
    plugins-permissions.md
    icons-signer.md
    distribute.md
    info-migrate.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md`（または `samples/` `scripts/` の README.md）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する
4. Rust 側 API は `rust-api`、フロントエンド側 API は `js-api` または `plugin-js-api-*`、プラグインの導入・設定・permission はガイド側 `plugins-core` / `plugins-app` を引く

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Tauri の概要・アーキテクチャ・前提条件・プロジェクト作成を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| Vite / Next.js / SvelteKit / Leptos 等フロントエンドの設定をしたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| IPC・Process Model・Isolation Pattern・v1 / beta からの移行を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| Rust コマンドをフロントエンドから呼びたい（invoke / Channel） | develop | [references/develop/README.md](references/develop/README.md) |
| 状態管理・sidecar・resources・アイコン・プラグイン開発・デバッグ・テスト・WebDriver | develop | [references/develop/README.md](references/develop/README.md) |
| capabilities / permissions / scope (ACL) を設定したい | security | [references/security/README.md](references/security/README.md) |
| CSP・asset protocol・HTTP headers・コア permission を確認したい | security | [references/security/README.md](references/security/README.md) |
| tauri.conf.json の window / bundle / build / app / security 設定 | config | [references/config/README.md](references/config/README.md) |
| tauri dev / build / bundle / android / ios / icon / signer / plugin コマンドのオプション | cli | [references/cli/README.md](references/cli/README.md) |
| Rust の Builder・App・AppHandle・Manager・State・イベント・メニュー・トレイ | rust-api | [references/rust-api/README.md](references/rust-api/README.md) |
| `#[command]` / `generate_handler!` / IPC Channel / プラグインビルダー | rust-api | [references/rust-api/README.md](references/rust-api/README.md) |
| @tauri-apps/api の core / event / window / webview / menu / tray / path | js-api | [references/js-api/README.md](references/js-api/README.md) |
| fs / http / shell / sql / store / log / opener / os / process プラグインの導入と設定 | plugins-core | [references/plugins-core/README.md](references/plugins-core/README.md) |
| コアプラグイン (cli / fs / http / log / opener / os / process / shell / sql / store / stronghold / upload / websocket) の JS 関数シグネチャ (@tauri-apps/plugin-*) | plugin-js-api-core | [references/plugin-js-api-core/README.md](references/plugin-js-api-core/README.md) |
| dialog / updater / notification / deep-link / global-shortcut / window-state / モバイル系プラグインの導入と設定 | plugins-app | [references/plugins-app/README.md](references/plugins-app/README.md) |
| アプリ機能プラグイン (autostart / barcode-scanner / biometric / clipboard-manager / deep-link / dialog / geolocation / global-shortcut / haptics / nfc / notification / positioner / updater / window-state) の JS 関数シグネチャ (@tauri-apps/plugin-*) | plugin-js-api-app | [references/plugin-js-api-app/README.md](references/plugin-js-api-app/README.md) |
| 署名・MSI / NSIS / DMG / AppImage / deb / rpm・各ストア・CI 配布 | distribute | [references/distribute/README.md](references/distribute/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
