---
name: gcp-load-balancing
description: >
  Google Cloud (GCP) の Cloud Load Balancing (Application Load Balancer・proxy / passthrough Network Load Balancer)・backend services・NEG (zonal / serverless / internet / hybrid)・URL map・SSL 証明書 (Google-managed)・SSL policies・mTLS・Cloud CDN (cache modes・invalidation)・Media CDN (gcloud edge-cache)・Service Extensions (callouts・Wasm plugins)。compute は gcp-compute、VPC は gcp-networking とは別。
user-invocable: false
---

# gcp-load-balancing

Google Cloud (GCP) のロードバランシング / CDN 系スキル。Cloud Load Balancing（ロードバランサーの選び方・リソースモデル・forwarding rules・クォータ）、Application Load Balancer（外部 / 内部・proxy-only subnet）、Network Load Balancer（proxy 型 / passthrough 型・外部 / 内部）、backend services（バランシングモード・ヘルスチェック・connection draining・backend buckets）、NEG（zonal / serverless / internet / hybrid）、URL map とトラフィック管理（host / path ルール・リダイレクト・カスタムヘッダー）、TLS（SSL 証明書・Google-managed 証明書・SSL policies・mTLS・バックエンドの認証付き TLS）、Cloud CDN（キャッシュモード・キャッシュキー・キャッシュ無効化）、Media CDN（EdgeCacheService / Origin / Keyset・ルーティング・キャッシュ）、Service Extensions（Wasm plugins・callouts・ロードバランサー / Media CDN / Secure Web Proxy の拡張）を扱う。

参照本文は英語（公式ドキュメントの原語）。移行の対応は classic Application Load Balancer → グローバル外部 Application Load Balancer（`lb-traffic-management/migrate-to-global.md`）。

**本スキルは手書きのガイドのみで、機械生成ページ（gcloud・REST・IAM）は持たない。** コマンド・メソッド・ロールは次のスキルで引く。

- `gcp-compute` — ロードバランサーの `gcloud compute` コマンド（`backend-services` / `forwarding-rules` / `url-maps` / `target-*-proxies` / `health-checks` / `ssl-certificates` / `ssl-policies` / `network-endpoint-groups` / `backend-buckets`）、Compute REST（`compute` API）、`roles/compute.*`
- `gcp-networking` — `gcloud network-services`（`service-lb-policies` / `meshes` / 各種 routes / `gateways` 等）、`gcloud edge-cache`（Media CDN）、`gcloud service-extensions`（`wasm-plugins` / `lb-traffic-extensions` / `lb-route-extensions` / `lb-edge-extensions` / `authz-extensions` 等）の gcloud ページと、`networkservices` / `networksecurity` 等の REST・IAM ページ

## ディレクトリ構成

```text
skills/gcp-load-balancing/
  SKILL.md
  references/
    lb-overview/                  # 公式ガイド由来（手書き）: Cloud Load Balancing の概要・ロードバランサーの選び方・機能比較・リソースモデル・forwarding rules・クォータ
      README.md
      <page>.md                   # 例: choosing-load-balancer.md / load-balancer-resource-model.md / forwarding-rule-concepts.md
    lb-application/               # Application Load Balancer の概要・外部 Application Load Balancer のアーキテクチャ・proxy-only subnet
      README.md
      <page>.md
    lb-network/                   # Network Load Balancer: passthrough（外部 / 内部）・proxy（外部 / 内部）
      README.md
      <page>.md
    lb-backend-services/          # backend services・ヘルスチェック・backend buckets・connection draining
      README.md
      <page>.md
    lb-negs/                      # Network endpoint groups: zonal / serverless / internet / hybrid・zonal NEG の設定
      README.md
      <page>.md
    lb-tls/                       # SSL 証明書・Google-managed 証明書・バックエンドへの暗号化・SSL policies・mTLS・バックエンドの認証付き TLS
      README.md
      <page>.md
    cloud-cdn/                    # Cloud CDN: 概要・CDN 製品の選び方・キャッシュ・キャッシュモード・キャッシュキー・キャッシュ無効化
      README.md
      <page>.md
```

