# Install

Storybook のインストールとプロジェクトへの初期設定。

## 新規プロジェクトへのインストール（推奨）

```sh
npm create storybook@latest
```

`create storybook` は Storybook 8.3 以降の推奨インストール方法。

## バージョンを指定してインストール

```sh
npm create storybook@8.3
```

## 既存プロジェクトへの init（8.2 以前）

```sh
npx storybook@8.2 init
```

## 特定フィーチャーを指定してインストール

```sh
npm create storybook@latest --features docs test a11y
```

利用可能な値: `docs`, `test`, `a11y`（スペース区切り）。

## パッケージマネージャーを指定してインストール

```sh
npm create storybook@latest --package-manager=npm
```

`npm`, `yarn`, `pnpm` を指定可能。

## フレームワーク型を指定してインストール

```sh
npm create storybook@latest --type solid
```

## インタラクティブプロンプトをスキップ

```sh
npx storybook@latest init --yes
```

## dev サーバーを起動せずに初期化のみ実行

```sh
npx storybook@latest init --no-dev
```

## インストール後に開発サーバーを起動

```sh
npm run storybook
```
