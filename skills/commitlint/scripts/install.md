# install

commitlint のパッケージインストール。

## @commitlint/cli と config-conventional のインストール（npm）

```sh
npm install -D @commitlint/cli @commitlint/config-conventional
```

## @commitlint/cli と config-conventional のインストール（yarn）

```sh
yarn add -D @commitlint/cli @commitlint/config-conventional
```

## @commitlint/cli と config-conventional のインストール（pnpm）

```sh
pnpm add -D @commitlint/cli @commitlint/config-conventional
```

## @commitlint/cli と config-conventional のインストール（bun）

```sh
bun add -d @commitlint/cli @commitlint/config-conventional
```

## @commitlint/cli と config-conventional のインストール（deno）

```sh
deno add -D npm:@commitlint/cli npm:@commitlint/config-conventional
```

## Husky のインストール（npm）

```sh
npm install --save-dev husky
```

## Husky のインストール（yarn）

```sh
yarn add --dev husky
```

## Husky のインストール（pnpm）

```sh
pnpm add -D husky
```

## Husky のインストール（bun）

```sh
bun add -d husky
```

## Travis CI 用パッケージのインストール

```sh
npm install --save-dev @commitlint/travis-cli
```

## validate-commit-msg からの移行

> **警告**: 既存の validate-commit-msg 設定を削除する破壊的操作。移行前にバックアップを確認すること。

```sh
npm remove validate-commit-msg --save-dev
npm install --save-dev @commitlint/cli @commitlint/config-conventional
npm install --save-dev husky
```
