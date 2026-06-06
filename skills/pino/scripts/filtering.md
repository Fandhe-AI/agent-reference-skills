# filtering

ログを特定のレベル・条件でフィルタリングして出力

## grep でレベルフィルタリング（info = level 30）

```sh
node app.js | grep '"level":30'
```

## jq でレベルフィルタリング（error = level 50 以上）

```sh
node app.js | jq 'select(.level == 50)'
```

## jq で error レベル以上を抽出

```sh
node app.js | jq 'select(.level >= 50)'
```

## debug モジュールのログを pino で受け取る（pino-debug）

```sh
DEBUG=* node -r pino-debug app.js
```

特定の名前空間のみ有効化する場合は `DEBUG` 環境変数で制御する。

```sh
DEBUG=myapp:* node -r pino-debug app.js
```

事前に `npm install pino-debug` が必要。
