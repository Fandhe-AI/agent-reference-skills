# install

BullMQ および関連パッケージのインストールコマンド。

## npm によるインストール

```sh
npm install bullmq
```

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
