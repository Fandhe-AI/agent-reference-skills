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

## inngest-cli のインストール（Homebrew）

```sh
brew install inngest/tap/inngest
```

Homebrew が tap を untrusted と警告した場合は、次のコマンドを実行してから再度インストールする。

```sh
brew trust --cask inngest/tap/inngest
```

## inngest-cli のインストール（npm グローバル）

```sh
npm install -g inngest-cli
```

Cloud 操作用コマンド（`inngest login` / `inngest api` 等）は [cli.md](./cli.md) を参照。
