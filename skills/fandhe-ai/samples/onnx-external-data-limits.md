---
source: https://docs.rs/crate/fandhe-ai/0.11.0/source/src/interop/onnx.rs
---

# ONNX Load with External Data Limits

`OnnxModel::from_path_with_limits` で external data の読み込み予算を既定の 64 GiB から 8 GiB へ引き下げて ONNX モデルを読み込む。

Adapted (not in the official docs): `fn main`・引数でのパス受け取り・`println!` を追加。

```rust
use fandhe_ai::interop::onnx::{OnnxExternalDataLimits, OnnxModel};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 第 1 引数に読み込む .onnx のパスを渡す
    let path = std::env::args().nth(1).ok_or("usage: <model.onnx>")?;

    let mut limits = OnnxExternalDataLimits::default();
    limits.max_total_bytes = 8 << 30;
    let _model = OnnxModel::from_path_with_limits(&path, &limits)?;
    println!("loaded: {path}");
    Ok(())
}
```

## Notes

- `OnnxExternalDataLimits` の呼び出し部（`default()` → `max_total_bytes` 代入 → `from_path_with_limits`）は `src/interop/onnx.rs`（0.11.0）の doc 例（上流では `no_run` の doctest）。`fn main`・引数でのパス受け取り・`?` によるエラー処理は実行できる形にするための追加で、原文には無い。`.onnx` ファイルは利用者が用意する
- `OnnxExternalDataLimits` は `#[non_exhaustive]` のため構造体リテラルで構築できず、`default()` へ代入して使う。既定は `max_total_bytes` 64 GiB・`max_external_files` 4096（原文の doc コメント）
- `max_total_bytes` / `max_external_files` を `0` にすると、非ゼロ長の external テンソル（または external 参照）を 1 件でも含むモデルを拒否する。値は検証せずそのまま渡され、上げるとピークメモリが増える（最悪でおよそ 2 倍）
- 同ファイルにはこれ以外のコード例がなく、ONNX の推論実行例は 0.11.0 の examples にも無い。実行 API は references の `interop` 系ページを参照
- `Box<dyn Error>` への `?` 変換は `references/guides/interop.md` の同形の `main` に倣う
