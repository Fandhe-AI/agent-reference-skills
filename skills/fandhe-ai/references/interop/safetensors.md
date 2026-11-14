---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/interop/safetensors/index.html
---

# interop::safetensors（load / save safetensors F32 / typed）

safetensors ワイヤフォーマットの F32 読み書きと、dtype 混在ファイル用の typed 読み書き（F32 / F16 / BF16 / F64 / I32 / I64 / BOOL）。`fandhe_ai_onnx_interop` の `st_load` / `st_save` を、ロジックを複製せず純再エクスポートした公開面。

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

// dtype 混在（typed）
pub fn load_safetensors_typed(path: &Path) -> Result<HashMap<String, SafetensorsTensor>, LoadError>
pub fn load_safetensors_typed_from_bytes(bytes: &[u8]) -> Result<HashMap<String, SafetensorsTensor>, LoadError>
pub fn require_keys_typed(map: &HashMap<String, SafetensorsTensor>, keys: &[&str]) -> Result<(), LoadError>
pub fn save_safetensors_typed(path: &Path, tensors: &HashMap<String, SafetensorsTensor>) -> Result<(), SaveError>
pub fn save_safetensors_typed_to_bytes(
    tensors: &HashMap<String, SafetensorsTensor>,
    metadata: Option<HashMap<String, String>>,
) -> Result<Vec<u8>, SaveError>

impl SafetensorsTensor {
    pub fn dtype(&self) -> SafetensorsDtype
    pub fn shape(&self) -> &[usize]
    pub fn to_f32(&self) -> Result<Tensor<f32>, ShapeError>
    pub fn from_f32(t: &Tensor<f32>, dtype: SafetensorsDtype) -> Result<Self, ShapeError>
}
impl SafetensorsDtype {
    pub fn header_name(&self) -> &'static str
}
```

F64 / I64 / BOOL を混ぜたマップのバイト列往復（rustdoc の例）。

```rust
use std::collections::HashMap;
use fandhe_ai::Tensor;
use fandhe_ai::interop::safetensors::{
    SafetensorsDtype, SafetensorsTensor, load_safetensors_typed_from_bytes,
    save_safetensors_typed_to_bytes,
};

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
| `load_safetensors_typed` | `std::fs::read` + `load_safetensors_typed_from_bytes` |
| `load_safetensors_typed_from_bytes` | dtype 混在のまま `name -> SafetensorsTensor` へ変換（F32 / F16 / BF16 / F64 / I32 / I64 / BOOL の 7 種。値は bit 単位で保つ）。それ以外の dtype は `LoadError::UnsupportedDtype`、BOOL の 0 / 1 以外は `LoadError::InvalidBoolValue` |
| `require_keys_typed` | `require_keys` の typed 版。不足キーを全件入力順で `LoadError::MissingKeys` に集める |
| `save_safetensors_typed` | 同一ディレクトリへ一時ファイルを書いてから `rename`（`save_safetensors_f32` と実装共有）。`metadata` は `None` 固定 |
| `save_safetensors_typed_to_bytes` | `SafetensorsTensor` マップをそのまま書き出す（暗黙の型変換なし）。キー昇順で決定的。`metadata` は pass-through |
| `SafetensorsDtype`（`#[non_exhaustive]`） | `F32` / `F16` / `BF16` / `F64` / `I32` / `I64` / `Bool`。`header_name()` はヘッダの `"dtype"` 文字列（`"BOOL"` 等） |
| `SafetensorsTensor`（`#[non_exhaustive]`） | `F32(Tensor<f32>)` / `F16(Tensor<f16>)` / `BF16(Tensor<bf16>)` / `F64(Tensor<f64>)` / `I32(Tensor<i32>)` / `I64(Tensor<i64>)` / `Bool(Tensor<bool>)`。`dtype()` / `shape()` / `to_f32()`（明示昇格）/ `from_f32(&Tensor<f32>, SafetensorsDtype)`（明示変換） |
| `LoadError` / `SaveError` | 型付きエラー（いずれも `#[non_exhaustive]`） |

### LoadError

