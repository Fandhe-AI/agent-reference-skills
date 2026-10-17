# Install

Vercel CLI のインストール・更新・バージョン確認

## インストール（npm）

```sh
npm i -g vercel
```

## インストール（pnpm）

```sh
pnpm i -g vercel
```

## インストール（yarn）

```sh
yarn global add vercel
```

## インストール（bun）

```sh
bun add -g vercel
```

## ネイティブバイナリの有効化（実験的）

標準の `vercel` パッケージは、対応プラットフォーム向けのネイティブバイナリを optional dependencies として同梱する。optional dependencies を有効にしたままパッケージマネージャーで `vercel` をインストールしたうえで、ネイティブ実行を opt-in する。

```sh
vercel upgrade --enable-binary
```

ランチャーの実行に Node.js は引き続き必要。optional dependencies を省略してネイティブパッケージが無い場合は、optional dependencies を有効にして再インストールする（npm の例）。

```sh
npm install --global vercel@latest --include=optional
vercel upgrade --enable-binary
```

Node.js 実行へ戻す場合。

```sh
vercel upgrade --disable-binary
```

## 旧ネイティブパッケージからの移行

`@vercel/vc-native` を直接インストールしていた場合は、削除して同じパッケージマネージャーで `vercel` をインストールし直す（pnpm の例）。

> **警告**: `@vercel/vc-native` はレガシーパッケージ。パッケージマネージャーによるアップグレードは `vercel` のみを更新し、`@vercel/vc-native` ラッパーは更新しない。

```sh
pnpm remove -g @vercel/vc-native
pnpm add -g vercel@latest
vercel upgrade --enable-binary
```

## バージョン確認

```sh
vercel --version
```

ネイティブ実行時は CLI のバナーに `(native)` と表示される。

## 更新

最新版を指定してインストールコマンドを再実行する。

```sh
npm i -g vercel@latest
```

```sh
pnpm i -g vercel@latest
```

```sh
yarn global add vercel@latest
```

```sh
bun add -g vercel@latest
```

`vercel upgrade` でも更新できる（[upgrade.md](./upgrade.md) 参照）。

## ヘルプの表示

```sh
vercel help
```

特定コマンドのヘルプ表示。

```sh
vercel help [command]
```
