# Install

Chakra UI および関連パッケージのインストールコマンド。

## コアパッケージのインストール

```sh
npm i @chakra-ui/react @emotion/react
```

Node.js 20.x 以上が必要。

## Charts パッケージのインストール

```sh
npm i @chakra-ui/charts recharts
```

## Storybook 統合用パッケージのインストール

```sh
npm i @storybook/addon-themes @chakra-ui/react @emotion/react
```

## Vite でのパスエイリアスの設定

プラグインは不要。`vite.config.ts` で `resolve.tsconfigPaths` を有効にする（公式 Vite ガイド 3.37.0 の既定の方法）。

```ts
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
})
```

`tsconfig.json` の `paths` エイリアスを Vite に反映させる設定。

## Vite 7 以下でのパスエイリアス用プラグインのインストール

```sh
npm i -D vite-tsconfig-paths
```

Vite 7 以下では `resolve.tsconfigPaths` の代わりにこのプラグインを使う。

```ts
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
})
```

## CLI のインストール（開発依存）

```sh
npm i -D @chakra-ui/cli
```

`typegen` / `snippet` / `blocks` / `eject` / `component` / `theme` / `docs` コマンドを使う場合に必要。Node.js 20.6.0 以上が必要。

```sh
pnpm add -D @chakra-ui/cli
```

```sh
bun add -d @chakra-ui/cli
```
