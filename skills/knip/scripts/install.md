# install

knip のインストールとプロジェクトへのセットアップ。

## 自動セットアップ（推奨）

```sh
npm init @knip/config
```

```sh
pnpm create @knip/config
```

```sh
bun create @knip/config
```

```sh
yarn create @knip/config
```

設定ファイルと `package.json` スクリプトを自動生成する。

## 手動インストール

```sh
npm install -D knip typescript @types/node
```

`typescript` と `@types/node` はピア依存関係。互換性向上のために同時インストールを推奨する。

`package.json` に以下を追加する:

```json
{
  "scripts": {
    "knip": "knip"
  }
}
```

## インストールなしで実行

```sh
npx knip
```

```sh
pnpm dlx knip
```

```sh
bunx knip
```

## 動作要件

- Node.js v20.19.0 以上、または Bun
