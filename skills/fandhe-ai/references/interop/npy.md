---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/interop/npy/index.html
---

# interop::npy（.npy / .npz 読み書き）

NumPy 互換 `.npy` / `.npz` の `Tensor<f32>` 向けパス版読み書き。`fandhe_ai_tensor_core::io` の純再エクスポートで、公開するのは 5 名のみ（別名なし）。

## Signature / Usage

```rust
use fandhe_ai::Tensor;
use fandhe_ai::interop::npy::{load_npy, load_npz, save_npy, save_npz};
use std::collections::HashMap;

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
```

## Options / Props

| Name | Signature | Description |
| --- | --- | --- |
| `load_npy` | `fn load_npy<P: AsRef<Path>>(path: P) -> Result<Tensor<f32>, NpyError>` | 単一配列の読み込み |
| `save_npy` | `fn save_npy<P: AsRef<Path>>(t: &Tensor<f32>, path: P) -> Result<(), NpyError>` | 単一配列の書き出し |
| `load_npz` | `fn load_npz<P: AsRef<Path>>(path: P) -> Result<HashMap<String, Tensor<f32>>, NpyError>` | 複数配列の読み込み |
| `save_npz` | `fn save_npz<P: AsRef<Path>>(map: &HashMap<String, Tensor<f32>>, path: P) -> Result<(), NpyError>` | 複数配列の書き出し（キー昇順で決定的） |
| `NpyError` | `enum`（`#[non_exhaustive]`） | npy / npz 共通のエラー型 |

## Notes

- 対象は `Tensor<f32>` のみ（`<f4` / `>f4`）。他 dtype は `NpyError::UnsupportedDtype` で拒否
- npz の読み込みは STORED / DEFLATE、書き出しは STORED のみ（zip64 書き出しなし）
- `NpyError` は `#[non_exhaustive]`（`match` にはワイルドカード腕が必要）で `Clone` / `PartialEq` を持たない。`Display` の文言は契約ではない。variant にはソース上 `Io` / `InvalidMagic` / `UnsupportedVersion` / `HeaderTooLarge` / `InvalidHeader` / `UnsupportedDtype` / `DataLengthMismatch` / `Shape` / `InvalidZip` / `UnsupportedCompression` / `UnsupportedZipFeature` / `CrcMismatch` / `DuplicateEntry` / `InvalidEntryName` / `Entry` / `EntryTooLarge` / `TooManyEntries` / `InvalidDeflate` / `FileTooLarge` / `DecompressedSizeExceeded` がある
- 書き込みは原子的ではない: `save_npy` / `save_npz` は `std::fs::write` を使い、途中クラッシュで不完全なファイルが残りうる。一時ファイル + `rename` の `interop::safetensors::save_safetensors_f32` とは異なる
- 読み込みは symlink を辿り、ファイルサイズ上限は 1 GiB。信頼できないパスを渡してよいかは呼び出し側の責任。ヘッダ長・npz の伸長後サイズ・CRC-32 の検証は `tensor-core` 実装を継承し迂回しない
- バイト列版（`read_npy_bytes` 等 4 関数）と `Tensor` へのメソッド追加は公開されない
- `compat::Sequential::state_dict` の `HashMap<String, Tensor<f32>>` はそのまま `save_npz` に渡せる

## Related

- [safetensors](./safetensors.md)
- [onnx](./onnx.md)
- [tensor](../api/tensor.md)
