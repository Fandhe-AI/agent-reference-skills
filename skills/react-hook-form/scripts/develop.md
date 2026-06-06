# Develop

リポジトリをクローンして開発環境をセットアップし、ビルド・テスト・lint を実行するコマンド。
公式 CONTRIBUTING.md（https://github.com/react-hook-form/react-hook-form/blob/master/CONTRIBUTING.md）に記載の手順。

前提: Node.js 20 および pnpm v9 が必要。

## 依存パッケージのインストール

```sh
pnpm install
```

## ビルド

```sh
pnpm build
```

## テスト実行

```sh
pnpm test
```

## 型検査

```sh
pnpm test:type
```

## テストと型検査の一括実行

```sh
pnpm test && pnpm test:type
```

## lint 実行

```sh
pnpm lint
```

## E2E テスト実行

開発サーバーを起動した状態で別ターミナルで実行する。

```sh
# ターミナル 1
pnpm start

# ターミナル 2
pnpm e2e
```
