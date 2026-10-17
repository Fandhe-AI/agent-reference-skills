---
source: https://vite.dev/guide/troubleshooting#performance-bottlenecks
---

# Debug and Profile

デバッグログと CPU プロファイルの取得コマンド集。

## デバッグログの表示

```sh
vite --debug
vite build --debug
```

`-d, --debug [feat]` でデバッグログを表示、`-f, --filter <filter>` でログを絞り込む。`feat` と `filter` に指定できる具体的な値は CLI ページに記載がない（要確認）。

```sh
vite --debug [feat] --filter <filter>
```

上記は CLI 表の書式。`[feat]` `<filter>` は置き換えて使う。

## 開発サーバーの CPU プロファイル

```sh
vite --profile --open
```

アプリがブラウザーで読み込み終わったらターミナルに戻り、`p` キーで Node.js inspector を停止し、`q` キーで開発サーバーを停止する。

## ビルドの CPU プロファイル

```sh
vite build --profile
```

## プロファイルのファイル名指定

```sh
vite --profile my-profile
vite build --profile=my-profile
```

既定では root に `vite-profile-0.cpuprofile` が生成される。`--profile <name>`（または `--profile=<name>`）で `<name>.cpuprofile` に変わる。生成した CPU プロファイルは https://www.speedscope.app/ の `BROWSE` ボタンからアップロードして確認する。

## プラグインの中間状態の確認

```sh
npm install -D vite-plugin-inspect
```

公式 troubleshooting が紹介するサードパーティ製プラグイン vite-plugin-inspect。dev / build の両方で使え、ボトルネックとなるプラグインや middleware の特定に役立つ。vite.config への追加方法は同プラグインの README を参照（本 docs には記載なし）。
