# generate

OpenAPI 仕様からコードを生成するコマンド集。

## 基本的なコード生成

```sh
npx kubb generate
```

カレントディレクトリの `kubb.config.ts` を使ってコードを生成する。

## npm スクリプト経由での生成

`package.json` に以下を追加して実行する:

```sh
npm run generate
```

```json
{
  "scripts": {
    "generate": "kubb generate"
  }
}
```

## OpenAPI ファイルを直接指定して生成

```sh
kubb petStore.yaml
```

設定ファイルなしで OpenAPI ファイルを直接指定してコード生成する。

## カスタム設定ファイルを使って生成

```sh
kubb generate --config ./configs/kubb.config.ts
```

## ウォッチモードで生成（変更検知）

```sh
kubb generate --watch
```

入力ファイルの変更を検知して自動的に再生成する。

## 詳細ログ付きで生成

```sh
kubb generate --verbose
```

プラグインのパフォーマンスメトリクスを含む詳細ログを出力する。

## デバッグモードで生成

```sh
kubb generate --debug
```

完全なデバッグログを出力し、`.kubb/kubb-{name}-{timestamp}.log` にログファイルを作成する。

## テレメトリーを無効化して生成

```sh
DO_NOT_TRACK=1 kubb generate
```

```sh
KUBB_DISABLE_TELEMETRY=1 kubb generate
```

匿名使用統計の収集を無効化してコード生成する。

## OpenAPI ファイルの検証

```sh
kubb validate --input petstore.yaml
```

コード生成前に OpenAPI ファイルの構文・構造エラーをチェックする。`@kubb/oas` パッケージが必要。
