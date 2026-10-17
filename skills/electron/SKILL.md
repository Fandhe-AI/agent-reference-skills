---
name: electron
description: >
  Electron (Chromium + Node.js 製クロスプラットフォームデスクトップアプリフレームワーク, v44) の
  リファレンス。main / renderer / preload / utilityProcess, ipcMain / ipcRenderer / contextBridge,
  BrowserWindow / BaseWindow / WebContentsView / webContents, Electron Forge, autoUpdater,
  safeStorage, fuses, ASAR, contextIsolation / sandbox, code signing, MAS, crashReporter,
  contentTracing, debugging, E2E testing, breaking changes。
user-invocable: false
---

# Electron

> 分割 PR の途中段階。現在収録済み: references/{app, breaking-changes, debugging-testing}。冒頭説明・description に挙げた残りの範囲は後続 PR で追加し、最終 PR でこの行を削除する。

対象バージョン Electron v44.8.0: GitHub tag v44.8.0 (electron/electron)。npm latest = 44.8.0（2026-10-16 公開）。原本は 2026-10-17 に `raw.githubusercontent.com/electron/electron/v44.8.0/docs/` から取得。`main` および `44-x-y` ブランチは使用しない。45.0.0-beta は対象外。公式サイトに `llms.txt` / `.md` twin は無い。

## ディレクトリ構成

主要ファイルのみ記載。全ページは各カテゴリの `README.md` の索引表を参照。

```text
skills/electron/
  SKILL.md
  references/
    app/                    # app モジュール（イベント・ライフサイクル・パス・ログイン項目・Jump List）
      README.md
      app-events-lifecycle.md
      app-lifecycle-methods.md
      app-paths-name-locale.md
      app-properties.md
    debugging-testing/      # debugging / crashReporter / contentTracing / automated testing / headless CI
      README.md
      application-debugging.md
      debugging-main-process.md
      crash-reporter.md
      automated-testing.md
      testing-on-headless-ci.md
    breaking-changes/       # v2 から v44 までの breaking changes
      README.md
      breaking-changes-overview.md
      breaking-changes-v44.md
      breaking-changes-v43.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

他スキルとの境界（Menu / Tray / dialog / Notification / session / protocol 等の同名 API）は各ページの `## Notes` に記載。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| app の起動・終了・single instance・パス・ログイン項目・Jump List を扱いたい | app | [references/app/README.md](references/app/README.md) |
| デバッグ・クラッシュレポート・E2E テスト・headless CI を整えたい | debugging-testing | [references/debugging-testing/README.md](references/debugging-testing/README.md) |
| バージョン更新で削除・変更された API を確認したい | breaking-changes | [references/breaking-changes/README.md](references/breaking-changes/README.md) |
