---
name: gcp-networking
description: >
  Google Cloud (GCP) の VPC (peering・Shared VPC・BYOIP)・Cloud NGFW / firewall policies・Cloud DNS・Cloud NAT・Cloud Router (BGP)・Cloud VPN・Cloud Interconnect・Network Connectivity Center・Private Service Connect・Network Intelligence Center・Cloud IDS・Cloud Service Mesh routing (Traffic Director API)・Secure Web Proxy・gcloud edge-cloud。LB は gcp-load-balancing、compute は gcp-compute とは別。
user-invocable: false
---

# gcp-networking

Google Cloud (GCP) のネットワーク系スキル。VPC（ネットワーク・サブネット・ルート・VPC Network Peering・Shared VPC・IP アドレス・BYOIP・内部レンジ・Network Service Tiers・MTU）、ファイアウォール（VPC firewall rules・階層 / グローバル / リージョンの firewall policies・Cloud NGFW のタグ・FQDN・アドレスグループ・firewall endpoints・security profiles・TLS inspection・URL filtering）、Cloud DNS（ゾーン・レコード・DNSSEC・server / response / routing policies）、Cloud NAT（Public NAT / Private NAT・NAT rules）、Cloud Router（BGP・学習 / アドバタイズルート・BGP route policies）、Cloud VPN（HA VPN）、Cloud Interconnect（Dedicated / Partner / Cross-Cloud）、Network Connectivity Center（hub・spoke・NCC Gateway）、Private Service Connect、Private Google Access / private services access / Serverless VPC Access を扱う。加えて Network Intelligence Center（Connectivity Tests・VPC Flow Logs・Firewall Insights・Network Analyzer・Flow Analyzer）、Network Security Integration（in-band / out-of-band・packet mirroring）と Cloud IDS、Secure Web Proxy、Service Directory、Cloud Service Mesh のサービスルーティング（Traffic Director API）、Google Distributed Cloud connected のネットワーク（`gcloud edge-cloud`）と、gcloud 12 グループ・REST（Discovery）・IAM ロールを収録する。分割投入中のため、未投入のカテゴリ（`gcloud` / `iam` / `rest` / `rest-schemas` / `vpc-overview` / `vpc-routes` / `vpc-ip-addresses` / `vpc-peering-shared-vpc` / `firewall-policies` / `network-connectivity-center` / `private-service-connect` / `private-access` / `network-intelligence-center` / `network-security-integration-ids` / `secure-web-proxy` / `service-directory` / `traffic-director` / `gdc-connected`）は後続 PR で追加する。現時点で収録済みのカテゴリは下記のツリーとマッピング表のもの。

参照本文は英語（公式ドキュメント・`gcloud help` の原語）。`traffic-director` カテゴリ（後続 PR で投入）は Cloud Service Mesh のサービスルーティング API のページを収録する（REST の API 名は `trafficdirector`（Traffic Director API）、IAM ロールは Traffic Director Client（`roles/trafficdirector.client`））。非推奨は Classic VPN の動的ルーティング（BGP）が 2025-08-01 に非推奨（`cloud-vpn/classic-vpn-deprecation.md`）。

**ロードバランサー（Cloud Load Balancing・Cloud CDN・Media CDN・Service Extensions の概念と手順）は `gcp-load-balancing`**。ただし `gcloud network-services`（service-lb-policies・meshes・各種 routes・gateways・`wasm-plugins` 等）・`gcloud edge-cache`（Media CDN）・`gcloud service-extensions`（`lb-traffic-extensions` 等）の gcloud・REST・IAM の機械生成ページは本スキルに後続 PR で投入する（それまでは公式リファレンス https://docs.cloud.google.com/sdk/gcloud/reference を引く）。`gcloud compute` のロードバランサー関連リソース（backend-services・forwarding-rules・url-maps・target-*-proxies・health-checks・ssl-certificates・ssl-policies・network-endpoint-groups・backend-buckets）と VPC / firewall / router / VPN / Interconnect / NAT の `gcloud compute` コマンド・Compute REST・`roles/compute.*` は `gcp-compute`。

## ディレクトリ構成

