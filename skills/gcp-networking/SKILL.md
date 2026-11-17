---
name: gcp-networking
description: >
  Google Cloud (GCP) の VPC (peering・Shared VPC・BYOIP)・Cloud NGFW / firewall policies・Cloud DNS・Cloud NAT・Cloud Router (BGP)・Cloud VPN・Cloud Interconnect・Network Connectivity Center・Private Service Connect・Network Intelligence Center・Cloud IDS・Cloud Service Mesh routing (Traffic Director API)・Secure Web Proxy・gcloud edge-cloud。LB は gcp-load-balancing、compute は gcp-compute とは別。
user-invocable: false
---

# gcp-networking

Google Cloud (GCP) のネットワーク系スキル。VPC（ネットワーク・サブネット・ルート・VPC Network Peering・Shared VPC・IP アドレス・BYOIP・内部レンジ・Network Service Tiers・MTU）、ファイアウォール（VPC firewall rules・階層 / グローバル / リージョンの firewall policies・Cloud NGFW のタグ・FQDN・アドレスグループ・firewall endpoints・security profiles・TLS inspection・URL filtering）、Cloud DNS（ゾーン・レコード・DNSSEC・server / response / routing policies）、Cloud NAT（Public NAT / Private NAT・NAT rules）、Cloud Router（BGP・学習 / アドバタイズルート・BGP route policies）、Cloud VPN（HA VPN）、Cloud Interconnect（Dedicated / Partner / Cross-Cloud）、Network Connectivity Center（hub・spoke・NCC Gateway）、Private Service Connect、Private Google Access / private services access / Serverless VPC Access を扱う。加えて Network Intelligence Center（Connectivity Tests・VPC Flow Logs・Firewall Insights・Network Analyzer・Flow Analyzer）、Network Security Integration（in-band / out-of-band・packet mirroring）と Cloud IDS、Secure Web Proxy、Service Directory、Cloud Service Mesh のサービスルーティング（Traffic Director API）、Google Distributed Cloud connected のネットワーク（`gcloud edge-cloud`）と、gcloud 12 グループ・REST（Discovery）・IAM ロールを収録する。分割投入中のため、未投入のカテゴリ（`rest-schemas` / `rest/networksecurity` / `rest/networkservices` / `rest/servicedirectory` / `rest/trafficdirector` / `rest/vpcaccess`）は後続 PR で追加する。現時点で収録済みのカテゴリは下記のツリーとマッピング表のもの。

参照本文は英語（公式ドキュメント・`gcloud help` の原語）。`traffic-director` カテゴリは Cloud Service Mesh のサービスルーティング API のページを収録する（REST の API 名は `trafficdirector`（Traffic Director API）、IAM ロールは Traffic Director Client（`roles/trafficdirector.client`））。非推奨は Classic VPN の動的ルーティング（BGP）が 2025-08-01 に非推奨（`cloud-vpn/classic-vpn-deprecation.md`）。

**ロードバランサー（Cloud Load Balancing・Cloud CDN・Media CDN・Service Extensions の概念と手順）は `gcp-load-balancing`**。ただし `gcloud network-services`（service-lb-policies・meshes・各種 routes・gateways・`wasm-plugins` 等）・`gcloud edge-cache`（Media CDN）・`gcloud service-extensions`（`lb-traffic-extensions` 等）の gcloud・REST・IAM の機械生成ページは本スキルにある。`gcloud compute` のロードバランサー関連リソース（backend-services・forwarding-rules・url-maps・target-*-proxies・health-checks・ssl-certificates・ssl-policies・network-endpoint-groups・backend-buckets）と VPC / firewall / router / VPN / Interconnect / NAT の `gcloud compute` コマンド・Compute REST・`roles/compute.*` は `gcp-compute`。

## ディレクトリ構成

