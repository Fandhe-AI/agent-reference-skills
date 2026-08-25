---
source: https://raw.githubusercontent.com/Fandhe-AI/rust-ai-library/main/crates/facade/examples/training_loop.rs
---

# Training Loop

`compat::Sequential` と手動 SGD で最小の学習ループを回し、loss が減少することを確認する。

```rust
use bench_harness::rng::Xorshift64Star;
use fandhe_ai::Tensor;
use fandhe_ai::compat::Sequential;

const BATCH: usize = 4;
const D_IN: usize = 8;
const D_HIDDEN: usize = 16;
const D_OUT: usize = 4;

const SEED_DATA: u64 = 0xC0FFEE;
const SEED_L1: u64 = 0x1111_1111;
const SEED_L2: u64 = 0x2222_2222;

const STEPS: usize = 100;
const LR: f32 = 0.05;

fn gen_regression_data(
    seed: u64,
) -> Result<(Tensor<f32>, Tensor<f32>), Box<dyn std::error::Error>> {
    let mut rng = Xorshift64Star::new(seed);
    let x = rng.fill_vec(BATCH * D_IN);
    let y = rng.fill_vec(BATCH * D_OUT);
    Ok((
        Tensor::new(x, &[BATCH, D_IN])?,
        Tensor::new(y, &[BATCH, D_OUT])?,
    ))
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut model = Sequential::new()
        .add_linear(D_IN, D_HIDDEN, SEED_L1)?
        .add_relu()
        .add_linear(D_HIDDEN, D_OUT, SEED_L2)?;

    let (x_data, y_data) = gen_regression_data(SEED_DATA)?;

    let mut initial_loss = None;
    let mut final_loss = 0.0_f32;

    for step in 0..STEPS {
        // 1 ステップ分の Tape 上で forward → backward → 手動 SGD 更新値の
        // 計算までを行い、更新後テンソル列をブロック外へ持ち出す。
        // ブロックを抜けると `bound`（`&model` を借用）と `tape` が drop
        // され、直後の `apply_parameters`（`&mut model`）呼び出しと
        // 借用が競合しない。
        let updated: Vec<Tensor<f32>> = {
            let tape = fandhe_ai::tape();
            let bound = model.bind(&tape);
            let x = tape.var(&x_data);
            let y = tape.var(&y_data);

            let pred = bound.forward(&tape, &x)?;
            let loss = pred.mse_loss(&y)?;
            let loss_value = loss
                .to_tensor()
                .get(&[])
                .ok_or("loss はスカラー shape [] のはず")?;
            if step == 0 {
                initial_loss = Some(loss_value);
            }
            final_loss = loss_value;

            let grads = tape.backward(&loss)?;
            let grad_refs = bound.trainable_grads(&grads)?;
            let param_refs = model.trainable_parameters();

            let mut next_params = Vec::with_capacity(param_refs.len());
            for (param, grad) in param_refs.iter().zip(grad_refs.iter()) {
                let param_data = param.contiguous().as_slice().ok_or(
                    "trainable_parameters() の要素は contiguous() 直後は必ず as_slice() が Some",
                )?.to_vec();
                let grad_data = grad
                    .contiguous()
                    .as_slice()
                    .ok_or("trainable_grads() の要素は contiguous() 直後は必ず as_slice() が Some")?
                    .to_vec();
                let sgd_data: Vec<f32> = param_data
                    .iter()
                    .zip(grad_data.iter())
                    .map(|(p, g)| p - LR * g)
                    .collect();
                next_params.push(Tensor::from_slice(&sgd_data, param.shape())?);
            }
            next_params
        };
        model.apply_parameters(updated)?;
    }

    let initial_loss = initial_loss.ok_or("STEPS > 0 のため初期 loss は必ず記録される")?;
    println!("initial loss: {initial_loss}");
    println!("final loss: {final_loss}");
    let loss_decreased = final_loss < initial_loss;
    println!("loss decreased: {loss_decreased}");

    if !final_loss.is_finite() {
        return Err(format!("final loss が有限値ではない: {final_loss}").into());
    }
    if !loss_decreased {
        return Err(format!(
            "loss が減少しなかった（退行の可能性）: initial={initial_loss}, final={final_loss}"
        )
        .into());
    }

    Ok(())
}
```

実行: `cargo run -p fandhe-ai --example training_loop`

## Notes

- **workspace 内部専用の例**: 乱数生成に内部クレート `bench_harness::rng::Xorshift64Star` を直接 import している（`crates/facade/examples/training_loop.rs` の verbatim。`bench-harness` は未公開 crate で facade の dev-dependency）。`fandhe-ai` だけを依存に追加した外部プロジェクトではこの行はコンパイルできないため、`rand` 等の任意の固定シード RNG に置き換える。学習ループ本体（モデル構築・forward・backward・パラメータ更新）は公開 API のみで構成されている
- `fandhe_ai_autodiff::optim::{Sgd, AdamW}` は `facade` の公開面に含まれない内部 API のため、この例は `compat::Sequential` と `Tape` / `Var` / `Tensor` の公開 API で `param - lr * grad` を自前計算する手動 SGD
- `Sequential::bind` が返す `SequentialVars` は `&model` / `&tape` を借用するため、`apply_parameters`（`&mut model`）を呼ぶ前に必ずスコープを抜けて借用を解放する
- 重み初期化・データ生成はいずれも固定シードで駆動し再現可能にする