`gcloud/` `rest/` `rest-schemas/` `iam/` のディレクトリは本スキルに無い（上記の `gcp-compute` / `gcp-networking` を参照）。`samples/` と `scripts/` も無い。

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 概念・手順 → 下記マッピング表でカテゴリを選び、その README.md から個別ページを特定して Read する（ガイド直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）
2. ロードバランサーの種類を選ぶ → `lb-overview` の `choosing-load-balancer.md` と `features.md`。種類が決まったら `lb-application`（Application）または `lb-network`（Network）へ進む
3. gcloud コマンド・フラグ・REST・IAM ロール → 本スキルには無い。`gcloud compute` / Compute REST / `roles/compute.*` は `gcp-compute`、`gcloud network-services` / `gcloud edge-cache` / `gcloud service-extensions` と各 REST・IAM は `gcp-networking` を引く
4. VPC・ファイアウォール・Cloud NAT・VPN / Interconnect・Private Service Connect の概念は `gcp-networking`。Cloud Armor・IAP・Certificate Manager は `gcp-security`（予定）
5. Cloud CDN と Media CDN のどちらを使うかは `cloud-cdn/choose-cdn-product.md`

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| Cloud Load Balancing の種類（Application / Network・proxy / passthrough・外部 / 内部・グローバル / リージョン・Premium / Standard ティア）を選びたい・機能を比較したい | lb-overview | [references/lb-overview/README.md](references/lb-overview/README.md) |
| ロードバランサーのリソースモデル（forwarding rule・target proxy・URL map・backend service・ヘルスチェック）・forwarding rules・クォータ | lb-overview | [references/lb-overview/README.md](references/lb-overview/README.md) |
| Application Load Balancer の概要・外部 Application Load Balancer のアーキテクチャ（HTTP/2・HTTP/3・ファイアウォール範囲）・proxy-only subnet の作成 / 移行 | lb-application | [references/lb-application/README.md](references/lb-application/README.md) |
| passthrough Network Load Balancer（外部 / 内部）・proxy Network Load Balancer（外部 / 内部 TCP プロキシ）・内部 proxy Network Load Balancer | lb-network | [references/lb-network/README.md](references/lb-network/README.md) |
| backend services の設定・バランシングモード・ヘルスチェック・backend buckets・connection draining | lb-backend-services | [references/lb-backend-services/README.md](references/lb-backend-services/README.md) |
| NEG（zonal・serverless・internet・hybrid）の違いと制約・zonal NEG の作成とバックエンドサービスへの接続 | lb-negs | [references/lb-negs/README.md](references/lb-negs/README.md) |
| SSL 証明書・Google-managed 証明書の作成と更新・バックエンドへの暗号化・SSL policies・mTLS・バックエンド mTLS | lb-tls | [references/lb-tls/README.md](references/lb-tls/README.md) |
| Cloud CDN の概要・キャッシュモード（`CACHE_ALL_STATIC` / `USE_ORIGIN_HEADERS` / `FORCE_CACHE_ALL`）・キャッシュキー・キャッシュ無効化・Cloud CDN と Media CDN の選択 | cloud-cdn | [references/cloud-cdn/README.md](references/cloud-cdn/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `lb-traffic-management` / `media-cdn` / `service-extensions`

## 他スキルとの使い分け

- `gcp-networking` — VPC・firewall policies・Cloud NGFW・Cloud DNS・Cloud NAT・Cloud Router・VPN / Interconnect・Network Connectivity Center・Private Service Connect・Secure Web Proxy・Cloud Service Mesh のサービスルーティング（Traffic Director API）の概念と手順。`gcloud network-services` / `gcloud edge-cache` / `gcloud service-extensions` の gcloud・REST・IAM の機械生成ページも `gcp-networking`。本スキルは同じ機能のガイド（概念・設計）
- `gcp-compute` — `gcloud compute` と Compute REST のロードバランサー関連リソース（backend-services・forwarding-rules・url-maps・target proxies・health-checks・ssl-certificates・ssl-policies・network-endpoint-groups・backend-buckets）・Cloud Armor のセキュリティポリシー・`roles/compute.*`。MIG をバックエンドにするオートスケーリングは `gcp-compute`
- `gcp-gke` — GKE の Gateway API / Ingress / マルチクラスター（Multi Cluster Ingress / Gateway）と GKE 上の Cloud Service Mesh（Istio API）。GKE が作る NEG / ロードバランサーの GKE 側設定は `gcp-gke`、NEG とロードバランサー側の仕様は本スキル
- `gcp-run` — Cloud Run・Cloud Run functions・App Engine。serverless NEG の背後に置くアプリ本体は `gcp-run`、serverless NEG の仕様は本スキル（`lb-negs`）
- `gcp-storage` — Cloud Storage のバケット本体。backend bucket としてロードバランサーの背後に置く仕様は本スキル（`lb-backend-services`）
- `gcp-foundation` — IAM の基盤・リソース階層・ADC・課金・クォータ
- `gcp-cli` — gcloud 全般のインストール・設定・認証・出力フォーマット
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `gcp-security`（予定）— Cloud Armor・IAP・Certificate Manager。ロードバランサーに付ける SSL 証明書 / SSL policies / mTLS は本スキル（`lb-tls`）
- `gcp-observability`（予定）— Cloud Logging・Cloud Monitoring
- `cloudflare-workers` / `vercel` — Cloudflare・Vercel のエッジ / CDN は別の製品。Google Cloud の Cloud CDN・Media CDN とは無関係

## 対象外

次は収録していない。必要なときは公式ドキュメントを確認する（https://docs.cloud.google.com/ 配下）。

- 機械生成ページ（gcloud・REST・IAM）— `gcp-compute` と `gcp-networking` に収録
- 各カテゴリの個別手順の一部（ロードバランサーの種類別の作成手順・ログとモニタリング・トラブルシューティング・料金・リリースノート・SLA）。収録ページは各カテゴリの README を参照
- Cloud Armor・IAP・Certificate Manager（`gcp-security`（予定））

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-17（ガイド。`docs.cloud.google.com/<path>.md.txt` の Markdown twin。URL に版が無いため取得日で pin）
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- 本スキルの 10 カテゴリはすべて公式ガイド由来の手書き。機械生成（gcloud 593.0.0 の help・Discovery document・IAM roles-permissions reference、取得 2026-11-14）は `gcp-compute` / `gcp-networking` 側にある
- Media CDN の拡張（`CdnEdgeExtension`）と Secure Web Proxy の拡張は Preview と明記されている（`service-extensions/media-cdn-extensions-overview.md` / `swp-extensions-overview.md`）
- ロードバランサーは種類・スキーム・ティア・リージョンごとに機能の可用性が異なる。各ページの前提と `lb-overview/features.md` を確認してから当てはめる
- 新しいフラグ・機能は `gcloud help` と公式 reference で確認する
