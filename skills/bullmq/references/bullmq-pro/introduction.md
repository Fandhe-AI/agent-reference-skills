# BullMQ Pro Introduction

BullMQ Pro は BullMQ の商用版であり、オープンソース版を超える高度な機能と、ライブラリ作者による専用サポートを提供する。

## 概要

BullMQ Pro は標準の BullMQ を直接置き換える形で動作し、大きな統合変更なしにプレミアム機能を利用できる。

## 主な機能

BullMQ Pro は以下の高度な機能を提供する:

- **Groups** - ジョブをグループ化し、グループごとにラウンドロビンで処理
- **Observables** - Observable パターンによるジョブ処理、キャンセル、TTL
- **Batches** - 複数ジョブの一括処理
- **Telemetry** - OpenTelemetry によるモニタリング

## ライセンスモデル

BullMQ Pro は組織単位のライセンスで、すべてのプロジェクトで無制限に使用可能。購入前に無料トライアル期間が提供される。

## 継続的な開発

新しい機能が定期的に追加されており、プロジェクトのロードマップで開発の進捗を確認できる。

## 注意点

- BullMQ Pro は有料ライセンスが必要
- npm レジストリトークンが必要（インストール手順は [install.md](./install.md) を参照）
- オープンソース版の BullMQ とは別パッケージ（`@taskforcesh/bullmq-pro`）

## 関連

- [./install.md](./install.md) - インストール方法
- [./observables/README.md](./observables/README.md) - Observables 機能
- [./groups/README.md](./groups/README.md) - Groups 機能
- [./batches.md](./batches.md) - Batches 機能
