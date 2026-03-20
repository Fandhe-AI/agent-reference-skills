# Segment Naming

セグメント名は「目的」で命名し、「本質」で命名しない。

## Rule

セグメント名はコンテンツの**目的**（purpose — なぜそのコードが存在するか）を記述する。技術的な**本質**（essence — それが何であるか）で命名しない。標準セグメント名 `ui`, `api`, `model`, `lib`, `config` を優先する。

## Good

```text
features/auth/
  ui/                    ← UIコンポーネント（目的: 画面表示）
  api/                   ← API連携（目的: バックエンド通信）
  model/                 ← データモデル（目的: ビジネスロジック）
  lib/                   ← ユーティリティ（目的: 内部補助）
  config/                ← 設定（目的: フラグ・定数管理）
  index.ts
```

```text
# model/ 内でドメインごとにファイルを分割
pages/delivery/
  model/
    delivery.ts          ← DeliveryOption, formatDeliveryPrice
    user.ts              ← UserInfo, getUserInitials
```

## Bad

```text
features/auth/
  components/            ← 本質: 「コンポーネントである」
  hooks/                 ← 本質: 「フックである」
  types/                 ← 本質: 「型定義である」
  utils/                 ← 本質: 「ユーティリティである」
  constants/             ← 本質: 「定数である」
```

```text
# 汎用ファイル名で複数ドメインを混在
pages/delivery/
  model/
    types.ts             ← DeliveryOption + UserInfo が混在
    utils.ts             ← formatDeliveryPrice + getUserInitials が混在
```

## Why

目的ベースの命名により:

- ファイルの役割が名前から直感的にわかる
- FSD 標準に従うことでチーム間の一貫性を保てる
- ドメイン固有のファイル名（`delivery.ts`, `user.ts`）を使うことで、凝集度が高く結合度が低い構造になる
- `types.ts` や `utils.ts` のような汎用名は、無関係なコードの混在（desegmentation）を招く
