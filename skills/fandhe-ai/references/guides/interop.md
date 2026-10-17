---
source: https://fandhe-ai.github.io/fandhe-ai/guides/interop/
---

# ONNX・safetensors・npy 相互運用

ONNX・safetensors・NumPy（npy / npz）との相互運用層の設計と、0.11.0 時点でのサポート境界。いずれも `fandhe-ai` クレートの `interop` モジュールから公開されている（実装は内部クレート `fandhe-ai-onnx-interop` / `fandhe-ai-tensor-core`。内部クレートの直接 `use` はサポート対象外）。

## Signature / Usage

```rust
// fandhe_ai::interop::onnx
OnnxModel::from_bytes(bytes: &[u8]) -> Result<Self, OnnxError>
OnnxModel::from_path(path: impl AsRef<Path>) -> Result<Self, OnnxError>
OnnxModel::from_path_with_limits(path: impl AsRef<Path>, limits: &OnnxExternalDataLimits) -> Result<Self, OnnxError>
OnnxModel::from_sequential(model: &Sequential) -> Result<Self, OnnxError>
OnnxModel::run(&self, feeds: HashMap<String, OnnxValue>) -> Result<HashMap<String, OnnxValue>, OnnxError>
OnnxModel::to_bytes(&self, options: &OnnxExportOptions) -> Result<Vec<u8>, OnnxError>
OnnxModel::to_path(&self, path: impl AsRef<Path>, options: &OnnxExportOptions) -> Result<(), OnnxError>

// fandhe_ai::interop::safetensors
pub fn load_safetensors_f32(path: &Path) -> Result<HashMap<String, Tensor<f32>>, LoadError>
pub fn load_safetensors_f32_from_bytes(bytes: &[u8]) -> Result<HashMap<String, Tensor<f32>>, LoadError>
pub fn save_safetensors_f32(path: &Path, tensors: &HashMap<String, Tensor<f32>>) -> Result<(), SaveError>
pub fn save_safetensors_f32_to_bytes(tensors: &HashMap<String, Tensor<f32>>, metadata: Option<HashMap<String, String>>) -> Result<Vec<u8>, SaveError>
pub fn require_keys(map: &HashMap<String, Tensor<f32>>, keys: &[&str]) -> Result<(), LoadError>

// fandhe_ai::interop::npy
pub fn load_npy<P: AsRef<Path>>(path: P) -> Result<Tensor<f32>, NpyError>
pub fn save_npy<P: AsRef<Path>>(t: &Tensor<f32>, path: P) -> Result<(), NpyError>
pub fn load_npz<P: AsRef<Path>>(path: P) -> Result<HashMap<String, Tensor<f32>>, NpyError>
pub fn save_npz<P: AsRef<Path>>(map: &HashMap<String, Tensor<f32>>, path: P) -> Result<(), NpyError>
```

ONNX import（推論専用）の最小例:

```rust
use std::collections::HashMap;

use fandhe_ai::interop::onnx::{OnnxModel, OnnxValue};
use fandhe_ai::Tensor;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let model = OnnxModel::from_path("model.onnx")?;

    let mut feeds = HashMap::new();
    feeds.insert(
        "input".to_string(),
        OnnxValue::F32(Tensor::<f32>::new(vec![0.0, 1.0], &[1, 2])?),
    );

    let outputs = model.run(feeds)?;
    if let OnnxValue::F32(y) = &outputs["output"] {
        println!("{:?}", y.as_slice());
    }
    Ok(())
}
```

学習済み `compat::Sequential` から ONNX への export（`torch.onnx.export` 相当）:

```rust
use fandhe_ai::compat::Sequential;
use fandhe_ai::interop::onnx::{OnnxExportOptions, OnnxModel};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let model = Sequential::new()
        .add_linear(4, 8, 0x1111)?
        .add_relu()
        .add_linear(8, 2, 0x2222)?;

    let onnx = OnnxModel::from_sequential(&model)?;
    onnx.to_path("model.onnx", &OnnxExportOptions::default())?;
    Ok(())
}
```

