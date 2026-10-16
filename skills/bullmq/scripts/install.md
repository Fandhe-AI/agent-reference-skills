# install

BullMQ および関連パッケージのインストールコマンド。

## npm によるインストール

```sh
npm install bullmq
```

公式 quick-start の記載は `npm install bullmq` のみ。v6.0.0 以降、ioredis は optional peer dependency のため、Redis を使う場合は次節の `ioredis` も必要。

## Redis 利用時の ioredis のインストール

```sh
npm install bullmq ioredis
```

v6.0.0 の BREAKING CHANGES で ioredis が直接依存から optional peer dependency に変更された。Redis ユーザーは ioredis を明示的にインストールする必要がある。

## PostgreSQL backend 用の pg のインストール

```sh
npm install pg
```

PostgreSQL backend 利用時のみ必要。`pg` は optional peer dependency で、PostgreSQL backend を実際に使うときに遅延ロードされる（Redis のみのユーザーは不要）。

## node-redis adapter 用の redis のインストール

```sh
npm install redis
```

BullMQ の node-redis adapter を使う場合に必要。BullMQ は peer dependency として `redis >= 5.0.0`（v5 以降）を宣言している。

## yarn によるインストール

```sh
yarn add bullmq
```

## Python (pip) によるインストール

```sh
pip install bullmq
```

## BullMQ Pro のインストール（npm）

> **警告**: BullMQ Pro は有償ライセンスが必要。taskforce.sh からトークンを取得し、`.npmrc` を設定してからインストールすること。

`.npmrc` の設定（リポジトリルートに作成）:

```sh
cat > .npmrc << 'EOF'
@taskforcesh:registry=https://npm.taskforce.sh/
//npm.taskforce.sh/:_authToken=${NPM_TASKFORCESH_TOKEN}
always-auth=true
EOF
```

```sh
npm install @taskforcesh/bullmq-pro
```

## BullMQ Pro のインストール（yarn）

> **警告**: 上記の `.npmrc` 設定が前提。`NPM_TASKFORCESH_TOKEN` 環境変数にトークンを設定すること。

```sh
yarn add @taskforcesh/bullmq-pro
```

## OpenTelemetry 連携パッケージのインストール

```sh
npm add --save bullmq-otel
```

```sh
npm install @opentelemetry/exporter-trace-otlp-proto \
  @opentelemetry/exporter-metrics-otlp-proto
```
