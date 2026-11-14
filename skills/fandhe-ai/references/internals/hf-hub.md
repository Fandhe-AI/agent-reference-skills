---
source: https://docs.rs/fandhe-ai-hf-hub/0.14.0/fandhe_ai_hf_hub/
---

# hf-hub

Hugging Face Hub 連携の補助クレート。`repo_id`・revision の検証、branch / tag の commit sha への固定、指定 commit のファイル一覧取得を提供する。`fandhe-ai`（facade）の公開 API だけに依存し、facade は本クレートに依存しない（依存方向は hf-hub → facade の一方向）。

- crate 名: `fandhe-ai-hf-hub`（docs.rs `fandhe-ai-hf-hub/0.14.0`）。0.14.0 で crates.io に公開。**第三者の `hf-hub` クレートとは無関係**（取り違えに注意）
- 版は facade と lockstep。依存は `fandhe-ai`・`serde`・`serde_json` と、`cfg(unix)` 限定の `ureq`（`native-tls` + `vendored`）
- 本カテゴリの他クレートと異なり、`docs/compat-api-scope.md` §0 の限定例外として公開面（`tests/api_surface.rs` の `EXPECTED_LIB_PUBLIC`）に限りサポート対象。ただし facade の安定性保証の外にある

## Signature / Usage

commit sha 指定の解決はネットワークを使わない（rustdoc の例）。

Adapted (not in the official docs): rustdoc の非表示行（`# Ok::<...>`）を `fn main` と `Ok(())` に展開した。

```rust
use fandhe_ai::model::ModelRegistry;
use fandhe_ai_hf_hub::{HfHub, HfRepoId, Revision};

fn main() -> Result<(), Box<dyn std::error::Error>> {
let hub = HfHub::new(ModelRegistry::with_cache_dir(
    std::env::temp_dir().join("fandhe-ai-hf-hub-doc-resolve"),
));
let repo = HfRepoId::parse("org/model")?;
let sha = "0123456789abcdef0123456789abcdef01234567";
let pinned = hub.resolve_revision(&repo, &Revision::parse(sha)?)?;
assert_eq!(pinned.as_str(), sha);
Ok(())
}
```

## Options / Props

公開 API（`lib.rs` のクレートルート。公開モジュールは無い）:

| Name | Kind | Description |
| --- | --- | --- |
| `HfHub::new(ModelRegistry)` / `registry()` | struct | facade の `ModelRegistry` を保持する入口 |
| `HfHub::resolve_revision(&HfRepoId, &Revision) -> Result<CommitSha, HfError>` | method | branch / tag を commit sha へ固定。sha 指定ならネットワークを使わず全プラットフォームで成功 |
| `HfHub::list_files(&HfRepoId, &CommitSha) -> Result<Vec<RepoFile>, HfError>` | method | 指定 commit のファイル一覧。応答の sha が要求 commit と一致しなければ `InvalidResponse`。件数は 10,000・各パスは 1,024 バイトまで |
| `HfRepoId` | struct | 検証済み `namespace/name`。`parse` / `namespace()` / `name()` |
| `Revision` | struct | 検証済み revision（ref 名または commit sha）。`main()` / `parse` / `to_commit_sha()` / `commit_sha()` / `ref_name()` / `as_str()` |
| `CommitSha` | struct | 40 桁小文字 16 進。`parse` / `as_str()` |
| `RepoFile` | struct | リポジトリ内ファイル 1 件。`path()` は `/` 区切りの相対パス |
| `HfError` | enum（`#[non_exhaustive]`） | `InvalidRepoId` / `InvalidRevision` / `InvalidFilename` / `InvalidResponse` / `ResponseTooLarge` / `NotFound` / `Unauthorized` / `Gated` / `Http` / `Network` / `Model` |
| `CachedModel` | struct | 取得済みモデルの識別子（`name()` = `hf--<namespace>--<repo>`、`version()` = commit sha、`filename()` = `model.safetensors`）。これを返す `HfHub::download` は crate 内限定で、公開 API からは生成されない |

## Notes

- Adapted from the official docs: the hidden rustdoc line `# Ok::<(), fandhe_ai_hf_hub::HfError>(())` is expanded into an explicit `fn main() -> Result<...>` wrapper.

- 他の内部クレート（直接利用は非サポート）と異なり、公開面に限りサポート対象。それ以外の内部は非サポート
- 接続先は `https://huggingface.co` 固定。リダイレクトは追従せず `HfError::Http` で拒否し、応答は 1 MiB で打ち切る。認証トークンは読まず送らず（`HF_TOKEN` 等を設定しても使われない）、private / gated repo は fail-closed で非対応（401 → `Unauthorized`・403 → `Gated`・404 → `NotFound`。private repo も 404 になりうる）
- 転送層は `cfg(unix)` のみ。非 unix で ref 指定の `resolve_revision` / `list_files` を呼ぶと `HfError::Network`（`Unsupported`）を返す
- `HfHub::download`（commit sha 固定の `model.safetensors` を facade の `ModelRegistry::download_with` で取得）は `pub(crate)`。facade の `download_with` にリダイレクト先ホストの allowlist が無く（設計 §9.10 A10）、sha256 pin は内容の真正性しか保証しないため公開していない。ファイル本体の取得は facade の `ModelRegistry::download_with` と呼び出し側の `Sha256Pin` で行う
- `HfRepoId` / `Revision` の文字集合・長さ上限は外部仕様確認前の暫定値で、fail-closed に厳しめへ倒している。エラーには入力値を含めない
- `RepoFile::path` はサーバ由来の文字列。絶対パス・`..`・`.`・空セグメント・`\`・制御文字・不可視の書式文字は拒否済みだが、ファイルシステムのパスへ直結する前に呼び出し側でも保存先の固定・衝突確認を行う
- bf16 / f16 のチェックポイントも取得自体は成功しうるが、`ModelRegistry::load` は F32 限定契約のため読込時に fail-closed になる。dtype 混在の読込は facade の `interop::safetensors::load_safetensors_typed` を使う
- 実通信テストは `src/live_tests.rs`（全件 `#[ignore]`・公開 repo のみ）。通常 CI は外部通信しない
- README・ワークスペース `Cargo.toml`（v0.14.0 タグ）は「0.14.0 で公開予定」と書いたままだが、crates.io に 0.14.0 が存在するため公開済みを正とする
- Source: https://docs.rs/fandhe-ai-hf-hub/0.14.0/fandhe_ai_hf_hub/（0.14.0, 取得日 2026-11-14）。設計の正本は `docs/hf-hub-integration-design.md`（https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.14.0/docs/hf-hub-integration-design.md、§9・§10）

## Related

- [onnx-interop](./onnx-interop.md)
- [tensor-core](./tensor-core.md)
