---
source: https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/Cargo.toml
---

# crate-layout

`Fandhe-AI/vector-db` は Cargo workspace（resolver "2"）で、`fandhe-vector-db-engine`（lib）と `fandhe-vector-db-wire-server`（bin）の 2 crate から構成される。

## Signature / Usage

~~~toml
[workspace]
resolver = "2"
members = ["crates/engine", "crates/wire-server"]

[workspace.package]
edition = "2021"
license = "MIT OR Apache-2.0"
repository = "https://github.com/Fandhe-AI/vector-db"
publish = true
~~~

engine crate（`crates/engine/Cargo.toml`）:

~~~toml
[package]
name = "fandhe-vector-db-engine"
version = "0.1.0"
description = "Local-first vector query database engine: search kernels, RLS-style tenant boundary, redb persistence"

[lib]
name = "engine"
path = "src/lib.rs"

[dependencies]
redb = "=4.2.0"
usearch = { version = "=2.26.2", optional = true }
wgpu = { version = "=30.0.1", default-features = false, features = [
    "std", "vulkan", "metal", "dx12", "wgsl",
] }
ort = { version = "=2.0.0-rc.13", optional = true, default-features = false, features = [
    "load-dynamic", "api-17",
] }
tokenizers = { version = "=0.23.2", optional = true, default-features = false, features = [
    "onig",
] }

[features]
contrast-bench = ["dep:usearch"]
cross-encoder = ["dep:ort", "dep:tokenizers"]
bench-internals = []
~~~

wire-server crate（`crates/wire-server/Cargo.toml`）:

~~~toml
[package]
name = "fandhe-vector-db-wire-server"
version = "0.1.0"
description = "PostgreSQL wire protocol v3 compatible server for the fandhe vector-db engine"

[lib]
name = "wire_server"
path = "src/lib.rs"

[[bin]]
name = "wire-server"
path = "src/main.rs"

[dependencies]
engine = { package = "fandhe-vector-db-engine", path = "../engine", version = "=0.1.0" }
~~~

## Options / Props

| Feature (engine crate) | Dependencies gated | Description |
|------|------|-------------|
| `contrast-bench` | `usearch` (=2.26.2) | bench 専用の対照エンジン（総当たり最近傍）接続。`wire-server` にはリンクされない |
| `cross-encoder` | `ort` (=2.0.0-rc.13), `tokenizers` (=0.23.2) | `rerank::CrossEncoderReranker` の ONNX 推論バックエンド。`wire-server` にはリンクされない |
| `bench-internals` | なし | bench・診断専用フック（`hybrid.rs::sparse_refetch_observed` 等）を公開 API から分離するための feature |

## Notes

- engine crate のライブラリ名（`use` 時の参照名）は `engine`、crates.io 公開名は `fandhe-vector-db-engine`。`Cargo.toml` の `[lib] name = "engine"` と `[package] name = "fandhe-vector-db-engine"` が分離している点に注意。
- wire-server も同様に、バイナリ名は `wire-server`、lib 名は `wire_server`、crates.io 公開名は `fandhe-vector-db-wire-server`。
- engine の非 optional（既定で有効な）依存は `redb`（永続化層、TASK-140）と `wgpu`（バッチ検索の GPU 経路、TASK-128〜130）の 2 つ。`usearch` / `ort` / `tokenizers` は `optional = true` で `contrast-bench` / `cross-encoder` feature の背後にのみ存在する。`wgpu` は feature ゲートされておらず常にコンパイル対象になる（GPU の可否は実行時の初期化結果のみで決まる方針。CORE-12: 経路を外部から上書きする機構は設けない）。
- `contrast-bench` / `cross-encoder` / `bench-internals` はいずれもベンチ・診断専用で、既定ビルド・`wire-server` バイナリには結線されない。
- crates.io への公開はタグトリガーではなく `.github/workflows/release.yml` の `workflow_dispatch`（環境 `crates-io-release` の承認ゲート）からのみ行う。

## Related

- [overview](./overview.md)
- [lib](./lib.md)
