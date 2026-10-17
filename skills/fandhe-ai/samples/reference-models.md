---
source: https://docs.rs/crate/fandhe-ai/0.11.0/source/examples/reference_models.rs
---

# Reference Models (MLP / LeNet)

参照モデル `Mlp` を `compat::Sequential` の上で構築し、predict と PyTorch 対応表を表示する example の MLP 部分。

```rust
mod models;

use fandhe_ai::compat::Sequential;
use models::mlp::Mlp;

fn print_param_map(
    title: &str,
    rows: impl Iterator<Item = (String, String, Vec<usize>, Vec<usize>, bool)>,
) {
    println!("\n== {title} ==");
    println!(
        "{:<12} {:<16} {:<18} {:<18} transpose",
        "fandhe", "pytorch", "fandhe_shape", "pytorch_shape"
    );
    for (fandhe_key, pytorch_key, fandhe_shape, pytorch_shape, transpose) in rows {
        println!(
            "{fandhe_key:<12} {pytorch_key:<16} {fandhe_shape:<18?} {pytorch_shape:<18?} {transpose}"
        );
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 4 引数コンストラクタ（既定シード）。
    let mlp = Mlp::new(784, &[256, 128], 10, 0.2)?;
    println!(
        "Mlp: input_dim=784 hidden_dims=[256, 128] output_dim=10 dropout={}",
        mlp.dropout()
    );

    // `Mlp::with_seed` は明示シード版（再現したい場合に使う）。
    let mlp_seeded = Mlp::with_seed(784, &[256, 128], 10, 0.2, 12345)?;

    fandhe_ai::manual_seed(0);
    let x = fandhe_ai::rand(&[4, 784])?;
    let mut eval_mlp = mlp_seeded;
    eval_mlp.sequential_mut().eval();
    let y = eval_mlp.predict(&x)?;
    println!("Mlp::predict 出力 shape: {:?}", y.shape());

    let tape = fandhe_ai::tape();
    let xv = tape.var(&x);
    let via_forward = eval_mlp.forward(&tape, &xv)?;
    println!(
        "Mlp::forward 出力 shape: {:?}",
        via_forward.to_tensor().shape()
    );

    let seq: &Sequential = eval_mlp.sequential();
    println!(
        "Mlp 内部 Sequential::training() (eval 後): {}",
        seq.training()
    );

    print_param_map(
        "Mlp <-> PyTorch nn.Sequential(Linear, ReLU, Dropout, ...)",
        eval_mlp.pytorch_param_map()?.into_iter().map(|m| {
            (
                m.fandhe_key,
                m.pytorch_key,
                m.fandhe_shape,
                m.pytorch_shape,
                m.transpose,
            )
        }),
    );
    Ok(())
}
```

実行（リポジトリ内）: `cargo run -p fandhe-ai --example reference_models`（原本は `run_mlp` と `run_lenet` を `main` から順に呼ぶ）

## Notes

- 上のコードは原本 `examples/reference_models.rs`（136 行）の `run_mlp`（L39-L87）を `main` に置き、`print_param_map`（L23-L37）と合わせて省略なしで転記したもの。LeNet 側の `run_lenet`（L89-L130）と `use models::lenet::LeNet` は省いた。`examples/models/` の `mlp.rs`（と `mod.rs`）が必要で、単体ファイルとしてはコンパイルできない。`models/` には他に `lenet.rs` / `resnet.rs` / `transformer.rs` / `reference_module.rs` / `synthetic_cifar.rs` がある（`reference-models-training.md` を参照）
- `Mlp` / `LeNet` は `fandhe_ai::` が公開する型ではなく、`compat::Sequential::add_*` を組み合わせた example 同梱の利用者コード（`mlp.rs` 冒頭 doc）。facade は層（`Linear` / `ReLU` / `Dropout`）を直接公開しないため `Sequential` を内部に持つラッパーとして構成している
- 重みレイアウト: fandhe の `Linear.weight` は `[in_features, out_features]`、PyTorch の `nn.Linear.weight` は `[out_features, in_features]` で転置の関係。bias は転置不要（`mlp.rs` 冒頭 doc）
- `eval()` に切り替えると Dropout が無効になる。`Mlp::forward`（外部 `Tape` 上の経路）は eval モードで `predict` と同じ出力を返す契約（原本コメント）
- 原本 example の転記のみで、上流では `cargo run --example` で実行される