```text
skills/gcp-networking/
  SKILL.md
  references/
    gcloud/                       # 機械生成: gcloud 593.0.0、取得 2026-11-14
      README.md
      dns/
        README.md                 # gcloud dns（Cloud DNS: managed-zones・record-sets・policies・response-policies・dns-keys・outbound-endpoints）
        dns-<group>.md
      edge-cache/
        README.md                 # gcloud edge-cache（Media CDN: keysets / origins / services / operations）
        edge-cache-<group>.md
      edge-cloud/
        README.md                 # gcloud edge-cloud（Google Distributed Cloud connected: container clusters / networking / api-keys / identity-providers 等）
        edge-cloud-<group>.md
      ids/
        README.md                 # gcloud ids（Cloud IDS: endpoints・operations）
      network-connectivity/
        README.md                 # gcloud network-connectivity（hubs・spokes・internal-ranges・policy-based-routes・regional-endpoints・service-connection-policies 等）
      network-management/
        README.md                 # gcloud network-management（connectivity-tests・vpc-flow-logs-configs・network-monitoring-providers）
      network-security/
        README.md                 # gcloud network-security（firewall endpoints・security profiles・address groups・intercept / mirroring・gateway-security-policies・TLS policies 等）
        network-security-<group>.md
      network-services/
        README.md                 # gcloud network-services（meshes・gateways・http / grpc / tcp / tls routes・service-lb-policies・service-bindings・endpoint-policies・multicast 等）
        network-services-<group>.md
      number-registry/
        README.md                 # gcloud number-registry（alpha のみ）
      service-directory/
        README.md                 # gcloud service-directory
      service-extensions/
        README.md                 # gcloud service-extensions（wasm-plugins・lb-traffic-extensions・lb-route-extensions・lb-edge-extensions・authz-extensions 等）
        service-extensions-<group>.md
      zone-management/
        README.md                 # gcloud zone-management（alpha のみ）
        zone-management-<group>.md  # GA は gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS
    iam/                          # 機械生成: IAM roles-permissions reference、取得 2026-11-14
      README.md
      <service>.md                # apim / dns / edgecontainer / edgenetwork / firewallinsights / ids / networkactions（Service Extensions）/ networkconnectivity / networkmanagement / networksecurity-1・2 / networkservices-1・2 / servicedirectory / vpcaccess
    rest/                         # 機械生成: Discovery 由来のメソッド表、取得 2026-11-14
      README.md
      <api>/
        README.md                 # apim / dns / ids / networkconnectivity / networkmanagement / networksecurity / networkservices / servicedirectory / trafficdirector / vpcaccess
        <api>.md
    vpc-overview/                 # 公式ガイド由来（手書き）: VPC の概要・VPC ネットワーク・サブネット・IPv6・MTU・network profiles・クォータ・legacy network
      README.md
      <page>.md                   # 例: overview.md / vpc.md / subnets.md
    vpc-routes/                   # ルートの種類・静的ルート・policy-based routes・ルートの操作
      README.md
      <page>.md
    vpc-ip-addresses/             # IP アドレスの種類・静的内部 IP・alias IP・BYOIP・内部レンジ・外部 IP の移動・Network Service Tiers
      README.md
      <page>.md
    vpc-peering-shared-vpc/       # VPC Network Peering（接続の仕様・設定）・Shared VPC
      README.md
      <page>.md
    firewall-policies/            # firewall policies の概要・VPC firewall rules・階層 / グローバルポリシー・ルール構成要素・評価順序
      README.md
      <page>.md
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
    network-connectivity-center/  # Network Connectivity Center: 製品の選び方・hub と spoke・VPC spokes・トポロジー・spoke フィルター・router appliance・NCC Gateway・クォータ
      README.md
      <page>.md
    private-service-connect/      # Private Service Connect: endpoint・published services・network attachments・アーキテクチャ・設定
      README.md
      <page>.md
    private-access/               # プライベートアクセスの選択肢・Private Google Access・private services access・Serverless VPC Access
      README.md
      <page>.md
    network-intelligence-center/  # Network Intelligence Center の各モジュール（Connectivity Tests・Network Topology・Performance Dashboard・Firewall Insights・Network Analyzer・Flow Analyzer・Cloud Network Insights）・VPC Flow Logs
      README.md
      <page>.md                   # 例: cloud-network-insights-overview.md
    network-security-integration-ids/  # Network Security Integration（in-band / out-of-band・security profiles）・Cloud IDS
      README.md
      <page>.md
    secure-web-proxy/             # Secure Web Proxy: ポリシーとルール・explicit proxy / next hop のデプロイ・TLS inspection・UrlList / CEL リファレンス・クォータ
      README.md
      <page>.md
    service-directory/            # Service Directory: 概要・用語・namespace / service / endpoint の設定・クォータ
      README.md
      <page>.md
    traffic-director/             # Cloud Service Mesh のサービスルーティング（Traffic Director API）: proxyless gRPC・Envoy・Mesh / HTTPRoute / GRPCRoute / TCPRoute・xDS・高度なトラフィック管理
      README.md
      <page>.md                   # 例: proxyless-overview.md / xds-control-plane-apis.md
    gdc-connected/                # Google Distributed Cloud connected: 概要・ネットワーク機能・networks / subnetworks / clusters・クォータ
      README.md
      <page>.md
```

