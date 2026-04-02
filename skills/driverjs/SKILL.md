---
name: driverjs
description: >
  Driver.js プロダクトツアー・要素ハイライトライブラリ API リファレンス。
  driver, highlight, tour steps, popover, overlay, theming, configuration
user-invocable: false
---

# Driver.js API リファレンス

Driver.js 公式ドキュメントの全 API を網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/driverjs/
├── SKILL.md                                    ← このファイル（エントリーポイント）
└── references/
    ├── getting-started/README.md               ← インストール・基本操作（2ページ）
    ├── api/README.md                           ← 設定・メソッド・テーマ（3ページ）
    ├── examples/README.md                      ← ユースケース別サンプル（4ページ）
    └── migration/README.md                     ← バージョン移行（1ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| npm install, CDN, import, driver() 初期化, ツアー開始, highlight | getting-started | [references/getting-started/README.md](./references/getting-started/README.md) |
| Config オプション, Popover 型, DriveStep 型, State 型, コールバック/フック | api | [references/api/README.md](./references/api/README.md) |
| drive(), moveNext(), destroy(), getState(), setConfig(), refresh() | api | [references/api/README.md](./references/api/README.md) |
| CSS クラス, popoverClass, onPopoverRender, テーマカスタマイズ | api | [references/api/README.md](./references/api/README.md) |
| アニメーション/静的ツアー, 進捗表示, 非同期ステップ, 終了確認 | examples | [references/examples/README.md](./references/examples/README.md) |
| ポップオーバー配置 (side/align), ボタン設定, オーバーレイスタイル | examples | [references/examples/README.md](./references/examples/README.md) |
| 単一要素ハイライト, フォームヘルプ, モーダル表示 | examples | [references/examples/README.md](./references/examples/README.md) |
| 0.x → 1.x 移行, 破壊的変更, API リネーム | migration | [references/migration/README.md](./references/migration/README.md) |