| Variant | Description |
| --- | --- |
| `Io(std::io::Error)` | ファイル読み込みの I/O エラー |
| `SafetensorsFormat(String)` | ヘッダ・レイアウト不整合 |
| `MissingKeys(Vec<String>)` | `require_keys` が検出した不足キー（全件） |
| `UnsupportedDtype { key, dtype }` | 対応外の dtype（`*_f32` 系は F32 以外、`*_typed` 系は上記 7 種以外） |
| `InvalidBoolValue { key, index, value }` | `*_typed` 系で BOOL テンソルに 0 / 1 以外のバイトがあった（`true` に丸めず拒否） |
| `DataLengthMismatch { key, expected, actual }` | データ長が shape の要求する要素数と不一致 |
| `Shape(ShapeError)` | `Tensor::new` の shape 検査エラー（要素数積 overflow 等） |

### SaveError

| Variant | Description |
| --- | --- |
| `Io(std::io::Error)` | 一時ファイル書き出し・`rename` を含む I/O エラー |
| `SafetensorsFormat(String)` | `safetensors::tensor::serialize` のエラー |
| `DataUnavailable { key }` | `contiguous()` 後もデータスライスを取得できない内部不整合（通常到達しない） |

## Notes

- 0.3.0 時点の旧ドキュメント（README 由来の旧 guides/interop.md）は safetensors 読み書きを `fandhe-ai` から未公開としていたが、0.11.0 以降は `fandhe_ai::interop::safetensors` として再エクスポート済み。実体は内部クレート `fandhe-ai-onnx-interop` の `st_load.rs` / `st_save.rs` / `require_keys.rs`
- typed API: HF Hub の bf16 / f16 チェックポイントや f32 重み + i64 buffer の混在ファイルは既存の `*_f32` では `LoadError::UnsupportedDtype` で拒否される（不変）。`*_typed` は別名の入口で、f32 への昇格は明示 opt-in の `SafetensorsTensor::to_f32` のみ。`to_f32` は F32 恒等・F16 / BF16 は完全表現・F64 / I64 / I32 は丸め（非可逆）・BOOL は 0 / 1。`from_f32` は F16 / BF16 を最近接偶数丸め（範囲超過は ±inf）、BOOL は `v != 0.0`（NaN は true）
- `half` は再エクスポートされない。`F16` / `BF16` variant を名指しする利用者は `half` クレートへ直接依存する。dtype 判定だけなら `SafetensorsTensor::dtype` で足りる
- 検証順序（typed）: ヘッダ・レイアウト → dtype（要素幅の計算より前に fail-closed）→ checked な要素数積と長さ一致 → 変換（BOOL は同じループで 0 / 1 検査）→ `Tensor::new`。名前を昇順で走査するため、複数の不正があっても報告されるエラーは決定的
- Migration (v0.11 → v0.14): 0.11.0 の本ページは F32 専用の公開面だった。0.14.0 で上記 typed API（`SafetensorsDtype` / `SafetensorsTensor` / `load_/save_safetensors_typed(_from_bytes / _to_bytes)` / `require_keys_typed`）と `LoadError::InvalidBoolValue` が追加された。既存の `*_f32` は不変
- クレートルート直下にも別実装の `LoadError` / `require_keys`（`onnx::interp` 用）があるが、ここで再エクスポートされるのは `st_load` / `st_save` 配下のもののみ。両者を混同しない
- 暗黙アダプタなし: PyTorch `nn.Linear.weight`（`[out_features, in_features]`）等の転置・キーリネームは行わない。必要なら呼び出し側が `Tensor::transpose_2d` を明示的に呼ぶ
- 検証順序: ヘッダ・レイアウト整合 → dtype 検査（F32 以外は拒否） → データ長整合 → `Tensor::new` の shape 検査。入力総バイト数の明示上限は無い
- 非 contiguous の（view）テンソルは `contiguous()` で論理 row-major に詰めてから書き出す
- `save_npz` / `save_npy`（`interop::npy`）と異なり、`save_safetensors_f32` は一時ファイル + `rename` でクラッシュ時にも完全なファイルか元ファイルのいずれかのみが残る
- 層構成のシリアライズ（`compat::save_model` / `compat::load_model`）は本モジュールの `save_safetensors_f32_to_bytes` / `load_safetensors_f32_from_bytes` を再利用する別 API。`model::ModelRegistry::save` / `load` もこのモジュールの safetensors 読み書きを使う
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/interop/safetensors/index.html（0.14.0, 取得日 2026-11-14）。typed API の挙動はタグ v0.14.0 の `src/interop/safetensors.rs` rustdoc と `fandhe-ai-onnx-interop` 0.14.0 の `st_load.rs` / `st_save.rs`

## Related

- [npy](./npy.md)
- [onnx](./onnx.md)
- [model-registry](./model-registry.md)
- [compat-sequential](../api/compat-sequential.md)
