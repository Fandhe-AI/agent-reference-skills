# BullMQ Pro Install

BullMQ Pro のインストールには taskforce.sh から取得する NPM トークンが必要。`.npmrc` ファイルでレジストリ設定を行い、パッケージをインストールする。

## .npmrc の設定

リポジトリのルートに `.npmrc` ファイルを作成または更新する:

```
@taskforcesh:registry=https://npm.taskforce.sh/
//npm.taskforce.sh/:_authToken=${NPM_TASKFORCESH_TOKEN}
always-auth=true
```

## インストール

パッケージマネージャーでインストールする:

```bash
yarn add @taskforcesh/bullmq-pro
```

または npm を使用:

```bash
npm install @taskforcesh/bullmq-pro
```

## 基本的な使い方

Pro 版のクラスをインポートして使用する:

```typescript
import { QueuePro, WorkerPro } from '@taskforcesh/bullmq-pro';

const queue = new QueuePro('myQueue', {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});

const worker = new WorkerPro('myQueue', async (job) => {
  // ジョブを処理
}, {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});
```

## Docker での設定

Docker ビルドで `.npmrc` ファイルを含める:

```docker
WORKDIR /app
ADD .npmrc /app/.npmrc
RUN npm install
```

## 注意点

- `NPM_TASKFORCESH_TOKEN` 環境変数にトークンを設定する必要がある
- `.npmrc` ファイルにトークンを直接ハードコードしないこと
- CI/CD 環境ではシークレット変数としてトークンを管理する
- Pro 版のクラス名は `QueuePro`、`WorkerPro`、`FlowProducerPro` など、末尾に `Pro` が付く

## 関連

- [./introduction.md](./introduction.md) - BullMQ Pro の概要
- [./support.md](./support.md) - サポートとライセンス
