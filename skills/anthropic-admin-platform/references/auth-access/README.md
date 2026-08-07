# auth-access

Claude API (platform.claude.com) の WIF / 認証。OpenAI 側の同名 WIF 概念は openai-platform-ops を参照。

| Name | Description | Path |
| --- | --- | --- |
| Authentication | 三つの認証方法: API キー、Workload Identity Federation (WIF)、App Attest | [authentication.md](./authentication.md) |
| Manage WIF with the Admin API | WIF サービスアカウント・イシューア・ルールのプログラムによる管理 | [wif-admin-api.md](./wif-admin-api.md) |
| Use WIF with AWS | Lambda・EC2・ECS・EKS から Claude API への WIF 認証（STS identity token） | [wif-aws.md](./wif-aws.md) |
| Use WIF with Microsoft Entra ID | Azure managed identities / Entra Workload Identity の Claude API federation | [wif-azure.md](./wif-azure.md) |
| Use WIF with Google Cloud | Google Cloud 環境（Cloud Run・Functions・App Engine ほか）からの WIF 認証 | [wif-gcp.md](./wif-gcp.md) |
| Use WIF with GitHub Actions | GitHub Actions ワークフロー → Claude API の短期 identity token 認証 | [wif-github-actions.md](./wif-github-actions.md) |
| Use WIF with Kubernetes | 自前・k3s・OpenShift・オンプレ Kubernetes クラスタからの WIF 認証 | [wif-kubernetes.md](./wif-kubernetes.md) |
| Use WIF with Okta | Okta custom authorization server による OAuth 2.0 client_credentials grant | [wif-okta.md](./wif-okta.md) |
| WIF reference | WIF 設定: 環境変数・検証ルール・プロファイル・OAuth スコープ・エラーリファレンス | [wif-reference.md](./wif-reference.md) |
| Use WIF with SPIFFE | SPIRE / SPIFFE 準拠イシューア → JWT-SVID 経由の Claude API 認証 | [wif-spiffe.md](./wif-spiffe.md) |
| Workload Identity Federation | 短期 OIDC トークン利用による長期 API キー不要な WIF 認証方式 | [workload-identity-federation.md](./workload-identity-federation.md) |