`references/gcloud/` が担当する gcloud グループ（12）: `dns` / `edge-cache`（Media CDN）/ `edge-cloud` / `ids` / `network-connectivity` / `network-management` / `network-security` / `network-services` / `number-registry` / `service-directory` / `service-extensions` / `zone-management`。`number-registry` と `zone-management` は README 上 alpha コマンドのみ。GA コマンドのページは gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS のみ（各ページ冒頭に明記）。

`references/rest/` `references/rest-schemas/`（後続 PR で投入） の API（10）: `apim`（API Management API。README の説明は既存インフラの shadow API の検出）/ `dns` / `ids` / `networkconnectivity` / `networkmanagement` / `networksecurity` / `networkservices` / `servicedirectory` / `trafficdirector`（Traffic Director API）/ `vpcaccess`（Serverless VPC Access API。README の説明は VPC access connector の管理）。

`references/iam/` のサービス: `apim` / `dns` / `edgecontainer`（Distributed Cloud Edge Container）/ `edgenetwork`（Distributed Cloud Edge Network）/ `firewallinsights` / `ids` / `networkactions`（Service Extensions）/ `networkconnectivity` / `networkmanagement` / `networksecurity`（2 分割）/ `networkservices`（2 分割）/ `servicedirectory` / `vpcaccess`。

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. gcloud コマンド → 下記マッピング表で `gcloud` を選び、`references/gcloud/README.md` からグループの README（例: `references/gcloud/network-services/README.md`）→ グループページ・コマンドページを引く。`gcloud compute` 配下のネットワーク系コマンド（`networks` / `subnets` / `firewall-rules` / `routers` / `vpn-gateways` / `interconnects` / `addresses` / LB の各リソース等）は `gcp-compute` にある
2. REST（メソッド・パス・パラメータ）→ `references/rest/<api>/README.md`、メッセージ型 → `references/rest-schemas/<api>/README.md`（後続 PR で投入）。`<api>` は `apim` / `dns` / `ids` / `networkconnectivity` / `networkmanagement` / `networksecurity` / `networkservices` / `servicedirectory` / `trafficdirector` / `vpcaccess`。VPC・サブネット・ルート・firewall rules・Cloud Router・VPN・Interconnect・NAT・ロードバランサーの Compute REST は `gcp-compute`
3. IAM ロール・権限 → `references/iam/README.md` の索引から `<service>.md` を引く。`networksecurity` は `networksecurity-1.md` / `networksecurity-2.md`、`networkservices` は `networkservices-1.md` / `networkservices-2.md` に分割されているため、ロール ID（例: `roles/networkconnectivity.hubAdmin`）で `references/iam/` 配下を grep して該当ファイルを特定する。`roles/compute.*`（`compute.networkAdmin` / `compute.securityAdmin` 等）は `gcp-compute`
4. 概念・手順 → 下記マッピング表でガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（ガイド直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）
5. ロードバランサー・Cloud CDN・Media CDN・Service Extensions の概念・手順は `gcp-load-balancing`。Cloud Armor・IAP・Certificate Manager は `gcp-security`（予定）
6. 非推奨を確認するときは、Classic VPN の動的ルーティングは `cloud-vpn/classic-vpn-deprecation.md`を引く

