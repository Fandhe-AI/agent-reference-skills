# Dev

開発サーバー起動・ウォッチモードコマンド。

## 全パッケージの開発サーバー起動

```sh
turbo run dev
turbo dev
```

`turbo.json` で `"persistent": true` を設定した dev タスクが対象。

## 特定パッケージのみ起動

```sh
turbo run dev --filter=web
turbo dev --filter=web
```

## 依存パッケージを含めて起動

```sh
turbo dev --filter=web...
```

## ウォッチモードで開発

```sh
turbo watch dev
turbo watch dev lint
```

ファイル変更を検知してタスクを自動再実行する。依存関係グラフを考慮し、変更されたパッケージの下流タスクも再実行する。

`"persistent": true` のタスクは `turbo watch` に無視される。`"interruptible": true` のタスクは変更検知時に再起動される。

## 実験的なキャッシュ書き込み付きウォッチ

```sh
turbo watch dev --experimental-write-cache
```

## ティアダウンスクリプトの手動実行

```sh
turbo run dev:teardown
```

Turborepo はティアダウンスクリプトを自動実行しないため、手動で呼び出す。

## ターミナル UI キーバインド

| キー | 機能 |
|---|---|
| `m` | キーバインドメニューの表示切替 |
| `↑` / `↓` または `j` / `k` | タスクリストのナビゲーション |
| `p` | 選択タスクのピン留め切替 |
| `h` | タスクリストの表示切替 |
| `c` | ハイライトされたログをコピー |
| `u` / `d` | ログのスクロール上下 |
| `i` | タスクとのインタラクション開始 |
| `Ctrl+z` | インタラクションの停止 |
