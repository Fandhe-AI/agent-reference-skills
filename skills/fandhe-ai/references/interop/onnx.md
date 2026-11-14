---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/interop/onnx/struct.OnnxModel.html
---

# interop::onnx（OnnxModel / OnnxValue / OnnxExportOptions / OnnxExternalDataLimits / OnnxError / OnnxAutograd*）

ONNX モデルの import（読み込み）・推論実行・export（書き出し）を行う薄いラッパー型 `OnnxModel`。`run` は推論専用（入出力は `Tensor` であり `Var` ではなく勾配は取れない）。学習（autograd）は別の入口 `bind_autograd`（`OnnxAutogradGraph`）を使う。

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
    pub fn bind_autograd<'m, 't>(
        &'m self,
        tape: &'t Tape,
        options: &OnnxAutogradOptions,
    ) -> Result<OnnxAutogradGraph<'m, 't>, OnnxError>;
}

impl OnnxAutogradOptions {
    pub fn with_trainable(names: HashSet<String>) -> Self;
}

impl<'m, 't> OnnxAutogradGraph<'m, 't> {
    pub fn run(
        &self,
        feeds: HashMap<String, OnnxTapeValue<'t>>,
    ) -> Result<HashMap<String, OnnxTapeValue<'t>>, OnnxError>;
    pub fn forward(&self, input: &Var<'t>) -> Result<Var<'t>, OnnxError>;
    pub fn params(&self) -> Vec<(String, Var<'t>)>;
    pub fn param(&self, name: &str) -> Option<Var<'t>>;
}
```

学習（`bind_autograd`。rustdoc の例）。

```rust
use fandhe_ai::Tensor;
use fandhe_ai::compat::Sequential;
use fandhe_ai::interop::onnx::{OnnxAutogradOptions, OnnxModel};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let seq = Sequential::new()
        .add_linear(2, 3, 1)?
        .add_relu()
        .add_linear(3, 1, 2)?;
    let model = OnnxModel::from_sequential(&seq)?;
    let tape = fandhe_ai::tape();
    let g = model.bind_autograd(&tape, &OnnxAutogradOptions::default())?;
    let x = tape.var(&Tensor::new(vec![0.5_f32, -0.25, 1.0, 2.0], &[2, 2])?);
    let y = g.forward(&x)?;
    let loss = y.sum(None)?;
    let grads = tape.backward(&loss)?;
    let params = g.params();
    assert!(!params.is_empty());
    for (_, v) in &params {
        assert!(grads.get(v)?.is_some());
    }
    Ok(())
}
```

## Options / Props

### OnnxModel のメソッド

| Name | Description |
| --- | --- |
| `from_bytes` | `.onnx` のバイト列から構築。protobuf デコード（`OnnxError::Decode`）→ グラフ構築（形状・トポロジ検証）の順。external data は非対応で fail-closed に拒否 |
| `from_path` | ファイルから読み込む。`data_location = EXTERNAL` の initializer / `Constant` 属性テンソル（companion `.onnx.data`）を解決できる。基点ディレクトリは `path` の親（親が無ければ `.`）。既定予算は合計 64 GiB・distinct ファイル 4096 |
| `from_path_with_limits` | `from_path` と同じ読み込みを external data の予算指定付きで行う。予算超過は確保前に `OnnxError::InvalidModel` で拒否。external data を持たないモデルでは `limits` は結果に影響しない |
| `from_sequential` | 学習済み `compat::Sequential` から直接構築。対応層は `Linear` / `ReLU` / `Sigmoid` / `Softmax` / `LayerNorm` / `GELU`（erf 版）/ `Conv2d` の 7 種。非対応層を含むと `OnnxError::UnsupportedLayer`、空の `Sequential` は `OnnxError::InvalidModel` |
| `run` | グラフを実行。`feeds` はグラフ入力名 → 値（pre-IR-4 セマンティクスで同名 initializer を上書き） |
| `to_bytes` | 保持グラフを `.onnx` バイト列へ書き出す（roundtrip export 限定）。allowlist 外 op は `OnnxError::UnsupportedOp` |
| `bind_autograd` | ONNX グラフを `tape` 上へ束縛し、学習可能な `OnnxAutogradGraph` を返す。`options` の `trainable` 既定は全 F32 initializer。存在しない名前は `OnnxError::UnknownTrainable` で拒否 |
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

### OnnxAutogradOptions / OnnxAutogradGraph / OnnxTapeValue

| Name | Description |
| --- | --- |
| `OnnxAutogradOptions`（`#[non_exhaustive]`・`Default`・フィールド非公開） | 既定は全 F32 initializer を学習対象にする。`with_trainable(names: HashSet<String>)` で `names` の F32 initializer のみを学習対象に絞る（他は凍結） |
| `OnnxAutogradGraph::run` | feed `HashMap<String, OnnxTapeValue>` でグラフを実行。検証順序は `OnnxModel::run` と同じ（`MissingFeed` → `UnknownFeed`） |
| `OnnxAutogradGraph::forward` | 「initializer を除く入力 1 個・出力 1 個」のグラフ専用の便宜 API。それ以外は `OnnxError::NotSingleInputOutput` |
| `OnnxAutogradGraph::params` / `param` | 学習対象 initializer の `(名前, Var)` 列（名前順で決定的）/ 名前で 1 個取り出す |
| `OnnxTapeValue::Var(Var)` / `Const(OnnxValue)` | 勾配追跡対象の F32 テンソル / 非追跡値（任意 dtype）。`#[non_exhaustive]` |

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
| `UnsupportedInAutograd { node, op_type }` | `bind_autograd` 経路で勾配追跡を実装していない op（22 op）に到達（fail-closed） |
| `UnknownTrainable { name }` | `with_trainable` の名前が F32 initializer に存在しない（typo・非 F32 名） |
| `NotSingleInputOutput { inputs, outputs }` | `OnnxAutogradGraph::forward` を入力 1 個・出力 1 個以外のグラフへ使った |
| `FeedTypeMismatch { name, expected }` | feed / 中間値の dtype 種別が op の期待と異なる（`expected` は説明文字列） |
| `Autodiff(AutodiffError)` | autodiff 層（`Var` 演算）が返したエラー（`source()` は `Some`） |
| `InvalidModel { message }` | 上記以外のモデル構築時・export 時エラー |
| `Execution { message }` | 上記以外の実行時エラー |

## Notes

- `bind_autograd` の対応 op: 勾配経路 11 種（`Gemm` / `MatMul` / `Add` / `Mul` / `Div` / `Sqrt` / `Relu` / `Sigmoid` / `Erf` / `Softmax` / `LayerNormalization`）、非勾配経路 3 種（`Shape` / `Cast` / `Constant`）。残り 22 op（`Gather` / `Unsqueeze` / `Concat` / `Slice` / `Mod` / `Reshape` / `Squeeze` / `Transpose` / `Clip` / `Tanh` / `Gelu` / `Where` / `Expand` / `ReduceMean` / `Pad` / `Resize` / `Conv` / `MaxPool` / `AveragePool` / `BatchNormalization` / `GlobalAveragePool` / `Flatten`）に到達すると `OnnxError::UnsupportedInAutograd` で拒否する（無言 skip しない）
- `bind_autograd` の実行先: GPU の `Tape` でも 11 op の計算はホストで実行され性能は保証しない。実行先は `Tape` の device で決まり、`set_cuda_onnx_gpu_execution_enabled` 等の opt-in は `OnnxModel::run` だけに効く（`bind_autograd` は見ない）。`Cast`（F32 から F32 以外）では勾配が切れる（意図的）
- `bind_autograd` に書き戻し API はない。学習ループはステップごとに新しい `Tape` へ bind し、更新後の重みを initializer と同名の feed として `OnnxModel::run` に渡す（`run` は同名 feed で initializer を上書きする）
- Migration (v0.11 → v0.14): 0.11.0 の本ページは `OnnxModel` を「autograd 未接続」とし、`from_sequential` の対応層を 6 種（`Sigmoid` は対象外）としていた。0.14.0 は `bind_autograd` / `OnnxAutogradOptions` / `OnnxAutogradGraph` / `OnnxTapeValue` と `OnnxError` の新 variant を追加し、`from_sequential` の対応層に `Sigmoid` を加えて 7 種とした
- ONNX Runtime や Windows ML ではなく、fandhe-ai の自作インタープリタである（`fandhe_ai_onnx_interop` 内部クレートの `decode_model` → `build_graph` → `interp::run` を束ねる）。Windows ML は windows-ai スキルを参照
- 既定はホスト CPU 実行のみ。`set_cuda_onnx_gpu_execution_enabled` / `set_metal_onnx_gpu_execution_enabled`（Metal は macOS 限定）の opt-in（既定 OFF）が有効な場合のみ、`run` が `BackendOps` 経由の device 実行を試みる（評価順は CUDA → Metal、両方 ON なら CUDA 優先。`Unsupported` / `ShapeMismatch` はホストへフォールバック、device・driver 不在は `OnnxError::Execution` で fail-closed）。フラグ自体の説明は api/backend-tuning.md を参照
- import 対応は 36 op（onnx-interop の interp.rs / export.rs の doc。facade の src/interop/onnx.rs 冒頭の「28 種」は 36 op へ拡大する前の古い記述）（未知の `op_type` は `OnnxError::UnsupportedOp` で拒否、無言 skip しない）
- export allowlist は 26 op（既定 domain）。`MaxPool` / `AveragePool` ほか import のみ対応の op を含むモデルは `from_bytes` で構築できても export 時に `OnnxError::UnsupportedOp` となる（import・export 非対称）
- `value_info` は常に空。ONNX の `opset_import` / `ir_version` / `producer_name` / グラフ名は import 時に保持されないため、export 結果は `OnnxExportOptions` の値になる。元モデルの opset と合わせる責任は利用者側にある。`onnx.checker` 等による厳密な妥当性は保証しない
- 同一モデルの `to_bytes` は決定的（initializer は名前順、tensor は常に `raw_data` リトルエンディアン）
- `Sigmoid` を含む `Sequential` の `from_sequential` は bit 一致を主張せず、複合判定（相対誤差 1e-3 未満または絶対誤差 1e-5 未満）で一致する（0.14.0 の facade rustdoc）
- `from_sequential` の graph input 名は `"input"`、output 名は `"output"`、initializer 名は `{i}.weight` / `{i}.bias`。`Linear` / `ReLU` のみのモデルは条件付きで `predict` と bit 一致、他の層を含む場合は相対誤差 1e-3 未満または絶対誤差 1e-5 未満の複合判定で検証される
- 数値契約は REQ-7 判定式（`abs_err/(|ref|+1e-6) <= 1e-3`）で、バックエンド間の REQ-2 統一複合判定とは別指標
- ONNX は非信頼入力。dims 非負・要素数 overflow 拒否・データ長一致・名前重複 / SSA / トポロジカル順の検証は内部クレートの既存検査を通す。入力総バイト数の明示上限は導入されていない（external data の予算は `OnnxExternalDataLimits` で別管理）
- `from_path` / `to_path` はパスをシェル展開・連結せずそのまま渡す
- 読み込みのピークメモリは最大でおよそ「予算上限 + 最大テンソル 1 個分」。上限を上げるとピークメモリが増える。確保失敗はプロセス終了ではなく `OnnxError::Io(OutOfMemory)`（OS のページコミット時 OOM は残存リスク）
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/interop/onnx/struct.OnnxModel.html（0.14.0, 取得日 2026-11-14）。`bind_autograd` 関連はタグ v0.14.0 の `src/interop/onnx.rs` rustdoc と `docs/onnx-autograd-decision.md` §8

## Related

- [safetensors](./safetensors.md)
- [compat-sequential](../api/compat-sequential.md)
- [interop ガイド](../guides/interop.md)
