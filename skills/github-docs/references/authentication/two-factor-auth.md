# 二要素認証 (Two-Factor Authentication / 2FA)

二要素認証（2FA）は、パスワードに加えて別の認証要素を要求することで、GitHub アカウントのセキュリティを強化する仕組みです。

## 2FA の必須化

2023 年 3 月より、GitHub.com でコードをコントリビュートするすべてのユーザーに対して 2FA の有効化が段階的に義務付けられています。対象ユーザーにはメール通知が送信され、45 日間の登録期間が与えられます。

## サポートされる認証方法

| 方法 | 説明 | 推奨度 |
|------|------|--------|
| TOTP アプリ | 時間ベースのワンタイムパスワードアプリ | 最も推奨 |
| セキュリティキー | WebAuthn 対応のハードウェアキー（YubiKey など） | 高い |
| GitHub Mobile | GitHub Mobile アプリによるプッシュ通知認証 | 高い |
| パスキー | プラットフォーム認証（Windows Hello, Face ID, Touch ID） | 高い |
| SMS | テキストメッセージによるコード送信 | 代替手段 |

> 一部の組織では SMS ベースの 2FA を禁止し、TOTP の使用を要求する場合があります。

## 設定手順

### 共通の手順

1. **Settings** > **Password and authentication** に移動
2. **Enable two-factor authentication** をクリック
3. 選択した方法に従って設定を完了
4. **リカバリーコードをダウンロードして安全に保管する**（必須）

### TOTP アプリの設定

1. TOTP 対応アプリをインストール（例: 1Password, Authy, Google Authenticator, Microsoft Authenticator）
2. GitHub に表示された QR コードをアプリでスキャン
3. アプリに表示されたコードを GitHub に入力して確認

TOTP の設定パラメータ:

| パラメータ | 値 |
|-----------|---|
| Type | TOTP |
| Label | GitHub:[username] |
| Algorithm | SHA1 |
| Digits | 6 |
| Period | 30 秒 |

> 複数デバイスに設定する場合は、同時に QR コードをスキャンするか、セットアップキーを保存しておきます。

### セキュリティキーの設定

1. WebAuthn 対応のセキュリティキー（例: YubiKey）を用意
2. 2FA 設定画面で **Security keys** セクションの **Register** をクリック
3. ブラウザのプロンプトに従ってキーをタッチまたは挿入

### GitHub Mobile の設定

1. GitHub Mobile アプリをインストール・ログイン
2. 2FA 設定画面で GitHub Mobile を有効化
3. ログイン時にアプリへプッシュ通知が送信される

### パスキーの設定

1. 2FA 設定画面で **Passkeys** セクションの **Add a passkey** をクリック
2. プラットフォームの認証プロンプト（Face ID, Touch ID, Windows Hello）に従って登録

### SMS の設定

1. 2FA 設定画面で国コードを選択し、携帯電話番号を入力
2. テキストメッセージで受信したコードを入力して確認

## リカバリーコード

リカバリーコードは、すべての認証方法にアクセスできなくなった場合にアカウントを回復するためのバックアップコードです。

- 2FA 設定時に自動生成される
- **安全な場所に保管**する（パスワードマネージャー、印刷、暗号化ストレージなど）
- 各コードは 1 回のみ使用可能
- **Settings** > **Password and authentication** から再生成可能（古いコードは無効化される）

## 28 日間の確認期間

2FA を有効化した後、28 日以内に 2FA を使用してログインに成功する必要があります。この期間内に確認が完了しないと、アカウントへのアクセスに影響が出る可能性があります。

## 注意事項

- 組織が 2FA を要求している場合、2FA を無効にすると組織から自動的に削除される
- 外部コラボレーターが 2FA を無効にすると、プライベートリポジトリのフォークへのアクセスを失う
- 2FA を有効にした後、既存のセッションは有効なままだが、GitHub API へのアクセスには PAT や SSH キーが必要

## 参考リンク

- [Configuring two-factor authentication - GitHub Docs](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication)
