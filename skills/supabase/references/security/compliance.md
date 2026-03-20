# コンプライアンス

## SOC2 Type II

### 概要

Supabase は SOC2 Type II 認証を取得している。これは独立した監査法人によるセキュリティ統制の有効性の証明。

### 対象範囲

- セキュリティ（Security）
- 可用性（Availability）
- 機密性（Confidentiality）

### レポートの取得

SOC2 レポートは NDA（秘密保持契約）の下で Enterprise プランの顧客に提供される。Supabase サポートに問い合わせて取得する。

## HIPAA

### 概要

HIPAA（Health Insurance Portability and Accountability Act）は米国の医療データ保護法。Supabase は HIPAA 準拠の構成をサポートする。

### 前提条件

- **Pro プラン以上**
- HIPAA アドオンの有効化が必要
- BAA（Business Associate Agreement）の締結が必要

### 設定手順

1. **BAA の締結**: Supabase サポートに連絡して BAA を締結
2. **HIPAA アドオンの有効化**: ダッシュボードまたはサポート経由で有効化
3. **推奨設定の適用**

### 推奨設定

```sql
-- すべてのテーブルで RLS を有効化
ALTER TABLE public.patient_records ENABLE ROW LEVEL SECURITY;

-- 厳格なアクセスポリシー
CREATE POLICY "Only authorized staff"
  ON public.patient_records FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id FROM public.staff
      WHERE has_hipaa_access = true
    )
  );
```

### 追加の要件

- SSL 接続の強制
- ネットワーク制限の設定
- 監査ログの有効化
- MFA の強制
- データの暗号化（Supabase がデフォルトで提供）
- アクセスログの保持と監視
- インシデント対応計画

### PHI（保護対象医療情報）の取り扱い

- PHI は暗号化されたカラムに保存することを推奨
- 不要な PHI はマスキングまたは匿名化する
- PHI へのアクセスはログに記録する

```sql
-- pgcrypto を使用した暗号化
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 暗号化してデータを保存
INSERT INTO patient_records (ssn_encrypted)
VALUES (pgp_sym_encrypt('123-45-6789', 'encryption-key'));

-- 復号化して取得
SELECT pgp_sym_decrypt(ssn_encrypted, 'encryption-key') AS ssn
FROM patient_records;
```

## データ処理契約

### DPA（Data Processing Agreement）

GDPR やその他のデータ保護法に基づくデータ処理契約。

### 対象

- EU の顧客（GDPR 要件）
- 個人データを処理するすべてのケース

### 取得方法

- Supabase の Web サイトからダウンロード可能
- Enterprise プランの場合はカスタム DPA が可能

### GDPR 対応のポイント

- データ所在地: EU リージョン（eu-west-1, eu-central-1 等）を選択
- データ削除: ユーザーの「忘れられる権利」に対応する機能を実装
- データポータビリティ: ユーザーデータのエクスポート機能を実装
- 同意管理: 適切な同意取得メカニズムを実装

```sql
-- ユーザーデータの完全削除（忘れられる権利）
CREATE OR REPLACE FUNCTION public.delete_user_data(target_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.posts WHERE user_id = target_user_id;
  DELETE FROM public.comments WHERE user_id = target_user_id;
  DELETE FROM public.profiles WHERE id = target_user_id;
  -- Auth ユーザーの削除は管理 API 経由で行う
END;
$$;
```

## その他のコンプライアンス

### データ所在地

- リージョン選択によりデータの物理的な所在地を制御可能
- 特定の国のデータ保護法に準拠するためにリージョンを選択

### 暗号化

| 種別 | 方式 | 状態 |
|------|------|------|
| 保存時暗号化 | AES-256 | デフォルトで有効 |
| 転送時暗号化 | TLS 1.2+ | デフォルトで有効 |
| カラムレベル暗号化 | pgcrypto | 手動設定 |

### 監査ログ

- API アクセスログ
- Auth ログ（ログイン/ログアウト）
- データベースログ
- ダッシュボードの操作ログ

### PCI DSS

- Supabase 自体は PCI DSS 認証を提供していない
- クレジットカード情報は Stripe 等の PCI DSS 準拠のサービスで処理することを推奨
- Supabase にクレジットカード番号を保存しないこと

## コンプライアンスチェックリスト

- [ ] 必要な認証/契約（SOC2, HIPAA BAA, DPA）を確認
- [ ] 適切なリージョンを選択（データ所在地要件）
- [ ] RLS を全テーブルで有効化
- [ ] SSL 接続を強制
- [ ] ネットワーク制限を設定
- [ ] MFA を強制
- [ ] 監査ログを有効化
- [ ] データ保持ポリシーを設定
- [ ] インシデント対応計画を策定
- [ ] 定期的なコンプライアンスレビューを実施

## 関連

- [セキュリティ概要](./overview.md) — セキュリティ全体像
- [課金](../platform/billing.md) — プラン要件
