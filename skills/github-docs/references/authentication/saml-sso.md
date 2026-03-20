# SAML シングルサインオン (SAML SSO)

SAML SSO を使用すると、組織は外部の ID プロバイダー（IdP）を通じてメンバーの認証を一元管理できます。

## SAML SSO の仕組み

1. ユーザーが SAML SSO を使用する組織のリソースにアクセスしようとする
2. GitHub がユーザーを組織の IdP にリダイレクトする
3. ユーザーが IdP で認証を行う（企業の資格情報を使用）
4. 認証成功後、GitHub にリダイレクトされてリソースにアクセス可能になる

ブラウザで最近 IdP にログインしている場合は自動的に認証されます。そうでない場合は、IdP での認証が必要です。

### セッションの有効期間

IdP での認証は定期的に必要です。ログインセッションは通常 **24 時間** で期限切れとなり、再認証が求められます。

## 外部 ID のリンク

SAML SSO で認証すると、GitHub は個人アカウントと IdP 上の外部 ID の間にリンクを記録します。

- 各 GitHub アカウントは組織ごとに **1 つの外部 ID** にのみリンク可能
- 各外部 ID も **1 つの GitHub アカウント** にのみリンク可能
- 外部 ID が既に別の GitHub アカウントにリンクされている場合、エラーが発生する
- リンクの再設定には組織管理者による既存リンクの解除が必要

## PAT の SAML SSO 認可

SAML SSO で保護された組織のリソースに API やコマンドラインからアクセスするには、PAT を組織用に認可する必要があります。

### 認可手順

1. **Settings** > **Developer settings** > **Personal access tokens** に移動
2. 認可したいトークンの **Configure SSO** をクリック
3. 対象組織の **Authorize** をクリック
4. IdP にリダイレクトされた場合は認証を完了する

> SSO が強制された後は、以前に認可されたトークンも再認可が必要になる場合があります。

### 注意点

- Fine-grained PAT と Classic PAT の両方で認可が必要
- 認可されていないトークンで SSO 保護されたリソースにアクセスすると `403 Forbidden` が返される

## SSH キーの SAML SSO 認可

SSH キーも同様に組織用に認可する必要があります。

### 認可手順

1. **Settings** > **SSH and GPG keys** に移動
2. 認可したい SSH キーの **Configure SSO** をクリック
3. 対象組織の **Authorize** をクリック

## OAuth App / GitHub App の認可

- SAML SSO が有効な組織のリソースにアクセスする OAuth App や GitHub App を認可するには、アクティブな SSO セッションが必要
- SSO 強制後、以前に認可済みのアプリも再認可が必要になる

## サポートされる ID プロバイダー

GitHub は SAML 2.0 標準を実装するすべての IdP に対応しています。一般的な IdP:

- Azure Active Directory (Microsoft Entra ID)
- Okta
- OneLogin
- PingOne
- Active Directory Federation Services (AD FS)

## 組織での SAML SSO の設定

SAML SSO は組織の管理者が設定します。設定には以下が必要です:

1. IdP 側で GitHub 用の SAML アプリケーションを作成
2. GitHub の組織設定で SAML SSO を有効化
3. IdP のメタデータ（SSO URL、証明書など）を GitHub に登録
4. テスト認証を実行して正常に動作することを確認

## Enterprise Cloud の SSH 証明書

GitHub Enterprise Cloud ユーザーは、SSH 証明書を使用して個人アカウントにキーを追加せずにリポジトリにアクセスすることもできます。

## 参考リンク

- [About authentication with SAML single sign-on - GitHub Docs](https://docs.github.com/en/authentication/authenticating-with-saml-single-sign-on/about-authentication-with-saml-single-sign-on)
