---
source: https://docs.rs/crate/fandhe-ai/0.14.0/source/src/interop/onnx.rs
---

# ONNX bind_autograd

`compat::Sequential` から作った `OnnxModel` を `Tape` へ `bind_autograd` で束縛し、`forward` → 損失 → `tape.backward` で学習対象 initializer の勾配を得る。

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

## Notes

- コードは `src/interop/onnx.rs`（0.14.0）の `OnnxModel::bind_autograd` の doc 例（上流では doctest）。`fn main` と `?` の戻り型は doctest の隠し行（`# fn main() ...`）を展開したもの
- 勾配経路の op は 11 種（`Gemm` / `MatMul` / `Add` / `Mul` / `Div` / `Sqrt` / `Relu` / `Sigmoid` / `Erf` / `Softmax` / `LayerNormalization`）。`Conv` / `Reshape` / `Transpose` など 22 op に到達すると `OnnxError::UnsupportedInAutograd` で拒否される。`OnnxAutogradOptions::with_trainable` で学習対象の initializer を絞れる（存在しない名前は `OnnxError::UnknownTrainable`）
- `forward` は「initializer を除く入力 1 個・出力 1 個」のグラフ専用。書き戻し API はなく、学習ループはステップごとに新しい `Tape` へ bind し、更新後の重みを initializer と同名の feed として `OnnxModel::run` に渡す（`references/interop/onnx.md`）
- GPU の `Tape` でも 11 op の計算はホストで実行され、性能は保証されない
- `fandhe-ai =0.14.0` に対し、本ページのコードを `cargo check` で確認し、実行して `assert` が通ることも確認済み（2026-11-14）

## Related

- [onnx-external-data-limits.md](./onnx-external-data-limits.md)
