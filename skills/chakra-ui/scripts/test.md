# Test

Chakra UI コンポーネントのテスト環境セットアップコマンド。

## テスト依存パッケージのインストール

Vitest を使う場合:

```sh
npm install --save-dev vitest jsdom @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

## Vitest 設定（vitest.config.ts）

```ts
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "jsdom",
  },
})
```

jsdom 環境で DOM API を使えるようにする。

## テストの実行

テストフレームワーク（Vitest / Jest）に応じて、プロジェクトの `package.json` に定義されたコマンドを使用:

```sh
npx vitest
```

```sh
npx vitest run
```

ウォッチモードで実行:

```sh
npx vitest --watch
```
