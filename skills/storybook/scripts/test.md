# Test

Storybook のテスト実行コマンド。

## Vitest アドオンによるストーリーテストの実行

```sh
vitest --project=storybook
```

package.json に `"test-storybook": "vitest --project=storybook"` を定義している場合:

```sh
npm run test-storybook
```

## カバレッジ付きでストーリーテストを実行

```sh
npm run test-storybook -- --coverage
```

カバレッジレポートはデフォルトで `./coverage` に出力される。

## 全プロジェクトのテストを実行（ユニットテスト含む）

```sh
npx vitest
```

## カバレッジ付きで全テストを実行

```sh
npx vitest --coverage
```

CI 環境では全プロジェクトを対象にしたカバレッジ収集が推奨される。

## ユニットテストプロジェクトのみ実行

```sh
vitest --project=unit
```

## 公開済み Storybook を指定してテストを実行

```sh
SB_URL='https://your-storybook-url' npm run test-storybook
```

デバッグ時に公開済みの Storybook URL を指定して実行する。
