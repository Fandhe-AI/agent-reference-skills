# PHP

BullMQ の PHP バインディング。Queue クラス（プロデューサー側）のみを実装しており、ワーカーには Node.js / Python / Elixir / .NET / Rust が必要。

## インストール

GitHub Releases から最新の `bullmq-php-X.X.X.zip` をダウンロードして展開し、ローカルパスリポジトリとして Composer に設定する。

```bash
composer install
```

開発版を GitHub から直接インストールする場合は、VCS リポジトリタイプを使用し `dev-master` を指定する。インストール後に Lua スクリプトのビルドが必要:

```bash
yarn install && yarn build && yarn copy:lua:php
```

## 要件

- PHP 8.1 以上
- Redis 5.0 以上（6.2 以上推奨）
- Composer

## 基本的な使い方

### キューへのジョブ追加

```php
<?php

use BullMQ\Queue;

$queue = new Queue('myQueue');

$job = $queue->add('myJob', ['foo' => 'bar']);

echo "Added job with ID: " . $job->id . "\n";

$queue->close();
```

### ジョブオプションの指定

```php
<?php

use BullMQ\Queue;

$queue = new Queue('myQueue');

// 遅延ジョブ（ミリ秒単位）
$job = $queue->add('sendEmail', $emailData, [
    'delay' => 60000,
]);

// 優先度付きジョブ（数値が小さいほど優先）
$job = $queue->add('urgent', $data, [
    'priority' => 1,
]);

// リトライ設定
$job = $queue->add('flakyOperation', $data, [
    'attempts' => 3,
    'backoff' => [
        'type' => 'exponential',
        'delay' => 1000,
    ],
]);
```

### バルク操作

```php
<?php

$jobs = $queue->addBulk([
    ['name' => 'email', 'data' => ['to' => 'user1@example.com']],
    ['name' => 'email', 'data' => ['to' => 'user2@example.com']],
    ['name' => 'email', 'data' => ['to' => 'user3@example.com']],
]);
```

### キュー管理

```php
<?php

// ジョブ数の取得
$counts = $queue->getJobCounts();
echo "Waiting: " . $counts['waiting'] . "\n";
echo "Active: " . $counts['active'] . "\n";

// 特定ジョブの取得
$job = $queue->getJob('job-id');

// キューの一時停止 / 再開
$queue->pause();
$queue->resume();

// 古いジョブのクリーンアップ（猶予期間 1 時間、最大 100 件、completed 状態）
$cleaned = $queue->clean(3600000, 100, 'completed');
```

### 接続設定

```php
<?php

use BullMQ\Queue;

// カスタム Redis 接続
$queue = new Queue('myQueue', [
    'connection' => [
        'host' => 'redis.example.com',
        'port' => 6379,
        'password' => 'your-password',
    ],
]);

// Redis URI を使用
$queue = new Queue('myQueue', [
    'connection' => 'redis://user:password@localhost:6379/0',
]);
```

## Notes

- PHP 版は Queue クラス（プロデューサー側）のみを実装。ワーカー処理には Node.js / Python / Elixir / .NET / Rust が必要
- 繰り返しジョブやスケジュールジョブは、job scheduler をサポートする SDK（Node.js / Python / Elixir / .NET / Rust）で作成する。PHP クライアントは個別ジョブの追加向けで、スケジューラ管理は対象外（v6.7.6 の公式記述）
- Node.js / Python / Elixir / .NET / Rust と同じ Redis データ構造を共有し、ポリグロットなキュー処理が可能
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/php/introduction.md (tag v6.7.6, fetched 2026-11-14)

## Related

- [Introduction](../guide/introduction.md)
- [Guide](../guide/README.md)
