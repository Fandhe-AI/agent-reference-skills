# install

vitest および関連パッケージのインストール。

## vitest 本体のインストール

```sh
npm install -D vitest
```

```sh
yarn add -D vitest
```

```sh
pnpm add -D vitest
```

```sh
bun add -D vitest
```

インストールなしで直接実行する場合は `npx vitest` を使用する。

## カバレッジプロバイダーのインストール（v8）

```sh
npm install -D @vitest/coverage-v8
```

```sh
pnpm add -D @vitest/coverage-v8
```

## カバレッジプロバイダーのインストール（istanbul）

```sh
npm install -D @vitest/coverage-istanbul
```

```sh
pnpm add -D @vitest/coverage-istanbul
```

## Vitest UI のインストール

```sh
npm install -D @vitest/ui
```

```sh
pnpm add -D @vitest/ui
```

## ブラウザモード（Playwright プロバイダー）のインストール

```sh
npm install -D vitest @vitest/browser-playwright
```

```sh
yarn add -D vitest @vitest/browser-playwright
```

```sh
pnpm add -D vitest @vitest/browser-playwright
```

```sh
bun add -D vitest @vitest/browser-playwright
```

## ブラウザモード（Preview プロバイダー）のインストール

CI 環境での使用は非推奨。

```sh
npm install -D vitest @vitest/browser-preview
```

```sh
pnpm add -D vitest @vitest/browser-preview
```
