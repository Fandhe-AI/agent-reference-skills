---
source: https://docs.rs/crate/fandhe-ai/0.11.0/source/src/interop/safetensors.rs
---

# Safetensors Save and Load

`Sequential::state_dict` を safetensors バイト列に保存し、別のモデルへ `load_state_dict` で復元する。

```rust
use fandhe_ai::compat::Sequential;
use fandhe_ai::interop::safetensors::{
    load_safetensors_f32_from_bytes, save_safetensors_f32_to_bytes,
};

fn main() {
    let model = Sequential::new().add_linear(4, 8, /* seed = */ 1).unwrap();

    let state = model.state_dict();
    let bytes = save_safetensors_f32_to_bytes(&state, None).unwrap();
    let loaded = load_safetensors_f32_from_bytes(&bytes).unwrap();

    let mut other = Sequential::new().add_linear(4, 8, /* seed = */ 2).unwrap();
    other.load_state_dict(loaded).unwrap();
}
```

## Notes

- コードは `src/interop/safetensors.rs`（0.11.0）モジュール doc の例を `main` に包んだもの（上流では doctest）。パス版は `save_safetensors_f32` / `load_safetensors_f32`（一時ファイル + `rename` で保存）
- F32 以外の dtype は `LoadError::UnsupportedDtype`。PyTorch の `nn.Linear.weight`（`[out, in]`）等の転置は暗黙には行われず、`Tensor::transpose_2d` を呼び出し側が明示する。`require_keys` は不足キーを全件返す
- `compat::save_model` / `compat::load_model` は層構成を含めたシリアライズ（本ページは重みのみ）。HF レイアウトからの復元は `hf-safetensors-sequential.md` を参照
- この環境では `cargo check` を実行できなかったため、本ページのコンパイル検証は未実施（上流 doctest に依拠）
