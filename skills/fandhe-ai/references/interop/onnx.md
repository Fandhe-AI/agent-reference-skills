---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/interop/onnx/struct.OnnxModel.html
---

# interop::onnx（OnnxModel / OnnxValue / OnnxExportOptions / OnnxExternalDataLimits / OnnxError）

ONNX モデルの import（読み込み）・推論実行・export（書き出し）を行う薄いラッパー型 `OnnxModel`。推論専用で autograd には接続されない（入出力は `Tensor` であり `Var` ではない）。

## Signature / Usage

```rust
use fandhe_ai::interop::onnx::{OnnxExternalDataLimits, OnnxModel};

let mut limits = OnnxExternalDataLimits::default();
limits.max_total_bytes = 8 << 30;
let model = OnnxModel::from_path_with_limits("model.onnx", &limits);
```

```rust
impl OnnxModel {
    pub fn from_bytes(bytes: &[u8]) -> Result<Self, OnnxError>;
    pub fn from_path(path: impl AsRef<Path>) -> Result<Self, OnnxError>;
    pub fn from_path_with_limits(
        path: impl AsRef<Path>,
        limits: &OnnxExternalDataLimits,
    ) -> Result<Self, OnnxError>;
    pub fn from_sequential(model: &Sequential) -> Result<Self, OnnxError>;
    pub fn run(
        &self,
        feeds: HashMap<String, OnnxValue>,
    ) -> Result<HashMap<String, OnnxValue>, OnnxError>;
    pub fn to_bytes(&self, options: &OnnxExportOptions) -> Result<Vec<u8>, OnnxError>;
    pub fn to_path(
        &self,
        path: impl AsRef<Path>,
        options: &OnnxExportOptions,
    ) -> Result<(), OnnxError>;
}
```

## Options / Props

### OnnxModel のメソッド

| Name | Description |
| --- | --- |
| `from_bytes` | `.onnx` のバイト列から構築。protobuf デコード（`OnnxError::Decode`）→ グラフ構築（形状・トポロジ検証）の順。external data は非対応で fail-closed に拒否 |
| `from_path` | ファイルから読み込む。`data_location = EXTERNAL` の initializer / `Constant` 属性テンソル（companion `.onnx.data`）を解決できる。基点ディレクトリは `path` の親（親が無ければ `.`）。既定予算は合計 64 GiB・distinct ファイル 4096 |
| `from_path_with_limits` | `from_path` と同じ読み込みを external data の予算指定付きで行う。予算超過は確保前に `OnnxError::InvalidModel` で拒否。external data を持たないモデルでは `limits` は結果に影響しない |
| `from_sequential` | 学習済み `compat::Sequential` から直接構築。対応層は `Linear` / `ReLU` / `Softmax` / `LayerNorm` / `GELU`（erf 版）/ `Conv2d` の 6 種。非対応層を含むと `OnnxError::UnsupportedLayer`、空の `Sequential` は `OnnxError::InvalidModel` |
| `run` | グラフを実行。`feeds` はグラフ入力名 → 値（pre-IR-4 セマンティクスで同名 initializer を上書き） |
| `to_bytes` | 保持グラフを `.onnx` バイト列へ書き出す（roundtrip export 限定）。allowlist 外 op は `OnnxError::UnsupportedOp` |
| `to_path` | `to_bytes` 成功後に `std::fs::write`。export 失敗時はファイルを作成・切り詰めない。既存ファイルは上書き |

### OnnxExportOptions（`#[non_exhaustive]`）

| Name | Type | Description |
| --- | --- | --- |
| `ir_version` | `i64` | 既定 `8`。値は検証せずそのまま書き出す |
| `opset_version` | `i64` | 既定 `17`。値は検証せずそのまま書き出す |

### OnnxExternalDataLimits（`#[non_exhaustive]`、`Default` で構築して代入する）

| Name | Type | Description |
| --- | --- | --- |
| `max_total_bytes` | `u64` | 読み込む raw バイト列の合計上限（既定 64 GiB）。`0` は非ゼロ長の external テンソルを 1 件でも含めば拒否 |
| `max_external_files` | `usize` | 参照する distinct ファイル数の上限（既定 4096）。`0` は external 参照を 1 件でも含めば拒否 |

### OnnxValue

| Variant | Payload |
| --- | --- |
| `F32` | `Tensor<f32>` |
| `I64` | `Tensor<i64>` |
| `Bool` | `Tensor<bool>` |
| `F16` | `Tensor<f16>`（`half::f16` を素通し。名指しするには利用者側で `half` クレートへ直接依存が必要） |

