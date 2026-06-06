# migrate

既存の ESLint・Prettier 設定を Biome 設定へ移行するコマンド集。

## ESLint から移行

```sh
biome migrate eslint --write
```

> **警告**: `biome.json` を上書きする。実行前にバックアップまたは VCS でコミットしておくこと。

ESLint の設定を読み取り、対応する Biome ルールへ変換する。

## ESLint から移行（ESLint に着想を得たルールも含める）

```sh
biome migrate eslint --write --include-inspired
```

## Prettier から移行

```sh
biome migrate prettier --write
```

> **警告**: `biome.json` を上書きする。実行前にバックアップまたは VCS でコミットしておくこと。

Prettier の設定を読み取り、Biome のフォーマッター設定へ変換する。

## ESLint + Prettier を一括移行

```sh
biome migrate eslint --write
biome migrate prettier --write
```

## npm 経由で ESLint から移行

```sh
npx @biomejs/biome migrate eslint --write
```

## npm 経由で Prettier から移行

```sh
npx @biomejs/biome migrate prettier --write
```

## pnpm 経由で ESLint から移行

```sh
pnpx @biomejs/biome migrate eslint --write
```

## pnpm 経由で Prettier から移行

```sh
pnpx @biomejs/biome migrate prettier --write
```

## bun 経由で ESLint から移行

```sh
bunx --bun @biomejs/biome migrate eslint --write
```

## deno 経由で ESLint から移行

```sh
deno run -A npm:@biomejs/biome migrate eslint --write
```
