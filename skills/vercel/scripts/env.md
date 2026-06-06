# Env

環境変数の管理・取得・実行

## 環境変数の一覧表示

```sh
vercel env ls
```

特定環境の変数を一覧表示。

```sh
vercel env ls [environment]
```

特定環境の特定ブランチの変数を一覧表示。

```sh
vercel env ls [environment] [gitbranch]
```

## 環境変数の追加

対話形式で追加（全環境）。

```sh
vercel env add [name]
```

特定環境に追加。

```sh
vercel env add [name] [environment]
```

特定環境の特定ブランチに追加。

```sh
vercel env add [name] [environment] [gitbranch]
```

ファイルの内容を値として追加（シークレット向け）。

```sh
vercel env add [name] [environment] < [file]
```

センシティブな環境変数として追加（Production/Preview のデフォルト）。

```sh
vercel env add API_TOKEN --sensitive
```

センシティブ扱いをせずに追加（暗号化として保存）。

```sh
vercel env add API_TOKEN production --no-sensitive
```

既存の環境変数を確認なしで上書き。

```sh
vercel env add API_TOKEN production --force
```

## 環境変数の更新

```sh
vercel env update [name]
```

特定環境の変数を更新。

```sh
vercel env update [name] [environment]
```

特定環境の特定ブランチの変数を更新。

```sh
vercel env update [name] [environment] [gitbranch]
```

stdin から値を更新（例: npmrc ファイルの内容）。

```sh
cat ~/.npmrc | vercel env update NPM_RC preview
```

センシティブとして更新。

```sh
vercel env update API_TOKEN --sensitive
```

確認をスキップして更新。

```sh
vercel env update API_TOKEN production --yes
```

## 環境変数の削除

> **警告**: 削除した環境変数はデプロイメントから参照できなくなる。

```sh
vercel env rm [name] [environment]
```

確認をスキップして削除。

```sh
vercel env rm [name] --yes
```

## 環境変数をローカルファイルに書き出し

Development 環境変数を `.env` に書き出す。

```sh
vercel env pull [file]
```

Preview 環境変数を `.env.local` に書き出す。

```sh
vercel env pull --environment=preview
```

特定ブランチの Preview 環境変数を書き出す。

```sh
vercel env pull --environment=preview --git-branch=feature-branch
```

既存ファイルを確認なしで上書き。

```sh
vercel env pull --yes
```

## 環境変数を注入してコマンドを実行（ファイルに書き出さない）

Development 環境変数で Next.js 開発サーバーを起動。

```sh
vercel env run -- next dev
```

Preview 環境変数でテストを実行。

```sh
vercel env run -e preview -- npm test
```

Production 環境変数でビルドを実行。

```sh
vercel env run -e production -- next build
```

特定ブランチの Preview 環境変数でコマンドを実行。

```sh
vercel env run -e preview --git-branch feature-x -- next dev
```