```text
skills/gcp-networking/
  SKILL.md
  references/
    cloud-ngfw/                   # Cloud NGFW: ティア・タグ・アドレスグループ・FQDN・firewall endpoints・security profiles・IPS・TLS inspection・URL filtering
      README.md
      <page>.md
    cloud-dns/                    # Cloud DNS: ゾーン・レコード・policies（server / response / routing）・DNSSEC・ハイブリッド DNS のベストプラクティス・クォータ
      README.md
      <page>.md
    cloud-nat/                    # Cloud NAT: Public NAT・Private NAT・IP とポート・NAT rules・他製品との相互作用・クォータ
      README.md
      <page>.md
    cloud-router/                 # Cloud Router: BGP の動作・学習 / アドバタイズルート・BGP route policies・作成・クォータ
      README.md
      <page>.md
    cloud-vpn/                    # Cloud VPN: HA VPN のトポロジー・ネットワークとルーティングの選択・IKE 暗号・ピアゲートウェイ・クォータ・Classic VPN の BGP 非推奨
      README.md
      <page>.md                   # 例: classic-vpn-deprecation.md
    cloud-interconnect/           # Cloud Interconnect: 種類・用語・Dedicated / Partner / Cross-Cloud・ベストプラクティス・クォータ
      README.md
      <page>.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 概念・手順 → 下記マッピング表でガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（ガイド直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）
2. ロードバランサー・Cloud CDN・Media CDN・Service Extensions の概念・手順は `gcp-load-balancing`。Cloud Armor・IAP・Certificate Manager は `gcp-security`（予定）
3. 非推奨を確認するときは、Classic VPN の動的ルーティングは `cloud-vpn/classic-vpn-deprecation.md`を引く

未投入カテゴリ（`gcloud` / `iam` / `rest` / `rest-schemas` / `vpc-overview` / `vpc-routes` / `vpc-ip-addresses` / `vpc-peering-shared-vpc` / `firewall-policies` / `network-connectivity-center` / `private-service-connect` / `private-access` / `network-intelligence-center` / `network-security-integration-ids` / `secure-web-proxy` / `service-directory` / `traffic-director` / `gdc-connected`）の探索手順は投入時に追加する。それまで gcloud コマンド・REST・IAM ロールは公式リファレンス（https://docs.cloud.google.com/sdk/gcloud/reference 、https://docs.cloud.google.com/iam/docs/roles-permissions ）を引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| Cloud NGFW のティア・secure tags・アドレスグループ・FQDN オブジェクト・firewall endpoints・security profiles・IPS・TLS inspection・URL filtering | cloud-ngfw | [references/cloud-ngfw/README.md](references/cloud-ngfw/README.md) |
| Cloud DNS のゾーン（forwarding / peering / 逆引き）・レコード・server / response / routing policies・DNSSEC・ハイブリッド DNS | cloud-dns | [references/cloud-dns/README.md](references/cloud-dns/README.md) |
| Cloud NAT（Public / Private）・IP とポートの割り当て・NAT rules・クォータ | cloud-nat | [references/cloud-nat/README.md](references/cloud-nat/README.md) |
| Cloud Router の BGP・学習 / アドバタイズルート・BGP route policies・Cloud Router の作成 | cloud-router | [references/cloud-router/README.md](references/cloud-router/README.md) |
| Cloud VPN（HA VPN）のトポロジー・SLA・IKE 暗号・ピアゲートウェイ・事前共有鍵・Classic VPN の BGP 非推奨 | cloud-vpn | [references/cloud-vpn/README.md](references/cloud-vpn/README.md) |
| Cloud Interconnect の種類（Dedicated / Partner / Cross-Cloud）・VLAN アタッチメント・用語・冗長構成・クォータ | cloud-interconnect | [references/cloud-interconnect/README.md](references/cloud-interconnect/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `gcloud` / `iam` / `rest` / `rest-schemas` / `vpc-overview` / `vpc-routes` / `vpc-ip-addresses` / `vpc-peering-shared-vpc` / `firewall-policies` / `network-connectivity-center` / `private-service-connect` / `private-access` / `network-intelligence-center` / `network-security-integration-ids` / `secure-web-proxy` / `service-directory` / `traffic-director` / `gdc-connected`

## 他スキルとの使い分け

- `gcp-load-balancing` — Cloud Load Balancing（Application / Network Load Balancer）・backend services・NEG・URL map・SSL 証明書 / SSL policies・mTLS・Cloud CDN・Media CDN・Service Extensions の概念と手順。本スキルは `gcloud network-services` / `gcloud edge-cache` / `gcloud service-extensions` の gcloud・REST・IAM の機械生成ページと、Cloud Service Mesh のサービスルーティング、Private Service Connect、Secure Web Proxy を担当
- `gcp-compute` — `gcloud compute` と Compute REST（VPC・サブネット・firewall rules・ルート・Cloud Router・VPN・Interconnect・Cloud NAT・ロードバランサーの各リソース・Cloud Armor のセキュリティポリシー）と `roles/compute.*`。本スキルは同じ領域の概念・設計ガイドと、`compute` 以外のネットワーク系グループ・API・ロール
- `gcp-gke` — GKE の Gateway API / Ingress / マルチクラスターと、GKE 上の Cloud Service Mesh（Istio API）。本スキルは GKE 外のサービスルーティング（Mesh / HTTPRoute 等のリソース）と VPC 側の設定
- `gcp-run` — Cloud Run・Cloud Run functions・App Engine。Serverless VPC Access コネクタ（`private-access`・`rest/vpcaccess`・`iam/vpcaccess.md`）は本スキル
- `gcp-storage` — Cloud Storage・Filestore 等。Cloud Storage バケットをバックエンドにするロードバランサーは `gcp-load-balancing`
- `gcp-foundation` — IAM の基盤・リソース階層・ADC・課金・クォータ。本スキルは各製品の IAM ロール（`references/iam/`（後続 PR で投入））
- `gcp-cli` — gcloud 全般のインストール・設定・認証・出力フォーマット。ネットワーク系 12 グループのコマンドは本スキル
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `gcp-security`（予定）— Cloud Armor・IAP・Certificate Manager・Cloud KMS・Security Command Center。Cloud NGFW・Cloud IDS・Secure Web Proxy は本スキル
- `gcp-observability`（予定）— Cloud Logging・Cloud Monitoring。VPC Flow Logs の仕様と Network Intelligence Center は本スキル

## 対象外

次は収録していない。必要なときは公式ドキュメントを確認する（https://docs.cloud.google.com/ 配下）。

- ロードバランシング・Cloud CDN・Media CDN・Service Extensions の概念と手順（`gcp-load-balancing`）
- Cloud Armor・IAP・Certificate Manager（`gcp-security`（予定））
- `gcloud compute` のネットワーク系コマンド・Compute REST・`roles/compute.*`（`gcp-compute`）
- 各カテゴリの個別手順の一部（リソースの作成 / 更新 / 削除の手順ページ・トラブルシューティング・料金・リリースノート・SLA）。収録ページは各カテゴリの README を参照

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-17（ガイド。`docs.cloud.google.com/<path>.md.txt` の Markdown twin。URL に版が無いため取得日で pin）、2026-11-14（機械生成分）、gcloud 593.0.0。Google Distributed Cloud connected のページは正規 URL `distributed-cloud/connected/latest/` を `source:` に使う
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/gcloud/`（後続 PR で投入） `references/iam/`（後続 PR で投入） `references/rest/`（後続 PR で投入） `references/rest-schemas/`（後続 PR で投入） は機械生成（gcloud 593.0.0 の help / IAM roles-permissions reference / `google-api-python-client` 同梱の Discovery document（`main` 時点、commit SHA は未記録））。他の 20 カテゴリは公式ガイド由来の手書き
- gcloud は GA コマンドが gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS のみ
- `number-registry` と `zone-management` は README 上 alpha コマンドのみ。`gcloud` のグループ名と製品名の対応は公式 reference で確認する
- 非推奨: Classic VPN の動的ルーティング（BGP）は 2025-08-01 に非推奨（`cloud-vpn/classic-vpn-deprecation.md`）。
- Preview の機能（Media CDN の拡張・Secure Web Proxy の拡張等）は一部ページが Preview と明記している。各ページの前提を確認してから当てはめる
- ネットワーク製品は機能・リージョンごとに可用性が異なり、頻繁に更新される。新しいフラグ・機能は `gcloud help` と公式 reference で確認する
