# debug

knip のデバッグ・パフォーマンス分析・トレースコマンド集。

## デバッグモードの有効化

```sh
knip --debug
```

表示内容:
- 含まれるワークスペース一覧
- ワークスペースごとの設定
- 有効なプラグイン一覧
- glob パターンとマッチしたファイルパス
- プラグイン設定ファイルのパスと検出された依存関係
- コンパイルされた非標準ソースファイル

## メモリ使用量の表示

```sh
knip --memory
```

```sh
knip --memory-realtime
```

## パフォーマンス統計の表示

```sh
knip --performance
```

## 単一関数のプロファイリング

```sh
knip --performance-fn <関数名>
```

## エクスポートの import 箇所のトレース

```sh
knip --trace
```

## 特定ファイルのエクスポートトレース

```sh
knip --trace-file src/utils.ts
```

正規表現パターンも使用可能。

## 特定エクスポート名のトレース

```sh
knip --trace-export myFunction
```

## 特定パッケージ・バイナリ参照のトレース

```sh
knip --trace-dependency lodash
```

## ワークスペースフィルタと組み合わせてトレース

```sh
knip --trace --workspace packages/my-lib
```

トレース凡例: ✓ (import あり) / x (import なし) / ◯ (エントリーファイル)
