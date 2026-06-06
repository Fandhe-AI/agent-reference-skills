---
name: feature-sliced-design
description: >
  Feature-Sliced Design (FSD、フロントエンドアーキテクチャ手法) リファレンスとルール。
  別名: fsd, feature sliced design, feature-sliced。
  レイヤー (app / pages / widgets / features / entities / shared)、
  依存方向、Public API パターン、スライス、セグメント (ui / model / api / lib / config)。
  コードレビュー・リファクタリング時に自動参照。
user-invocable: false
model: sonnet
---

# Feature-Sliced Design ガイドライン

## ディレクトリ構成

```text
skills/feature-sliced-design/
  SKILL.md
  references/
    README.md
    import-rules.md
    layers.md
    public-api.md
    slices-segments.md
  samples/
    README.md
    project-structure.md
    slice-public-api.md
    layer-imports.md
    cross-entity-import.md
    slice-groups.md
    composition-in-pages.md
    nextjs-app-router.md
    react-query-integration.md
  scripts/
    README.md
    install.md
    generate.md
    lint.md
  rules/
    README.md
    layer-dependency.md
    public-api-enforcement.md
    slice-isolation.md
    segment-naming.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| レイヤー構成・責務を知りたい | references | [references/README.md](references/README.md) |
| インポートルール・依存方向を確認したい | references | [references/README.md](references/README.md) |
| Public API パターンを理解したい | references | [references/README.md](references/README.md) |
| スライス・セグメントの定義を知りたい | references | [references/README.md](references/README.md) |
| 典型的な FSD プロジェクト構成の例を見たい | samples | [samples/README.md](samples/README.md) |
| Next.js / React Query との組み合わせ例を見たい | samples | [samples/README.md](samples/README.md) |
| @x 記法・クロスエンティティ依存の実例を見たい | samples | [samples/README.md](samples/README.md) |
| pages / widgets での合成パターンを知りたい | samples | [samples/README.md](samples/README.md) |
| ツールチェーンのインストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
| steiger でアーキテクチャ準拠チェックを実行したい | scripts | [scripts/README.md](scripts/README.md) |
| @feature-sliced/cli でコード生成したい | scripts | [scripts/README.md](scripts/README.md) |
| レイヤー依存方向のルールを自動適用したい | rules | [rules/README.md](rules/README.md) |
| Public API 経由のみ許可するルールを確認したい | rules | [rules/README.md](rules/README.md) |
| スライス分離・セグメント命名規約を確認したい | rules | [rules/README.md](rules/README.md) |

コア概念の詳細は `references/<topic>.md`、チェックルールは `rules/<rule>.md` を参照。

## 必須ルール

- コードは 6 つの標準レイヤーに分割する: `app`, `pages`, `widgets`, `features`, `entities`, `shared`
- インポートは**下位レイヤーへの一方向のみ**許可。同一レイヤー内のスライス間インポートは禁止
- 各スライスは `index.ts` で Public API を定義する。外部からは Public API 経由でのみインポートする
- `export *` は使用しない。公開するものを明示的に列挙する
- セグメント名は「目的」で命名する（`ui`, `model`, `api`）。「本質」で命名しない（`components`, `hooks`, `types`）
- `app` と `shared` にスライスは持たない。セグメントのみで構成する

## レイヤー構成（上位 → 下位）

```text
app        — ルーティング、プロバイダー、グローバル設定（スライスなし）
pages      — 画面単位のスライス
widgets    — 複数ページで再利用される大規模 UI ブロック
features   — ビジネス価値をもたらすユーザーインタラクション
entities   — ビジネスエンティティ（User, Product 等）
shared     — 汎用的な再利用可能コード（スライスなし）
```

## 標準セグメント

| セグメント | 内容 |
| --- | --- |
| `ui` | UI コンポーネント、フォーマッタ、スタイル |
| `api` | バックエンド連携、リクエスト関数、レスポンス型 |
| `model` | データスキーマ、ストア、ビジネスロジック |
| `lib` | スライスローカルのユーティリティ |
| `config` | 設定定数、フィーチャーフラグ |

## ディレクトリ構造例

```text
src/
├── app/
│   ├── routes/
│   ├── store/
│   └── styles/
├── pages/
│   └── feed/
│       ├── ui/
│       ├── api/
│       └── index.ts
├── widgets/
│   └── header/
│       ├── ui/
│       └── index.ts
├── features/
│   └── search-articles/
│       ├── ui/
│       ├── model/
│       └── index.ts
├── entities/
│   └── user/
│       ├── ui/
│       ├── model/
│       ├── api/
│       └── index.ts
└── shared/
    ├── ui/
    ├── api/
    ├── lib/
    └── config/
```

## よくある間違い

1. **セグメント名に `components/`, `hooks/`, `types/` を使う** → `ui/`, `model/`, `lib/` を使用する
2. **`export *` でまとめてエクスポートする** → 明示的に `export { Name } from` で列挙する
3. **同一レイヤーのスライスを直接インポートする** → 上位レイヤーで合成するか、`@x` 記法を使用する
4. **再利用されないコードを `features` や `widgets` に早期移動する** → まず `pages` に置き、再利用が確定してから昇格する
5. **`shared` にビジネスロジックを置く** → ビジネスロジックは `entities` 以上に配置する
6. **独自レイヤーを追加する** → 標準の 6 レイヤーのみ使用する
7. **Public API なしでスライスを作成する** → 必ず `index.ts` を先に定義する
8. **型定義を `types/` フォルダにまとめる** → ドメインごとに `model/` セグメント内に配置する
