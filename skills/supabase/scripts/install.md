# Install

Supabase CLI のインストールとアップデート。

## Homebrew でインストール（macOS / Linux）

```sh
brew install supabase/tap/supabase
```

## Scoop でインストール（Windows）

```sh
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

## npm でインストール（プロジェクトローカル）

```sh
npm install supabase --save-dev
```

## yarn でインストール（プロジェクトローカル）

```sh
NODE_OPTIONS=--no-experimental-fetch yarn add supabase --dev
```

## pnpm でインストール（プロジェクトローカル）

```sh
pnpm add supabase --save-dev --allow-build=supabase
```

`--allow-build=supabase` は pnpm 10 以上で必須。それ以前の pnpm ではフラグを省略する。

## npm でインストール（グローバル）

```sh
npm install -g supabase
```

## npx で実行（インストール不要）

```sh
npx supabase --help
```

## バージョン確認

```sh
supabase --version
```

## アップデート（Homebrew）

```sh
brew upgrade supabase
```

## アップデート（Scoop）

```sh
scoop update supabase
```

## アップデート（npm プロジェクトローカル）

```sh
npm update supabase --save-dev
```

## ベータ版のインストール（Homebrew）

```sh
brew install supabase/tap/supabase-beta
brew link --overwrite supabase-beta
```

## ベータ版のインストール（npm）

```sh
npm install supabase@beta --save-dev
```
