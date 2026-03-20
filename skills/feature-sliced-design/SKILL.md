---
name: feature-sliced-design
description: >
  Feature-Sliced Design アーキテクチャのガイドライン。
  コード作成・レビュー・リファクタリング時に FSD のルールを自動で参照する。
  レイヤー構成、依存方向、Public API パターンを提供する。
user-invocable: false
---

# Feature-Sliced Design ガイドライン

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
