# メールテンプレートカスタマイズ

## 概要

Supabase Auth が送信するメール（確認メール、招待メール、パスワードリセットメール等）のテンプレートをカスタマイズできる。

## テンプレートディレクトリ

ローカル開発では `supabase/templates/` ディレクトリにテンプレートファイルを配置する。

```
supabase/
  templates/
    confirmation.html    # メールアドレス確認
    invite.html          # 招待メール
    recovery.html        # パスワードリセット
    magic_link.html      # マジックリンク
    email_change.html    # メールアドレス変更
```

## テンプレートの種類

### 確認メール（confirmation.html）

```html
<html>
<body>
  <h2>メールアドレスの確認</h2>
  <p>以下のリンクをクリックしてメールアドレスを確認してください。</p>
  <a href="{{ .ConfirmationURL }}">メールアドレスを確認する</a>
  <p>このリンクは24時間有効です。</p>
</body>
</html>
```

### 招待メール（invite.html）

```html
<html>
<body>
  <h2>招待されました</h2>
  <p>以下のリンクをクリックしてアカウントを作成してください。</p>
  <a href="{{ .ConfirmationURL }}">アカウントを作成する</a>
</body>
</html>
```

### パスワードリセットメール（recovery.html）

```html
<html>
<body>
  <h2>パスワードのリセット</h2>
  <p>以下のリンクをクリックしてパスワードをリセットしてください。</p>
  <a href="{{ .ConfirmationURL }}">パスワードをリセットする</a>
  <p>このリンクは1時間有効です。</p>
</body>
</html>
```

### マジックリンクメール（magic_link.html）

```html
<html>
<body>
  <h2>ログインリンク</h2>
  <p>以下のリンクをクリックしてログインしてください。</p>
  <a href="{{ .ConfirmationURL }}">ログインする</a>
  <p>このリンクは5分間有効です。</p>
</body>
</html>
```

### メールアドレス変更メール（email_change.html）

```html
<html>
<body>
  <h2>メールアドレスの変更確認</h2>
  <p>以下のリンクをクリックして新しいメールアドレスを確認してください。</p>
  <a href="{{ .ConfirmationURL }}">新しいメールアドレスを確認する</a>
</body>
</html>
```

## テンプレート変数

| 変数 | 説明 |
|------|------|
| `{{ .ConfirmationURL }}` | 確認/アクション用 URL |
| `{{ .Token }}` | 確認トークン（OTP） |
| `{{ .TokenHash }}` | トークンのハッシュ値 |
| `{{ .SiteURL }}` | サイトの URL |
| `{{ .RedirectTo }}` | リダイレクト先 URL |
| `{{ .Data }}` | ユーザーメタデータ |

### Data 変数の使用例

```html
<p>こんにちは、{{ .Data.name }} さん</p>
```

## config.toml でのテンプレート設定

```toml
[auth.email]
enable_confirmations = true

[auth.email.template.confirmation]
subject = "メールアドレスの確認"
content_path = "./supabase/templates/confirmation.html"

[auth.email.template.invite]
subject = "招待されました"
content_path = "./supabase/templates/invite.html"

[auth.email.template.recovery]
subject = "パスワードのリセット"
content_path = "./supabase/templates/recovery.html"

[auth.email.template.magic_link]
subject = "ログインリンク"
content_path = "./supabase/templates/magic_link.html"

[auth.email.template.email_change]
subject = "メールアドレスの変更確認"
content_path = "./supabase/templates/email_change.html"
```

## Inbucket でのローカルテスト

ローカル開発環境では Inbucket がメールサーバーとして動作する。送信されたメールはすべて Inbucket でキャプチャされる。

### Inbucket UI

- URL: http://localhost:54324
- 送信されたすべてのメールを確認可能
- 確認リンクのクリックテストが可能

### テスト手順

1. ローカルでサインアップやパスワードリセットを実行
2. Inbucket UI（http://localhost:54324）を開く
3. 送信されたメールを確認
4. テンプレートの表示を確認
5. リンクが正しく動作するか確認

## 本番環境でのテンプレート設定

ダッシュボードの **Authentication → Email Templates** から設定する。ローカルのテンプレートファイルとは別に管理される。

## ベストプラクティス

- テンプレートはレスポンシブデザインにする
- プレーンテキスト版も考慮する
- ブランドカラーやロゴを含める
- リンクの有効期限を明記する
- テンプレートの変更はローカルでテストしてから本番に反映する

## 関連

- [メール OTP](../auth/email-passwordless.md) — パスワードレス認証
- [ローカル開発概要](./overview.md) — ローカル環境セットアップ
