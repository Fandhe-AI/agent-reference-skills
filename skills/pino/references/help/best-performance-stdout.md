# Best Performance for Logging to stdout

stdout への直接出力で最高パフォーマンスを得るための設定ガイド。

## デフォルト設定が最速

```js
const log = require('pino')()
```

デフォルト設定（カスタムトランスポートやその他の設定なし）が、通常、stdout への最速ログ出力を実現する。

## パフォーマンスに影響する設定

| 設定 | 影響 |
|------|------|
| `transport` オプション | ワーカースレッドのオーバーヘッドが追加される |
| `formatters` | 各ログ行で関数呼び出しが発生する |
| `serializers` | オブジェクトのシリアライズ処理が追加される |
| `redact` | パス探索とマスキング処理のコストがかかる |
| `pino.multistream()` | 複数ストリームへの分岐オーバーヘッド |

## 推奨パターン

インプロセストランスポートではなく、外部パイプでログを処理する:

```sh
# 開発環境: 整形表示
node app.js | pino-pretty

# 本番環境: ファイル出力
node app.js > app.log

# 本番環境: 外部トランスポート
node app.js | pino-transport
```

## ファイル出力が必要な場合

`pino.destination()` はバッファリングされた書き込みを提供する:

```js
const pino = require('pino')
const logger = pino(pino.destination('./my-log'))
```

非同期モードでさらに高速化:

```js
const logger = pino(pino.destination({ dest: './my-log', sync: false }))
```

## Notes

- カスタム設定を追加するほどオーバーヘッドが増える
- より広範なロギング要件がある場合のみカスタム設定を使用すること
- `pino.destination` はデフォルトの `process.stdout` より高速（SonicBoom ベース）

## Related

- [Transports](../features/transports.md)
- [Asynchronous Logging](../features/asynchronous.md)
- [pino.destination()](../api/statics.md)
- [options](../api/options.md)
