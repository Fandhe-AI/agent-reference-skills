# install

pino および関連パッケージのインストール

## pino 本体のインストール

```sh
npm install pino
```

```sh
yarn add pino
```

## pino-pretty のインストール（開発用）

```sh
npm install --save-dev pino-pretty
```

pino-pretty は開発環境専用。本番環境での使用は非推奨。

## pino-pretty のグローバルインストール

```sh
npm install -g pino-pretty
```

## pino-test のインストール（テスト用）

```sh
npm install pino-test --save-dev
```

## トランスポートパッケージのインストール

```sh
npm install pino-elasticsearch
```

```sh
npm install pino-loki
```

```sh
npm install pino-roll
```

```sh
npm install @axiomhq/pino
```

```sh
npm install @logtail/pino
```

```sh
npm install pino-sentry-transport
```

## Web フレームワーク連携パッケージのインストール

```sh
npm install pino-http
```

Express / Node core http モジュールで利用する HTTP リクエストロガー。

```sh
npm install hapi-pino
```

```sh
npm install koa-pino-logger
```

```sh
npm install nestjs-pino
```

Fastify は pino を標準バンドル済みのため追加インストール不要。
