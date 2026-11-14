# Auth

Vercel CLI の認証・ログイン・チーム切り替え

## ログイン（インタラクティブ）

```sh
vercel login
```

> **注記**: 現行の公式ページに記載があるのは `vercel login` のみ。`vercel login [email]` / `--github` は現行の公式ドキュメントでは未確認。アカウント未作成の場合は `vercel signup`。

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

チームのスラッグを指定して切り替え（`vercel teams switch [slug]` と同じ）。

```sh
vercel switch [team-name]
```

## チームの一覧・管理

チームの一覧表示。

```sh
vercel teams list
```

新しいチームを作成（非対話では `--slug` と `--name` が必須）。

```sh
vercel teams create
```

```sh
vercel teams create --slug acme --name "Acme Corp"
```

メンバーを招待（非対話では 1 件以上のメールアドレスが必須）。

```sh
vercel teams invite [email...]
```
