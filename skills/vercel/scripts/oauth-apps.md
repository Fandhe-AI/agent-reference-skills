# OAuth Apps

Vercel Apps (OAuth) の登録・チームへのインストール管理

> **注記**: 公式ドキュメントの `vercel oauth-apps` ページ（`/docs/cli/oauth-apps`）は存在しない。コマンドは 65.16.0 のバイナリ文字列に存在せず、削除された可能性が高い。公式リリースノートでは未確認（2026-11-14 時点）。以下のコマンドは過去の取得内容のままで、現行では動作しない場合がある。

## インストールリクエストの一覧表示

現在のチームに対する保留中のインストールリクエストを表示。

```sh
vercel oauth-apps list-requests
```

JSON 形式で出力。

```sh
vercel oauth-apps list-requests --format json
```

## Vercel App の登録

表示名・スラッグ・リダイレクト URI を指定して新規登録。レスポンスに含まれる `clientId` はインストール時に使用する。

```sh
vercel oauth-apps register --name "My App" --slug my-app --redirect-uri https://app.example.com/oauth/callback
```

## Vercel App のインストール

クライアント ID と権限スコープを指定してチームにインストール。

```sh
vercel oauth-apps install --client-id cl_abc --permission read:project
```

対象プロジェクトを絞り込んでインストール。

```sh
vercel oauth-apps install --client-id cl_abc --permission read:project --projects prj_a,prj_b
```

## インストールリクエストの却下

```sh
vercel oauth-apps dismiss cl_abc123 --yes
```

## Vercel App のアンインストール

> **警告**: `remove` はチームからのアプリのアンインストールであり取り消せない。

```sh
vercel oauth-apps remove inst_abc123 --yes
```
