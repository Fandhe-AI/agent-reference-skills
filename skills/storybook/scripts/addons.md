# Addons

Storybook アドオンのインストール・削除コマンド。

## アドオンのインストールと設定

```sh
storybook add @storybook/addon-essentials
```

インストールと設定（`.storybook/main.js` への追記）を自動で行う。

## a11y（アクセシビリティ）アドオンのインストール

```sh
npx storybook add @storybook/addon-a11y
```

## Vitest アドオンのインストール

```sh
npx storybook add @storybook/addon-vitest
```

Vitest 本体と Vitest アドオンを同時にインストール・設定する。

## ビジュアルテストアドオンのインストール

```sh
npx storybook@latest add @chromatic-com/storybook
```

## パッケージマネージャーを指定してアドオンをインストール

```sh
storybook add @storybook/addon-essentials --package-manager pnpm
```

## ポストインストール設定をスキップ

```sh
storybook add @storybook/addon-essentials --skip-postinstall
```

## アドオンの削除

```sh
storybook remove @storybook/addon-essentials
```

> **警告**: `storybook remove` はアドオンをアンインストールし、`.storybook/main.js` からの設定エントリも削除する。削除前にバックアップを確認すること。
