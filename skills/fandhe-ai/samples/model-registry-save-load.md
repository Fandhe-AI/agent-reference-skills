---
source: https://docs.rs/crate/fandhe-ai/0.14.0/source/src/model.rs
---

# ModelRegistry save / load / download

`ModelRegistry::save` で state dict を `<cache_dir>/<name>/<version>/model.safetensors` へ保存して `load` で読み戻す。`download` / `download_with` は HTTPS 取得で、SHA-256 pin と進捗コールバックを `DownloadOptions` で渡す。

```rust
use fandhe_ai::Tensor;
use fandhe_ai::model::{ModelError, ModelRegistry};
use std::collections::HashMap;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let nanos = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map(|d| d.as_nanos())
        .unwrap_or(0);
    let root = std::env::temp_dir().join(format!(
        "fandhe-ai-model-save-doc-{}-{nanos}",
        std::process::id()
    ));
    let registry = ModelRegistry::with_cache_dir(root.clone());
    let mut state = HashMap::new();
    state.insert("w".to_string(), Tensor::new(vec![1.0_f32, 2.0], &[2])?);
    match registry.save("mlp", "v1", &state) {
        Ok(()) => {
            let loaded = registry.load("mlp", "v1")?;
            assert_eq!(loaded.len(), 1);
            assert_eq!(
                registry.available_models(),
                vec![("mlp".to_string(), vec!["v1".to_string()])]
            );
        }
        Err(ModelError::Io(e)) if e.kind() == std::io::ErrorKind::Unsupported => {}
        Err(e) => return Err(e.into()),
    }
    let _ = std::fs::remove_dir_all(&root);
    Ok(())
}
```

pin・進捗付きの `download_with` のオプション組み立て（`fetch` は実行せずコンパイルのみ。実行部分は `http://` が接続前に `InvalidUrl` で拒否されることを示す）:

```rust
use fandhe_ai::model::{
    DownloadOptions, DownloadProgress, ModelError, ModelRegistry, Sha256Pin,
};

fn fetch(registry: &ModelRegistry, opts: DownloadOptions<'_>) -> Result<(), ModelError> {
    registry.download_with("https://example.com/mlp.safetensors", "mlp", "v1", opts)
}

fn main() {
    let _ = fetch;
    let registry = ModelRegistry::with_cache_dir("/nonexistent/fandhe-models-doctest");
    let pin = Sha256Pin::from_hex(&"0".repeat(64)).unwrap();
    let mut on_progress = |p: DownloadProgress| {
        let _ = (p.received, p.total);
    };
    let opts = DownloadOptions::default()
        .expected_sha256(pin)
        .progress(&mut on_progress);
    // 非 unix は fail-closed で非対応（`Io(Unsupported)`）のため unix のみ検証する。
    #[cfg(unix)]
    {
        let err = registry
            .download_with("http://example.com/mlp.safetensors", "mlp", "v1", opts)
            .unwrap_err();
        assert!(matches!(err, ModelError::InvalidUrl { .. }));
    }
}
```

## Notes

- コードは `src/model.rs`（0.14.0）の `save` / `download_with` の doc 例（上流では doctest）。`fn main` と `?` の戻り型は隠し行（`# Ok::<...>`）の展開で、2 例目は `fetch` 定義と `let _ = fetch;` を含む doctest 全体を `fn main` に包んだもの
- `save` は Linux の x86_64 / aarch64 のみ（他では `ModelError::Io` の `ErrorKind::Unsupported` で、上の `match` が受ける）。`download` / `download_with` は unix のみ
- `download` は URL の `https` 限定・資格情報付き URL の拒否・各リダイレクトでの再検証を行う。URL にトークン等の secret を直書きしない。真正性が必要な場合は `Sha256Pin` を指定する（pin 無しの保証は破損・部分改変の検出のみ）。内部ネットワークへの宛先遮断（SSRF）は呼び出し側の責務。詳細は `references/interop/model-registry.md`
- 実際の取得（`fetch`）はネットワークを使うためここでは実行しない。`Sha256Pin::from_hex` の `"0".repeat(64)` は形式検証の例示用ダミー値で、実在するモデルの SHA-256 ではない
- `fandhe-ai =0.14.0` に対し、本ページのコードを `cargo check` で確認し、実行して `assert` が通ることも確認済み（2026-11-14）

## Related

- [safetensors-save-load.md](./safetensors-save-load.md)
