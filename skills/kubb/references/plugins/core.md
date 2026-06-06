# @kubb/core

全 Kubb プラグインの基盤となるコアモジュール。`build()` API を提供する。

## インストール

```bash
bun add -d @kubb/core
pnpm add -D @kubb/core
npm install --save-dev @kubb/core
yarn add -D @kubb/core
```

## build() 関数

コード生成プロセスを開始する主要関数。設定に定義されたプラグインとライフサイクルメソッドをトリガーする。

```typescript
import { build } from '@kubb/core'

const { error, files, driver } = await build({
  config: {
    root: '.',
    input: {
      data: '',
    },
    output: {
      path: './gen',
    },
  },
})

console.log(files)
```

## 戻り値

| プロパティ | 型 | 説明 |
|-----------|-----|------|
| `error` | `Error \| undefined` | 生成中に発生したエラー |
| `files` | `KubbFile[]` | 生成されたファイル出力 |
| `driver` | `PluginDriver` | プラグイン実行を管理するドライバーインスタンス |

## ストレージ API（v4.36.0+）

カスタムストレージバックエンドを定義するファクトリ関数:

```typescript
import { defineStorage, fsStorage, memoryStorage } from '@kubb/core'
```

| エクスポート | 説明 |
|------------|------|
| `defineStorage()` | カスタムストレージドライバーの定義 |
| `fsStorage()` | ファイルシステムストレージ（デフォルト） |
| `memoryStorage()` | インメモリストレージ（テスト用） |

## URLPath ヘルパー（v4.36.1+）

カスタムプラグインでパスの標準化・組み立てに使用するユーティリティクラス:

```typescript
import { URLPath } from '@kubb/core'
```

## 設定の型

`build()` は `UserConfig` 型のオブジェクトを受け取る。詳細は [configure](../getting-started/configure.md) を参照。
