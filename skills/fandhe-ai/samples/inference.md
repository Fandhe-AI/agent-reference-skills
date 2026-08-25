# Inference

`compat::Sequential` の推論 2 経路（`predict()` と、明示 `Tape` + `forward()`）が同一結果を返すことを確認する。

```rust
use fandhe_ai::compat::{Sequential, array};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let model = Sequential::new()
        .add_linear(4, 8, /* seed = */ 42)?
        .add_relu()
        .add_linear(8, 2, /* seed = */ 43)?;

    // numpy `np.array` 慣習でバッチ入力を組み立てる（2 行 4 列）。
    let input = array(vec![
        vec![0.1_f32, 0.2, 0.3, 0.4],
        vec![0.5_f32, 0.6, 0.7, 0.8],
    ])?;

    // 経路 1: predict()。
    let predicted = model.predict(&input)?;
    println!("predict() output shape: {:?}", predicted.shape());
    let predicted_00 = predicted
        .get(&[0, 0])
        .ok_or("predict() の出力 shape は [2, 2] のはず（index [0, 0] は範囲内）")?;
    println!("predict() output[0, 0] = {predicted_00}");

    // 経路 2: 外部 Tape + forward + to_tensor。
    let tape = fandhe_ai::tape();
    let input_var = tape.var(&input);
    let output_var = model.forward(&tape, &input_var)?;
    let output = output_var.to_tensor();
    println!("forward() output shape: {:?}", output.shape());

    // 同一モデル・同一入力のため、2 経路の出力は shape・要素数・値の
    // すべてがビット一致するはず（`predict` は内部で `tape()` を構築して
    // `forward` を呼ぶだけ）。
    if predicted.shape() != output.shape() {
        return Err(format!(
            "predict() と forward() の出力 shape が不一致: {:?} != {:?}",
            predicted.shape(),
            output.shape()
        )
        .into());
    }
    let predicted_data = predicted
        .contiguous()
        .as_slice()
        .ok_or("contiguous() 直後は必ず as_slice() が Some")?
        .to_vec();
    let output_data = output
        .contiguous()
        .as_slice()
        .ok_or("contiguous() 直後は必ず as_slice() が Some")?
        .to_vec();
    let bit_exact = predicted_data
        .iter()
        .zip(output_data.iter())
        .all(|(a, b)| a.to_bits() == b.to_bits());
    println!("predict() と forward() の出力はビット一致: {bit_exact}");
    if !bit_exact {
        return Err("predict() と forward() の出力がビット一致しない（数値退行の可能性）".into());
    }

    Ok(())
}
```

実行: `cargo run -p fandhe-ai --example inference`

## Notes

- 経路 1（`Sequential::predict`）は内部で `fandhe_ai::tape()`（既定 CPU・`CpuBackendOps`・融合有効）を構築し forward するだけの最も簡単な推論入口
- 経路 2（外部 `Tape` + `Sequential::forward` + `Var::to_tensor`）は呼び出し側が `Tape` を持ち回りたい用途（grad check・複数層を跨いだ計算グラフを自分で組みたい場合等）向け
- 同一モデル・同一入力であれば 2 経路の出力はビット一致する（数値一致契約の確認に使える）
