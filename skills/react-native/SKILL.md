---
name: react-native
description: >
  React Native (Meta 製クロスプラットフォームネイティブアプリフレームワーク, react-native 0.87 / 0.88) の
  Text, TextInput, StyleSheet, Flexbox, Platform, Linking, New Architecture (Fabric, TurboModules,
  Codegen), Hermes。
user-invocable: false
---

# React Native

> 分割 PR の途中段階。現在収録済み: references/{apis, architecture}。冒頭説明・description に挙げた残りの範囲は後続 PR で追加し、最終 PR でこの行を削除する。

## 対象バージョン

React Native 0.87 docs（`react/react-native-website` の `website/versioned_docs/version-0.87`、commit `1ec3a68e4c80a97d05fdd5134d42c03597a46b93`、2026-10-16 時点。サイトリポジトリにリリースタグは無い。取得日 2026-10-17）。出典 URL は `https://reactnative.dev/docs/0.87/<id>` に pin している（`/docs/next` 相当の root `docs/` は使用しない）。

npm の latest は 0.88.0（2026-10-15）だが 0.88 の docs は未 cut（`versions.json` の先頭は 0.87）。0.88 の差分は 0.88 リリースブログ（ユーザー向け breaking change なし）のみを根拠とし、各ページ `## Notes` に `0.88: ...` 形式で記載する。

## ディレクトリ構成

```text
skills/react-native/
  SKILL.md
  references/
    apis/                  # Core APIs
      README.md
      stylesheet.md, platform.md, linking.md, appstate.md, dimensions.md, ...
    architecture/          # New Architecture・Fabric・スレッドモデル・Bundled Hermes
      README.md
      overview.md, fabric-renderer.md, render-pipeline.md, threading-model.md, ...
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| StyleSheet / Platform / Linking / AppState / Dimensions 等の API を使いたい | apis | [references/apis/README.md](references/apis/README.md) |
| New Architecture・Fabric・レンダーパイプライン・スレッドモデル・Bundled Hermes を理解したい | architecture | [references/architecture/README.md](references/architecture/README.md) |