`compat::Sequential::state_dict` / `load_state_dict` と safetensors の組み合わせ:

```rust
use fandhe_ai::compat::Sequential;
use fandhe_ai::interop::safetensors::{load_safetensors_f32, save_safetensors_f32};
use std::path::Path;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let model = Sequential::new().add_linear(4, 8, /* seed = */ 1)?;
    let path = Path::new("weights.safetensors");
    save_safetensors_f32(path, &model.state_dict())?;

    let mut restored = Sequential::new().add_linear(4, 8, /* seed = */ 2)?;
    restored.load_state_dict(load_safetensors_f32(path)?)?;
    Ok(())
}
```

## Options / Props

| 項目 | 内容 |
| --- | --- |
| `OnnxModel` / `OnnxValue` / `OnnxError` | ONNX の import / run / export の公開型。`OnnxValue` は `F32` / `I64` / `Bool` / `F16`（`Tensor<f16>`）の 4 種。`OnnxError` は `#[non_exhaustive]` で、facade だけで名指し・`match` できる自己完結型 |
| `OnnxExportOptions` | `ir_version: i64`・`opset_version: i64` の 2 フィールド（`#[non_exhaustive]`）。既定値は `ir_version=8`・`opset_version=17`。値は検証せずそのまま書き出す |
| `OnnxExternalDataLimits` | external data（PyTorch dynamo exporter が出力する companion `.onnx.data`）の読み込み予算。`max_total_bytes: u64`（既定 64 GiB）・`max_external_files: usize`（既定 4096）。`#[non_exhaustive]` のため `default()` へ代入して使う。超過モデルは確保前に `OnnxError::InvalidModel` で拒否する |
| ONNX export の対象 | import 済みモデルの roundtrip export と、学習済み `compat::Sequential` からの `OnnxModel::from_sequential`。`from_sequential` の対応層は `Linear` / `ReLU` / `Softmax` / `LayerNorm` / `GELU`（erf 版）/ `Conv2d` の 6 種。非対応層を 1 つでも含む場合は `Graph` を構築せず `OnnxError::UnsupportedLayer { index, layer_kind }`、空の `Sequential` は `OnnxError::InvalidModel` |
| ONNX の op 範囲 | export allowlist は 26 op（既定 domain。`GlobalAveragePool` / `BatchNormalization` / `Flatten` を含む）。allowlist 外のノードを含むモデルは `from_bytes` では構築できても `to_bytes` / `to_path` で `OnnxError::UnsupportedOp`。import 対応は 36 op で、`MaxPool` / `AveragePool`（#2199）・`Clip` / `Tanh` / `Gelu` / `Where` / `Expand` / `ReduceMean` / `Pad` / `Resize`（#2186）は import のみ |
| safetensors | ワイヤフォーマットの読み書きのみを `safetensors` クレートに任せ、テンソルへのマッピングは自作実装。dtype は F32 限定で、他の dtype は実行時エラー `UnsupportedDtype` として明示的に拒否する。キー充足検査（`require_keys`）は fail-closed。ラウンドトリップはビット一致を保証する |
| npy / npz | NumPy 互換の `.npy` / `.npz` 読み書き。`Tensor<f32>` 限定・パス版のみ。書き出しは原子的ではなく、読み込みは symlink を辿る |
| `ModelRegistry` | `fandhe_ai::model::ModelRegistry`。`$HOME/.fandhe-ai/models/<name>/<version>/model.safetensors`（Windows は `$USERPROFILE`）のレイアウトを規定し、名前・バージョン指定での同期ロード（`load`）と一覧（`available_models`）を提供する。配置は利用者が手動で行い、ディレクトリの作成・削除は一切しない読み取り専用のレジストリ |

## Notes

