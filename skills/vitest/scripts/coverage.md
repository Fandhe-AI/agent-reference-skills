# coverage

カバレッジ収集・レポート生成コマンド。

## カバレッジ付きテストの実行

```sh
vitest run --coverage
```

```sh
vitest run --coverage.enabled
```

## カバレッジプロバイダーの指定

v8 プロバイダー（デフォルト）を使用する場合:

```sh
vitest run --coverage --coverage.provider v8
```

istanbul プロバイダーを使用する場合:

```sh
vitest run --coverage --coverage.provider istanbul
```

## カバレッジレポートの出力先指定

```sh
vitest run --coverage --coverage.reportsDirectory ./coverage
```

## カバレッジ対象ファイルの指定

```sh
vitest run --coverage --coverage.include "src/**"
```

## カバレッジ対象外ファイルの指定

```sh
vitest run --coverage --coverage.exclude "src/**/*.test.ts"
```

## 全カバレッジ閾値を 100% に設定して実行

> **警告**: 閾値を満たさない場合、テストが失敗する。

```sh
vitest run --coverage --coverage.thresholds.100
```

## カバレッジレポーターの指定

```sh
vitest run --coverage --coverage.reporter text --coverage.reporter html
```
