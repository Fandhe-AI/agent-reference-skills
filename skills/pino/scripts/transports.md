# transports

ログを外部サービス・ファイル等へ転送するトランスポートの実行（レガシーパイプ方式）

> **警告**: パイプ方式はレガシーアプローチ。v7 以降は `pino.transport()` API によるワーカースレッド方式が推奨される。

## Elasticsearch へ転送

```sh
node app.js | pino-elasticsearch
```

```sh
node app.js | pino-elasticsearch --node http://192.168.1.42:9200
```

事前に `npm install pino-elasticsearch` が必要。

## TCP/UDP ソケットへ転送（Logstash 等）

```sh
node app.js | pino-socket -a 127.0.0.1 -p 5000 -m tcp
```

事前に `npm install pino-socket` が必要。

## Loki へ転送

```sh
node app.js | pino-loki --hostname localhost:3100 --labels='{ "application": "my-app"}'
```

事前に `npm install pino-loki` が必要。

## CloudWatch へ転送

```sh
node app.js | pino-cloudwatch --group my-log-group
```

## Datadog へ転送

```sh
node foo | pino-datadog --key YOUR_API_KEY
```

## Syslog 形式で転送

```sh
node app.js | pino-syslog | pino-socket -a syslog.example.com
```

事前に `npm install pino-syslog pino-socket` が必要。

## Papertrail へ転送

```sh
node app.js | pino-papertrail --host bar.papertrailapp.com --port 12345
```

## WebSocket 経由で転送

```sh
node app.js | pino-websocket -a server.example.com -p 3004
```

## HTTP エンドポイントへ転送

```sh
node app.js | pino-http-send -u http://localhost:8080/logs
```

## Kafka へ転送

```sh
node index.js | pino-kafka -b 10.10.10.5:9200 -d mytopic
```

## LogDNA へ転送

```sh
node index.js | pino-logdna --key YOUR_INGESTION_KEY
```
