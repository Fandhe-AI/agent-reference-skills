---
source: https://docs.rs/crate/fandhe-ai/0.14.0/source/src/interop/safetensors.rs
---

# Safetensors Save and Load

`Sequential::state_dict` を safetensors バイト列に保存し、別のモデルへ `load_state_dict` で復元する。後半は dtype 混在（typed API）の往復と、bf16 チェックポイントの書き出し・F32 への昇格。

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

typed API（0.14.0）で F64・I64・BOOL を混ぜたマップのバイト列往復:

```rust
use std::collections::HashMap;
use fandhe_ai::Tensor;
use fandhe_ai::interop::safetensors::{
    SafetensorsDtype, SafetensorsTensor, load_safetensors_typed_from_bytes,
    save_safetensors_typed_to_bytes,
};

fn main() {
    let mut m: HashMap<String, SafetensorsTensor> = HashMap::new();
    m.insert("a".into(), SafetensorsTensor::F64(Tensor::new(vec![1.5f64], &[1]).unwrap()));
    m.insert("b".into(), SafetensorsTensor::I64(Tensor::new(vec![7i64, -1], &[2]).unwrap()));
    m.insert("c".into(), SafetensorsTensor::Bool(Tensor::new(vec![true, false], &[2]).unwrap()));

    let bytes = save_safetensors_typed_to_bytes(&m, None).unwrap();
    let back = load_safetensors_typed_from_bytes(&bytes).unwrap();
    assert_eq!(back["a"].dtype(), SafetensorsDtype::F64);
    assert_eq!(back["b"].dtype(), SafetensorsDtype::I64);
    assert_eq!(back["c"].dtype(), SafetensorsDtype::Bool);
    match &back["b"] {
        SafetensorsTensor::I64(t) => assert_eq!(t.host_slice().to_vec(), vec![7, -1]),
        _ => unreachable!(),
    }
}
```

`Sequential::state_dict` を bf16 チェックポイントとして書き、読み戻して f32 へ昇格する:

```rust
use std::collections::HashMap;
use fandhe_ai::compat::Sequential;
use fandhe_ai::interop::safetensors::{
    SafetensorsDtype, SafetensorsTensor, load_safetensors_typed, save_safetensors_typed,
};

fn main() {
    let model = Sequential::new().add_linear(4, 8, /* seed = */ 1).unwrap();
    let mut typed: HashMap<String, SafetensorsTensor> = HashMap::new();
    for (k, v) in model.state_dict() {
        typed.insert(k, SafetensorsTensor::from_f32(&v, SafetensorsDtype::BF16).unwrap());
    }

    let dir = std::env::temp_dir().join(format!("fandhe-ai-st-typed-doc-{}", std::process::id()));
    std::fs::create_dir_all(&dir).unwrap();
    let path = dir.join("bf16.safetensors");
    save_safetensors_typed(&path, &typed).unwrap();
    let loaded = load_safetensors_typed(&path).unwrap();
    std::fs::remove_dir_all(&dir).unwrap();

    let mut f32s = HashMap::new();
    for (k, v) in &loaded {
        assert_eq!(v.dtype(), SafetensorsDtype::BF16);
        f32s.insert(k.clone(), v.to_f32().unwrap());
    }
    let mut other = Sequential::new().add_linear(4, 8, /* seed = */ 2).unwrap();
    other.load_state_dict(f32s).unwrap();
}
```

## Notes

- コードは `src/interop/safetensors.rs`（0.14.0）モジュール doc の例を `main` に包んだもの（上流では doctest）。後半 2 例は 0.14.0 で追加された typed API の例（`*_typed` は dtype 混在ファイル用で、`*_f32` は F32 専用のまま不変。f32 への昇格は明示的な `SafetensorsTensor::to_f32`）。パス版は `save_safetensors_f32` / `load_safetensors_f32`（一時ファイル + `rename` で保存）
- F32 以外の dtype は `LoadError::UnsupportedDtype`。PyTorch の `nn.Linear.weight`（`[out, in]`）等の転置は暗黙には行われず、`Tensor::transpose_2d` を呼び出し側が明示する。`require_keys` は不足キーを全件返す
- `compat::save_model` / `compat::load_model` は層構成を含めたシリアライズ（本ページは重みのみ）。HF レイアウトからの復元は `hf-safetensors-sequential.md` を参照
- `fandhe-ai =0.14.0` に対し、本ページのコード（`main` ごと）を `cargo check` で確認し、実行して `assert` が通ることも確認済み（2026-11-14）
