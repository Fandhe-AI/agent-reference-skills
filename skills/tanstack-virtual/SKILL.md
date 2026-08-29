---
name: tanstack-virtual
description: >
  TanStack Virtual (React 仮想スクロール、@tanstack/react-virtual) の API リファレンス。
  useVirtualizer, useWindowVirtualizer, Virtualizer, VirtualItem, estimateSize,
  measureElement, rangeExtractor, overscan, lanes, getVirtualItems, getTotalSize,
  scrollToIndex。固定/可変/動的計測、grid、sticky header、infinite scroll、table、
  window scroll 仮想化。別名 react-virtual, virtual-core。
  react-flow / Compose LazyColumn / WinUI ListView とは別（DOM 向けヘッドレス仮想化）。
user-invocable: false
---

# TanStack Virtual リファレンス

TanStack Virtual (`@tanstack/react-virtual`) v3 の API ドキュメントを蒸留したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/tanstack-virtual/
  SKILL.md
  references/
    getting-started/
      README.md
      introduction.md
      installation.md
      react-virtual.md
      pretext.md
      chat.md
    api/
      README.md
      virtualizer.md
      virtual-item.md
      utilities.md
  samples/
    README.md
    fixed-rows.md
    fixed-columns.md
    variable-rows.md
    dynamic-measured.md
    grid.md
    sticky-headers.md
    infinite-scroll.md
    table-virtualization.md
    window-scroller.md
    smooth-scroll.md
    padding-gap.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| 導入・基本概念・インストール手順を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| `useVirtualizer` / `useWindowVirtualizer` フックの使い方 | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| テキスト行の高さ推定（pretext）・チャット/ログ末尾追従（anchorTo 等） | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| `Virtualizer` クラスの初期化オプション一覧 | api | [references/api/README.md](references/api/README.md) |
| `getVirtualItems` / `getTotalSize` / `scrollToIndex` / `measure` 等のインスタンスメソッド | api | [references/api/README.md](references/api/README.md) |
| `VirtualItem` の構造・座標情報を知りたい | api | [references/api/README.md](references/api/README.md) |
| `rangeExtractor` / `scrollToFn` / `measureElement` 等のデフォルト実装（Utilities）をカスタムアダプター向けに知りたい | api | [references/api/README.md](references/api/README.md) |
| 固定/可変サイズ行・列の仮想化、動的計測（measureElement）の実装例 | samples | [samples/README.md](samples/README.md) |
| grid 仮想化・sticky header・infinite scroll・table 仮想化・window scroller の実装例 | samples | [samples/README.md](samples/README.md) |
| スムーズスクロール・padding/gap の設定例 | samples | [samples/README.md](samples/README.md) |
