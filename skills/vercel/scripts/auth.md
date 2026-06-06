# Auth

Vercel CLI の認証・ログイン・チーム切り替え

## ログイン（インタラクティブ）

```sh
vercel login
```

## メールアドレスを指定してログイン

```sh
vercel login [email]
```

## GitHub 認証でログイン

```sh
vercel login --github
```

## ログアウト

```sh
vercel logout
```

## ログインユーザーの確認

```sh
vercel whoami
```

## CI/CD 環境での認証（トークン経由）

環境変数を使用する方法（コマンドライン引数への露出を避けるため推奨）。

```sh
export VERCEL_TOKEN=<your-token>
vercel deploy
```

`--token` フラグで直接指定する方法（`VERCEL_TOKEN` よりも優先される）。

```sh
vercel deploy --token <your-token>
```

Vercel ダッシュボードの [Tokens ページ](https://vercel.com/account/tokens) でトークンを発行する。

## チームの切り替え

```sh
vercel switch
```

チーム名を指定して切り替え。

```sh
vercel switch [team-name]
```

## チームの一覧・管理

チームの一覧表示。

```sh
vercel teams list
```

新しいチームを追加。

```sh
vercel teams add
```

メンバーを招待。

```sh
vercel teams invite [email]
```