### OnnxError（`#[non_exhaustive]`）

| Variant | Description |
| --- | --- |
| `Io(std::io::Error)` | ファイル I/O 失敗、external data の欠落・権限エラー、読み込み・実行時・export 時のメモリ確保失敗（`ErrorKind::OutOfMemory`） |
| `Decode { message }` | protobuf デコード失敗 |
| `UnsupportedDataType { tensor_name, data_type }` | 対応範囲外の `data_type` |
| `SparseInitializerNotSupported { tensor_name, count }` | `GraphProto.sparse_initializer` が非空 |
| `UnsupportedOp { op_type }` | 未対応の `op_type`（import 実行時、または export allowlist 外。既定 domain 以外は `"{domain}::{op_type}"`） |
| `MissingFeed { input }` | グラフ入力に対応する feed が無い |
| `UnknownFeed { name }` | feed 名がグラフ入力にも initializer にも属さない |
| `UnsupportedLayer { index, layer_kind }` | `from_sequential` が非対応層を検出 |
| `InvalidModel { message }` | 上記以外のモデル構築時・export 時エラー |
| `Execution { message }` | 上記以外の実行時エラー |

## Notes

- ONNX Runtime や Windows ML ではなく、fandhe-ai の自作インタープリタである（`fandhe_ai_onnx_interop` 内部クレートの `decode_model` → `build_graph` → `interp::run` を束ねる）。Windows ML は windows-ai スキルを参照
- 既定はホスト CPU 実行のみ。`set_cuda_onnx_gpu_execution_enabled` / `set_metal_onnx_gpu_execution_enabled`（Metal は macOS 限定）の opt-in（既定 OFF）が有効な場合のみ、`run` が `BackendOps` 経由の device 実行を試みる（評価順は CUDA → Metal、両方 ON なら CUDA 優先。`Unsupported` / `ShapeMismatch` はホストへフォールバック、device・driver 不在は `OnnxError::Execution` で fail-closed）。フラグ自体の説明は api/backend-tuning.md を参照
- import 対応は 36 op（onnx-interop の interp.rs / export.rs の doc。facade の src/interop/onnx.rs 冒頭の「28 種」は 36 op へ拡大する前の古い記述）（未知の `op_type` は `OnnxError::UnsupportedOp` で拒否、無言 skip しない）
- export allowlist は 26 op（既定 domain）。`MaxPool` / `AveragePool` ほか import のみ対応の op を含むモデルは `from_bytes` で構築できても export 時に `OnnxError::UnsupportedOp` となる（import・export 非対称）
- `value_info` は常に空。ONNX の `opset_import` / `ir_version` / `producer_name` / グラフ名は import 時に保持されないため、export 結果は `OnnxExportOptions` の値になる。元モデルの opset と合わせる責任は利用者側にある。`onnx.checker` 等による厳密な妥当性は保証しない
- 同一モデルの `to_bytes` は決定的（initializer は名前順、tensor は常に `raw_data` リトルエンディアン）
- `from_sequential` の graph input 名は `"input"`、output 名は `"output"`、initializer 名は `{i}.weight` / `{i}.bias`。`Linear` / `ReLU` のみのモデルは条件付きで `predict` と bit 一致、他の層を含む場合は相対誤差 1e-3 未満または絶対誤差 1e-5 未満の複合判定で検証される
- 数値契約は REQ-7 判定式（`abs_err/(|ref|+1e-6) <= 1e-3`）で、バックエンド間の REQ-2 統一複合判定とは別指標
- ONNX は非信頼入力。dims 非負・要素数 overflow 拒否・データ長一致・名前重複 / SSA / トポロジカル順の検証は内部クレートの既存検査を通す。入力総バイト数の明示上限は導入されていない（external data の予算は `OnnxExternalDataLimits` で別管理）
- `from_path` / `to_path` はパスをシェル展開・連結せずそのまま渡す
- 読み込みのピークメモリは最大でおよそ「予算上限 + 最大テンソル 1 個分」。上限を上げるとピークメモリが増える。確保失敗はプロセス終了ではなく `OnnxError::Io(OutOfMemory)`（OS のページコミット時 OOM は残存リスク）

## Related

- [safetensors](./safetensors.md)
- [compat-sequential](../api/compat-sequential.md)
- [interop ガイド](../guides/interop.md)
