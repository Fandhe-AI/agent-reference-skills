# Deploy

各プラットフォームへのデプロイ。

## Cloudflare Workers / Pages へのデプロイ（npm）

```sh
npm run deploy
```

## Cloudflare Workers / Pages へのデプロイ（pnpm）

```sh
pnpm run deploy
```

## Cloudflare Workers / Pages へのデプロイ（yarn）

```sh
yarn deploy
```

## Cloudflare Workers / Pages へのデプロイ（bun）

```sh
bun run deploy
```

CI/CD 利用時は `CLOUDFLARE_API_TOKEN` を GitHub Actions シークレットに登録する。

## Vercel へのデプロイ

```sh
vercel deploy
```

## Netlify へのデプロイ

> **警告**: `--prod` フラグを付けると本番環境が直接更新される。

```sh
netlify deploy --prod
```

## Google Cloud Run へのデプロイ

> **警告**: `--allow-unauthenticated` を付けると認証なしで公開エンドポイントが作成される。

```sh
gcloud run deploy my-app --source . --allow-unauthenticated
```

## AWS CDK でのデプロイ（AWS Lambda）

> **警告**: `cdk deploy` はスタックのリソースを作成・変更する。差分を事前に `cdk diff` で確認することを推奨する。

```sh
cdk deploy
```

## Google Cloud Run: gcloud CLI のインストール

```sh
brew install --cask gcloud-cli
```

## Google Cloud Run: gcloud 認証

```sh
gcloud auth login
```

## Google Cloud Run: プロジェクト作成

```sh
gcloud projects create --set-as-default --name="my app"
```

## Google Cloud Run: 必要サービスの有効化

```sh
gcloud services enable run.googleapis.com \
    cloudbuild.googleapis.com
```

## AWS Lambda: CDK プロジェクトの初期化

```sh
mkdir my-app
cd my-app
cdk init app -l typescript
npm i hono
npm i -D esbuild
mkdir lambda
touch lambda/index.ts
```

## Wrangler KV ネームスペースの作成（Cloudflare Pages）

```sh
wrangler kv namespace create MY_KV --preview
```
