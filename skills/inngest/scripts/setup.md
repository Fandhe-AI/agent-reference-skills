# Setup

Inngest SDK のインストールと TypeScript プロジェクトのセットアップ。

## SDK のインストール

```sh
npm install inngest
```

## Next.js プロジェクトの新規作成（App Router）

```sh
npx create-next-app@latest --ts --eslint --tailwind --src-dir --app --import-alias='@/*' inngest-guide
```

## Next.js プロジェクトの新規作成（Pages Router）

```sh
npx create-next-app@latest --ts --eslint --tailwind --no-src-dir --no-app --import-alias='@/*' inngest-guide
```

## inngest-cli のインストール（Bash インストーラ）

```sh
curl -sSfL https://cli.inngest.com/install.sh | sh
```
