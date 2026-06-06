# Install

Vercel CLI のインストール・更新・バージョン確認

## インストール（npm）

```sh
npm i vercel
```

## インストール（pnpm）

```sh
pnpm i vercel
```

## インストール（yarn）

```sh
yarn i vercel
```

## インストール（bun）

```sh
bun i vercel
```

## ネイティブバイナリのインストール（実験的）

```sh
pnpm i -g @vercel/vc-native -f
```

Node.js のインストールが不要な軽量環境向けの実験的機能。`-f` フラグは既存のグローバル bin リンクを置き換えるために必要。

## バージョン確認

```sh
vercel --version
```

## 更新

インストール時と同じコマンドを再実行する。

```sh
npm i vercel
```

## ヘルプの表示

```sh
vercel help
```

特定コマンドのヘルプ表示。

```sh
vercel help [command]
```