`samples/` と `scripts/` は本スキルに無い。コマンドは `references/gcloud/` を引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| gcloud のコマンド・フラグを調べたい（12 グループ） | gcloud | [references/gcloud/README.md](references/gcloud/README.md) |
| `gcloud dns`（managed-zones・record-sets・policies・response-policies・dns-keys・outbound-endpoints）のフラグを調べたい | gcloud/dns | [references/gcloud/dns/README.md](references/gcloud/dns/README.md) |
| `gcloud edge-cache`（Media CDN の keysets・origins・services）のフラグを調べたい | gcloud/edge-cache | [references/gcloud/edge-cache/README.md](references/gcloud/edge-cache/README.md) |
| `gcloud edge-cloud`（Distributed Cloud connected の container clusters・networking・api-keys）のフラグを調べたい | gcloud/edge-cloud | [references/gcloud/edge-cloud/README.md](references/gcloud/edge-cloud/README.md) |
| `gcloud ids`（Cloud IDS endpoints）のコマンドを調べたい | gcloud/ids | [references/gcloud/ids/README.md](references/gcloud/ids/README.md) |
| `gcloud network-connectivity`（hubs・spokes・internal-ranges・policy-based-routes・regional-endpoints・service-connection-policies・multicloud-data-transfer-configs）のフラグを調べたい | gcloud/network-connectivity | [references/gcloud/network-connectivity/README.md](references/gcloud/network-connectivity/README.md) |
| `gcloud network-management`（connectivity-tests・vpc-flow-logs-configs・network-monitoring-providers）のコマンドを調べたい | gcloud/network-management | [references/gcloud/network-management/README.md](references/gcloud/network-management/README.md) |
| `gcloud network-security`（firewall endpoints・security profiles・address groups・intercept / mirroring・gateway-security-policies・TLS 関連ポリシー）のフラグを調べたい | gcloud/network-security | [references/gcloud/network-security/README.md](references/gcloud/network-security/README.md) |
| `gcloud network-services`（meshes・gateways・http / grpc / tcp / tls routes・service-lb-policies・service-bindings・endpoint-policies）のフラグを調べたい | gcloud/network-services | [references/gcloud/network-services/README.md](references/gcloud/network-services/README.md) |
| `gcloud number-registry`（alpha: custom-ranges・realms・registry-books・ipam-admin-scopes 等）を調べたい | gcloud/number-registry | [references/gcloud/number-registry/README.md](references/gcloud/number-registry/README.md) |
| `gcloud service-directory`（namespaces・services・endpoints）のフラグを調べたい | gcloud/service-directory | [references/gcloud/service-directory/README.md](references/gcloud/service-directory/README.md) |
| `gcloud service-extensions`（wasm-plugins・lb-traffic-extensions・lb-route-extensions・lb-edge-extensions・authz-extensions）のフラグを調べたい | gcloud/service-extensions | [references/gcloud/service-extensions/README.md](references/gcloud/service-extensions/README.md) |
| `gcloud zone-management`（alpha: zones・identity-providers・service-accounts 等）を調べたい | gcloud/zone-management | [references/gcloud/zone-management/README.md](references/gcloud/zone-management/README.md) |
| ロール ID の権限一覧・事前定義ロールを調べたい（`roles/dns.*` / `roles/networkconnectivity.*` / `roles/networksecurity.*` / `roles/networkservices.*` / `roles/servicedirectory.*` / `roles/ids.*` / `roles/vpcaccess.*` 等） | iam | [references/iam/README.md](references/iam/README.md) |
| REST のメソッド・パスを調べたい | rest | [references/rest/README.md](references/rest/README.md) |
| VPC の概要・VPC ネットワークの仕様（auto / custom mode）・サブネット・IPv6 対応・MTU・network profiles・VPC のクォータ・legacy network | vpc-overview | [references/vpc-overview/README.md](references/vpc-overview/README.md) |
| ルートの種類と評価順・静的ルート・policy-based routes・ルートの作成 / 削除 | vpc-routes | [references/vpc-routes/README.md](references/vpc-routes/README.md) |
| 内部 / 外部・静的 / エフェメラルの IP アドレス・静的内部 IP の予約・alias IP・BYOIP・内部レンジ・外部 IPv4 の移動・Network Service Tiers | vpc-ip-addresses | [references/vpc-ip-addresses/README.md](references/vpc-ip-addresses/README.md) |
| VPC Network Peering の仕様・設定・Shared VPC のホスト / サービスプロジェクト | vpc-peering-shared-vpc | [references/vpc-peering-shared-vpc/README.md](references/vpc-peering-shared-vpc/README.md) |
| firewall policies（階層 / グローバル）・VPC firewall rules・ルールの構成要素と評価順序 | firewall-policies | [references/firewall-policies/README.md](references/firewall-policies/README.md) |
| Cloud NGFW のティア・secure tags・アドレスグループ・FQDN オブジェクト・firewall endpoints・security profiles・IPS・TLS inspection・URL filtering | cloud-ngfw | [references/cloud-ngfw/README.md](references/cloud-ngfw/README.md) |
| Cloud DNS のゾーン（forwarding / peering / 逆引き）・レコード・server / response / routing policies・DNSSEC・ハイブリッド DNS | cloud-dns | [references/cloud-dns/README.md](references/cloud-dns/README.md) |
| Cloud NAT（Public / Private）・IP とポートの割り当て・NAT rules・クォータ | cloud-nat | [references/cloud-nat/README.md](references/cloud-nat/README.md) |
| Cloud Router の BGP・学習 / アドバタイズルート・BGP route policies・Cloud Router の作成 | cloud-router | [references/cloud-router/README.md](references/cloud-router/README.md) |
| Cloud VPN（HA VPN）のトポロジー・SLA・IKE 暗号・ピアゲートウェイ・事前共有鍵・Classic VPN の BGP 非推奨 | cloud-vpn | [references/cloud-vpn/README.md](references/cloud-vpn/README.md) |
| Cloud Interconnect の種類（Dedicated / Partner / Cross-Cloud）・VLAN アタッチメント・用語・冗長構成・クォータ | cloud-interconnect | [references/cloud-interconnect/README.md](references/cloud-interconnect/README.md) |
| 接続製品の選び方・Network Connectivity Center の hub / spoke・VPC spokes・トポロジー・spoke フィルター・router appliance・NCC Gateway | network-connectivity-center | [references/network-connectivity-center/README.md](references/network-connectivity-center/README.md) |
| Private Service Connect の endpoint（Google API 向け / published service 向け）・service attachment・network attachment | private-service-connect | [references/private-service-connect/README.md](references/private-service-connect/README.md) |
| Private Google Access・private services access・Serverless VPC Access コネクタなどプライベートアクセスの選択肢 | private-access | [references/private-access/README.md](references/private-access/README.md) |
| Connectivity Tests・Network Topology・Performance Dashboard・Firewall Insights・Network Analyzer・Flow Analyzer・Cloud Network Insights・VPC Flow Logs | network-intelligence-center | [references/network-intelligence-center/README.md](references/network-intelligence-center/README.md) |
| Network Security Integration（in-band / out-of-band・packet mirroring）・Cloud IDS の構成とベストプラクティス | network-security-integration-ids | [references/network-security-integration-ids/README.md](references/network-security-integration-ids/README.md) |
| Secure Web Proxy のポリシー・ルール・explicit proxy / next hop のデプロイ・TLS inspection・UrlList / CEL リファレンス | secure-web-proxy | [references/secure-web-proxy/README.md](references/secure-web-proxy/README.md) |
| Service Directory の namespace / service / endpoint・Cloud DNS 連携 | service-directory | [references/service-directory/README.md](references/service-directory/README.md) |
| Cloud Service Mesh のサービスルーティング（Traffic Director API）: proxyless gRPC・Envoy・Mesh / HTTPRoute / GRPCRoute / TCPRoute・xDS・サービス LB ポリシー | traffic-director | [references/traffic-director/README.md](references/traffic-director/README.md) |
| Google Distributed Cloud connected の概要・ネットワーク機能・networks / subnetworks / clusters・クォータ | gdc-connected | [references/gdc-connected/README.md](references/gdc-connected/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `rest-schemas` / `rest/networksecurity` / `rest/networkservices` / `rest/servicedirectory` / `rest/trafficdirector` / `rest/vpcaccess`

## 他スキルとの使い分け

- `gcp-load-balancing` — Cloud Load Balancing（Application / Network Load Balancer）・backend services・NEG・URL map・SSL 証明書 / SSL policies・mTLS・Cloud CDN・Media CDN・Service Extensions の概念と手順。本スキルは `gcloud network-services` / `gcloud edge-cache` / `gcloud service-extensions` の gcloud・REST・IAM の機械生成ページと、Cloud Service Mesh のサービスルーティング、Private Service Connect、Secure Web Proxy を担当
- `gcp-compute` — `gcloud compute` と Compute REST（VPC・サブネット・firewall rules・ルート・Cloud Router・VPN・Interconnect・Cloud NAT・ロードバランサーの各リソース・Cloud Armor のセキュリティポリシー）と `roles/compute.*`。本スキルは同じ領域の概念・設計ガイドと、`compute` 以外のネットワーク系グループ・API・ロール
- `gcp-gke` — GKE の Gateway API / Ingress / マルチクラスターと、GKE 上の Cloud Service Mesh（Istio API）。本スキルは GKE 外のサービスルーティング（Mesh / HTTPRoute 等のリソース）と VPC 側の設定
- `gcp-run` — Cloud Run・Cloud Run functions・App Engine。Serverless VPC Access コネクタ（`private-access`・`rest/vpcaccess`・`iam/vpcaccess.md`）は本スキル
- `gcp-storage` — Cloud Storage・Filestore 等。Cloud Storage バケットをバックエンドにするロードバランサーは `gcp-load-balancing`
- `gcp-foundation` — IAM の基盤・リソース階層・ADC・課金・クォータ。本スキルは各製品の IAM ロール（`references/iam/`）
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
- `references/gcloud/` `references/iam/` `references/rest/` `references/rest-schemas/`（後続 PR で投入） は機械生成（gcloud 593.0.0 の help / IAM roles-permissions reference / `google-api-python-client` 同梱の Discovery document（`main` 時点、commit SHA は未記録））。他の 20 カテゴリは公式ガイド由来の手書き
- gcloud は GA コマンドが gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS のみ
- `number-registry` と `zone-management` は README 上 alpha コマンドのみ。`gcloud` のグループ名と製品名の対応は公式 reference で確認する
- 非推奨: Classic VPN の動的ルーティング（BGP）は 2025-08-01 に非推奨（`cloud-vpn/classic-vpn-deprecation.md`）。
- Preview の機能（Media CDN の拡張・Secure Web Proxy の拡張等）は一部ページが Preview と明記している。各ページの前提を確認してから当てはめる
- ネットワーク製品は機能・リージョンごとに可用性が異なり、頻繁に更新される。新しいフラグ・機能は `gcloud help` と公式 reference で確認する
