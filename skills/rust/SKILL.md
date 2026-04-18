---
name: rust
description: >
  Rust 言語リファレンス。
  TRPL (The Rust Programming Language), Rust by Example, Reference,
  Cargo Book, rustc Book, rustdoc Book, Rustonomicon (Unsafe Rust),
  Edition Guide, Command Line Book, Embedded Book,
  Standard Library / Error Index / Unstable Book 概要
user-invocable: false
---

# Rust リファレンス

Rust — システムプログラミング言語。所有権・借用・ライフタイム・型システムによりメモリ安全性とスレッド安全性を保証する。
公式ドキュメント (doc.rust-lang.org) から主要 14 リソースを構造化。
言語仕様・コード記述・ビルド（Cargo）・Unsafe Rust・組込み・CLI 開発時に参照する。

## ディレクトリ構造

```
.claude/skills/rust/
├── SKILL.md                                    ← このファイル（エントリーポイント）
└── references/
    ├── book/README.md                          ← TRPL 索引（21 章）
    ├── by-example/README.md                    ← Rust by Example 索引（24 セクション）
    ├── reference/README.md                     ← The Rust Reference 索引（21 章）
    ├── cargo/README.md                         ← Cargo Book 索引（23 章）
    ├── rustc/README.md                         ← rustc Book 索引（14 章）
    ├── rustdoc/README.md                       ← rustdoc Book 索引（12 章）
    ├── nomicon/README.md                       ← Rustonomicon 索引（14 章）
    ├── edition-guide/README.md                 ← Edition Guide 索引（7 章）
    ├── cli/README.md                           ← Command Line Book 索引（11 章）
    ├── embedded/README.md                      ← Embedded Book 索引（14 章）
    ├── stdlib/README.md                        ← 標準ライブラリ概要（2 ページ）
    ├── errors/README.md                        ← Compiler Error Index 概要（1 ページ）
    ├── unstable/README.md                      ← Unstable Book 概要（1 ページ）
    └── rustlings/README.md                     ← Rustlings 演習環境概要（1 ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| 言語入門・基礎概念（所有権・借用・ライフタイム・構造体・Enum・エラー処理・トレイト・ジェネリクス・並行性・async） | book (TRPL) | [references/book/README.md](./references/book/README.md) |
| 言語機能をコード例で素早く確認、構文のクイックリファレンス | by-example | [references/by-example/README.md](./references/by-example/README.md) |
| 厳密な言語仕様・構文・型システム・メモリモデル・ABI・UB 定義 | reference | [references/reference/README.md](./references/reference/README.md) |
| Cargo.toml, Workspaces, Features, Profiles, 依存関係指定, publish | cargo | [references/cargo/README.md](./references/cargo/README.md) |
| rustc コンパイラオプション, lint, target, sanitizer, PGO, LTO | rustc | [references/rustc/README.md](./references/rustc/README.md) |
| ドキュメント生成, doctest, doc コメント記法, intra-doc links | rustdoc | [references/rustdoc/README.md](./references/rustdoc/README.md) |
| Unsafe Rust, FFI, unsound パターン, Vec/Arc 実装, アトミック | nomicon | [references/nomicon/README.md](./references/nomicon/README.md) |
| Rust 2015/2018/2021/2024 エディション差分, 移行方法 | edition-guide | [references/edition-guide/README.md](./references/edition-guide/README.md) |
| CLI アプリケーション開発, clap, 終了コード, シグナル処理 | cli | [references/cli/README.md](./references/cli/README.md) |
| 組込み開発, no_std, HAL, peripheral, memory-mapped registers | embedded | [references/embedded/README.md](./references/embedded/README.md) |
| 標準ライブラリのモジュール構成, Collections, I/O, Concurrency 概要 | stdlib | [references/stdlib/README.md](./references/stdlib/README.md) |
| コンパイラエラーコード（E0XXX）の参照方法、代表例 | errors | [references/errors/README.md](./references/errors/README.md) |
| Nightly 限定機能, `#![feature(...)]`, -Z フラグ | unstable | [references/unstable/README.md](./references/unstable/README.md) |
| Rustlings 演習環境, 学習ワークフロー | rustlings | [references/rustlings/README.md](./references/rustlings/README.md) |
