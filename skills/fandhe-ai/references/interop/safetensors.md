---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/interop/safetensors/index.html
---

# interop::safetensors（load / save safetensors F32）

safetensors ワイヤフォーマットの F32 読み書き。`fandhe_ai_onnx_interop` の `st_load` / `st_save` を、ロジックを複製せず純再エクスポートした公開面。

## Signature / Usage

```rust
use fandhe_ai::compat::Sequential;
use fandhe_ai::interop::safetensors::{
    load_safetensors_f32_from_bytes, save_safetensors_f32_to_bytes,
};

let model = Sequential::new().add_linear(4, 8, /* seed = */ 1).unwrap();

let state = model.state_dict();
let bytes = save_safetensors_f32_to_bytes(&state, None).unwrap();
let loaded = load_safetensors_f32_from_bytes(&bytes).unwrap();

let mut other = Sequential::new().add_linear(4, 8, /* seed = */ 2).unwrap();
other.load_state_dict(loaded).unwrap();
```

```rust
pub fn load_safetensors_f32(path: &Path) -> Result<HashMap<String, Tensor<f32>>, LoadError>
pub fn load_safetensors_f32_from_bytes(bytes: &[u8]) -> Result<HashMap<String, Tensor<f32>>, LoadError>
pub fn require_keys(map: &HashMap<String, Tensor<f32>>, keys: &[&str]) -> Result<(), LoadError>
pub fn save_safetensors_f32(path: &Path, tensors: &HashMap<String, Tensor<f32>>) -> Result<(), SaveError>
pub fn save_safetensors_f32_to_bytes(
    tensors: &HashMap<String, Tensor<f32>>,
    metadata: Option<HashMap<String, String>>,
) -> Result<Vec<u8>, SaveError>
```

## Options / Props

### 公開アイテム

| Name | Description |
| --- | --- |
| `load_safetensors_f32` | `std::fs::read` + `load_safetensors_f32_from_bytes` |
| `load_safetensors_f32_from_bytes` | バイト列を `name -> Tensor<f32>` へ変換。F32 以外は `LoadError::UnsupportedDtype` |
| `require_keys` | 期待キーの不足を全件収集して `LoadError::MissingKeys` で返す |
| `save_safetensors_f32` | 同一ディレクトリへ一時ファイルを書いてから `rename`。`metadata` は `None` 固定 |
| `save_safetensors_f32_to_bytes` | キー昇順で決定的に書き出す。`metadata` は `__metadata__` への pass-through |
| `LoadError` / `SaveError` | 型付きエラー（いずれも `#[non_exhaustive]`） |

### LoadError

| Variant | Description |
| --- | --- |
| `Io(std::io::Error)` | ファイル読み込みの I/O エラー |
| `SafetensorsFormat(String)` | ヘッダ・レイアウト不整合 |
| `MissingKeys(Vec<String>)` | `require_keys` が検出した不足キー（全件） |
| `UnsupportedDtype { key, dtype }` | F32 以外の dtype |
| `DataLengthMismatch { key, expected, actual }` | データ長が shape の要求する要素数と不一致 |
| `Shape(ShapeError)` | `Tensor::new` の shape 検査エラー（要素数積 overflow 等） |

### SaveError

| Variant | Description |
| --- | --- |
| `Io(std::io::Error)` | 一時ファイル書き出し・`rename` を含む I/O エラー |
| `SafetensorsFormat(String)` | `safetensors::tensor::serialize` のエラー |
| `DataUnavailable { key }` | `contiguous()` 後もデータスライスを取得できない内部不整合（通常到達しない） |

## Notes

- 0.3.0 時点の旧ドキュメント（README 由来の旧 guides/interop.md）は safetensors 読み書きを `fandhe-ai` から未公開としていたが、0.11.0 では `fandhe_ai::interop::safetensors` として再エクスポート済み。実体は内部クレート `fandhe-ai-onnx-interop` の `st_load.rs` / `st_save.rs` / `require_keys.rs`
- クレートルート直下にも別実装の `LoadError` / `require_keys`（`onnx::interp` 用）があるが、ここで再エクスポートされるのは `st_load` / `st_save` 配下のもののみ。両者を混同しない
- 暗黙アダプタなし: PyTorch `nn.Linear.weight`（`[out_features, in_features]`）等の転置・キーリネームは行わない。必要なら呼び出し側が `Tensor::transpose_2d` を明示的に呼ぶ
- 検証順序: ヘッダ・レイアウト整合 → dtype 検査（F32 以外は拒否） → データ長整合 → `Tensor::new` の shape 検査。入力総バイト数の明示上限は無い
- 非 contiguous の（view）テンソルは `contiguous()` で論理 row-major に詰めてから書き出す
- `save_npz` / `save_npy`（`interop::npy`）と異なり、`save_safetensors_f32` は一時ファイル + `rename` でクラッシュ時にも完全なファイルか元ファイルのいずれかのみが残る
- 層構成のシリアライズ（`compat::save_model` / `compat::load_model`）は本モジュールの `save_safetensors_f32_to_bytes` / `load_safetensors_f32_from_bytes` を再利用する別 API

## Related

- [npy](./npy.md)
- [onnx](./onnx.md)
- [model-registry](./model-registry.md)
- [compat-sequential](../api/compat-sequential.md)
