# アクセス制御

## 組織ロール

Supabase はロールベースのアクセス制御（RBAC）を提供する。

| ロール | プロジェクト作成 | 設定変更 | データ閲覧 | メンバー管理 | 課金管理 |
|--------|---------------|---------|-----------|------------|---------|
| Owner | Yes | Yes | Yes | Yes | Yes |
| Administrator | Yes | Yes | Yes | Yes | No |
| Developer | No | 一部 | Yes | No | No |
| Read-only | No | No | Yes（読み取りのみ） | No | No |

### Owner

- 組織の全権限を持つ
- 課金情報の管理が可能
- 組織の削除が可能
- 他のメンバーを Owner に昇格可能

### Administrator

- プロジェクトの作成・削除が可能
- プロジェクト設定の変更が可能
- メンバーの招待・ロール変更が可能
- 課金情報の閲覧・変更は不可

### Developer

- プロジェクトのデータとスキーマにアクセス可能
- SQL エディタの使用が可能
- 一部のプロジェクト設定の変更が可能
- プロジェクトの作成・削除は不可

### Read-only

- プロジェクトのデータを閲覧のみ可能
- 設定の変更は不可
- SQL エディタは読み取り専用

## メンバー招待

### ダッシュボードから

1. **Organization Settings → Members** に移動
2. **Invite Member** をクリック
3. メールアドレスとロールを入力
4. 招待メールが送信される

### 招待の管理

- 保留中の招待は **Pending Invitations** で確認
- 招待の取り消しが可能
- 招待は 7 日間有効

## 組織 SSO

Team プラン以上で利用可能。SAML 2.0 ベースの SSO を設定できる。

### 対応プロバイダ

- **Google Workspace**
- **Azure AD（Microsoft Entra ID）**
- **Okta**
- その他 SAML 2.0 対応 IdP

### Google Workspace の設定

1. Google Admin Console で SAML アプリを作成
2. Supabase の **Organization Settings → Authentication → SSO** に移動
3. **Add SSO Provider** をクリック
4. Google Workspace の設定情報を入力:
   - Metadata URL または Metadata XML
   - ドメイン名

### Azure AD の設定

1. Azure Portal で Enterprise Application を作成
2. SAML ベースのサインオンを設定
3. Supabase に以下を入力:
   - Metadata URL
   - ドメイン名

### Okta の設定

1. Okta Admin Console で新しいアプリ統合を作成
2. SAML 2.0 を選択
3. Supabase の ACS URL と Entity ID を設定
4. Supabase に Metadata URL を入力

### SSO 有効化後の動作

- 指定ドメインのメールアドレスでのログインは自動的に SSO にリダイレクト
- パスワードベースのログインは無効化される

## MFA 強制

組織内のすべてのメンバーに多要素認証（MFA）を強制できる。

### 設定方法

1. **Organization Settings → Authentication → MFA** に移動
2. **Require MFA for all members** を有効化

### 動作

- MFA 未設定のメンバーは次回ログイン時に MFA 設定を求められる
- TOTP（認証アプリ）がサポートされる
- MFA なしではダッシュボードにアクセス不可

## ベストプラクティス

- 最小権限の原則に従い、必要最小限のロールを付与する
- Owner ロールは最小限のメンバーに限定する
- 本番環境では MFA を強制する
- 大規模チームでは SSO を設定する
- 退職者のアクセスを速やかに削除する

## 関連

- [セキュリティ概要](../security/overview.md) — セキュリティ全体像
- [課金](./billing.md) — プラン・権限
