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
