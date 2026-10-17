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

## 環境変数の種別（Secret / Config）

変数は Config または Secret として保存される。デフォルトは Production / Preview / カスタム環境が `secret`、Development が `config`。`--sensitive` は Secret、`--no-sensitive` は Config に対応する（`--visibility` は `--type` の非推奨エイリアス）。

Secret として追加。

```sh
vercel env add API_KEY production --value "sk_live_..." --sensitive --yes
```

Config として追加。

```sh
vercel env add API_URL production --value "https://api.example.com" --no-sensitive --yes
```

Development に Secret として追加。

```sh
vercel env add DEV_API_KEY development --value "sk_test_..." --sensitive --yes
```

`--type` で種別を明示（`config` または `secret`）。

```sh
vercel env add API_URL production --type config --yes
```

`--sensitive` / `--no-sensitive` と矛盾する `--type` を併用するとエラーになる。`NEXT_PUBLIC_` など公開フレームワークプレフィックスの変数は Config として保存される。従来の「Enforce Sensitive Environment Variables」チームポリシーは非推奨で、CLI はローカルで強制しない。

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

Secret として更新。

```sh
vercel env update API_TOKEN --sensitive
```

種別を明示して更新。

```sh
vercel env update API_TOKEN production --type secret
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

ローカルファイルにのみ定義された変数は保持される。値を読み出せない Secret 変数は、ローカルファイルの実値を保持する（実値が無いキーにはプレースホルダーが書かれる）。`VERCEL_OIDC_TOKEN` は常に Vercel から更新される。

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
