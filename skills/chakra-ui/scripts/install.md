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

## Vite でのパスエイリアス用プラグインのインストール

```sh
npm i -D vite-tsconfig-paths
```

`vite.config.ts` の `paths` エイリアスを Vite に反映させるためのプラグイン。

## CLI のインストール（開発依存）

```sh
npm i -D @chakra-ui/cli
```

`typegen` / `snippet` / `blocks` / `eject` コマンドを使う場合に必要。Node.js 20.6.0 以上が必要。

```sh
pnpm add -D @chakra-ui/cli
```

```sh
bun add -d @chakra-ui/cli
```