- 0.3.0 時点の旧ページは「相互運用機能は `fandhe-ai` から公開されていない」「`fandhe-ai` 経由での利用は現状不可」と記していたが、0.11.0 では誤り。ONNX は `fandhe_ai::interop::onnx`、safetensors は `fandhe_ai::interop::safetensors`、npy / npz は `fandhe_ai::interop::npy` として `fandhe-ai` から公開されている。`site/index.md` の「ONNX export は未提供」も古い記述で、`OnnxModel::to_bytes` / `to_path` / `from_sequential` が存在する（API の詳細は 0.11.0 の `src/interop/onnx.rs` が正）
- `OnnxModel::run` は既定ではホスト CPU 実行のみ（`BackendOps` / `Device` を経由しない）で、autograd 未接続（入出力は `Tensor` であり `Var` ではないため勾配は取れない）。サイト原稿はホスト CPU 実行のみと書くが、0.11.0 のソースには `set_cuda_onnx_gpu_execution_enabled` / `set_metal_onnx_gpu_execution_enabled` による GPU 実行の opt-in フラグがある（`api/backend-tuning.md` 参照）
- `OnnxValue::F16` は `half::f16` を素通しするため、扱うには利用者側が `half` クレートへ直接依存する必要がある
- ONNX の数値契約は `abs_err/(|ref|+1e-6) <= 1e-3` という ONNX 固有の判定式で、数値一致契約のバックエンド間統一複合判定とは別指標
- `value_info`（中間テンソルの型・形状情報）は常に空で書き出される。`fandhe-ai` 自身の `from_bytes` / `from_path` に対する roundtrip は bit 同一だが、`onnx.checker` 等の外部ツールでの厳密な妥当性検証までは保証しない
- import 時に元モデルの `opset_import` / `ir_version` / `producer_name` / グラフ名は保持されない。export 結果には `OnnxExportOptions` の値が書き出されるため、元モデルの opset と合わせる責任は利用者側にある
- `from_sequential` の `LayerNorm` は `elementwise_affine=true`（既定）のみ対応（ONNX `LayerNormalization` の `Scale` 必須制約）。`Conv2d` は単体または `Conv2d` → 活性化の構成に限り、`Flatten` / Pooling は非対応のため CNN 全体の export はできない。書き出した feed 名は常に `"input"`、出力名は `"output"`
- `Linear` / `ReLU` のみのモデルは、ReLU 入力に NaN が現れず GEMM 出力に厳密な `±0.0` が現れない場合、roundtrip 後の `run` 出力が `model.predict(&x)` と bit 完全一致する。Softmax / LayerNorm / GELU / Conv2d を含むモデルは REQ-2 統一複合判定（相対誤差 1e-3 未満 または 絶対誤差 1e-5 未満）で一致する
- safetensors の保存 → 読込は bit 完全一致を保証し、`load_state_dict` は不足キー・形状不一致を型付き `Err` で fail-closed に拒否する（strict・two-pass アトミック契約。既存 `Sequential` の shape が保存前と異なる場合はパラメータが一切変更されない）
- ONNX の protobuf デコードは `prost` を使うが `prost-build`（ビルド時に `protoc` を要求する）は使わず手書き derive で対応する。外部フォーマットのパースは長さ・形状の検証をデータ変換より先に行う（OWASP A03 相当）
- `ModelRegistry::load` / `available_models` は no-follow オープン（シンボリックリンク経由の脱出対策）が Linux（x86_64 / aarch64）・macOS 限定実装のため、Windows および上記以外のアーキテクチャでは現時点で常に失敗する（`load` はエラー、`available_models` は常に空の一覧）。キャッシュルートの解決自体は Windows でも動作する
- `fandhe-ai-onnx-interop` は 0.11.0 で crates.io 公開済みだが、依存解決のための公開であり直接利用はサポート対象外（`internals/onnx-interop.md` 参照）。各 API の詳細は新規の `interop/` カテゴリを参照

## Related

- [backends](./backends.md)
- [onnx-interop](../internals/onnx-interop.md)
