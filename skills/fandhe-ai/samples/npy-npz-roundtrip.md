---
source: https://docs.rs/crate/fandhe-ai/0.11.0/source/src/interop/npy.rs
---

# NumPy npy / npz Roundtrip

`Tensor<f32>` を `.npy` / `.npz` に書き出して読み戻す。

```rust
use fandhe_ai::Tensor;
use fandhe_ai::interop::npy::{load_npy, load_npz, save_npy, save_npz};
use std::collections::HashMap;

fn main() {
    let dir = std::env::temp_dir().join(format!("fandhe-ai-npy-doc-{}", std::process::id()));
    std::fs::create_dir_all(&dir).unwrap();

    let t = Tensor::new(vec![1.0f32, 2.0, 3.0, 4.0], &[2, 2]).unwrap();
    let npy = dir.join("a.npy");
    save_npy(&t, &npy).unwrap();
    let back = load_npy(&npy).unwrap();
    assert_eq!(back.shape(), t.shape());
    assert_eq!(back.as_slice().unwrap(), t.as_slice().unwrap());

    let mut map = HashMap::new();
    map.insert("w".to_string(), t.clone());
    let npz = dir.join("a.npz");
    save_npz(&map, &npz).unwrap();
    let loaded = load_npz(&npz).unwrap();
    assert_eq!(loaded["w"].as_slice().unwrap(), t.as_slice().unwrap());

    std::fs::remove_dir_all(&dir).unwrap();
}
```

## Notes

- コードは `src/interop/npy.rs`（0.11.0）のモジュール doc 例（上流では doctest）を `fn main` で包んだもの。`Sequential::state_dict` の `HashMap<String, Tensor<f32>>` はそのまま `save_npz` に渡せる
- 対象は `Tensor<f32>`（`<f4` / `>f4`）のみ。他 dtype は `NpyError::UnsupportedDtype`。`NpyError` は `#[non_exhaustive]` のため `match` にはワイルドカード腕が必要
- 書き込みは原子的ではない（`std::fs::write`）。一時ファイル + rename の `save_safetensors_f32` とは異なる。読み込みは symlink を辿り、ファイルサイズ上限は 1 GiB
