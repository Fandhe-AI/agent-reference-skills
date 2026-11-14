---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.14.0/crates/facade/examples/reference_models.rs
---

# Reference Models (MLP / LeNet)

`fandhe_ai::models::Mlp` を構築し、predict・forward と PyTorch 対応表を表示する example の MLP 部分。

```rust
mod models;

use fandhe_ai::compat::Sequential;
use fandhe_ai::models::{LeNet, Mlp};

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

fn run_mlp() -> Result<(), Box<dyn std::error::Error>> {
    // AC1 の 4 引数コンストラクタ（既定シード）。
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

    // `Mlp::forward`（外部 `Tape` 上の経路）が `predict` と同じ出力を
    // 返すことも示す（eval モードでは bit 完全一致契約。統合テスト
    // `example_mlp_mnist.rs` で厳密に検証する）。
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
        models::mlp::mlp_pytorch_param_map(&eval_mlp, 784, &[256, 128], 10)?
            .into_iter()
            .map(|m| {
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

- 上のコードは原本 `examples/reference_models.rs`（137 行）の L15-L86（`mod models;`・import・`print_param_map`・`run_mlp`）を省略なしで転記したもの。LeNet 側の `run_lenet`（L88-L131）と `main`（L133-L137）は省いた（`LeNet` の import は原本のまま残るため、このままでは未使用 import の警告が出る）。`mod models;` は `examples/models/` の `mlp.rs`・`mod.rs` を取り込むため、単体ファイルとしてはコンパイルできない
- `Mlp` / `LeNet` は 0.14.0 では `fandhe_ai::models` が公開する型（`fandhe_ai::models::{LeNet, Mlp}`）。`examples/models/mlp.rs` に残るのは PyTorch 対応表 `mlp_pytorch_param_map` だけで、対応表は facade の公開面に含まれない（`models/` カテゴリの `mlp-lenet.md` を参照）
- 重みレイアウト: fandhe の `Linear.weight` は `[in_features, out_features]`、PyTorch の `nn.Linear.weight` は `[out_features, in_features]` で転置の関係。bias は転置不要
- `eval()` に切り替えると Dropout が無効になる。`Mlp::forward`（外部 `Tape` 上の経路）は eval モードで `predict` と同じ出力を返す契約（原本コメント）
- 0.11.0 では `Mlp` / `LeNet` が example 同梱の利用者コード（`examples/models/mlp.rs`）で、`pytorch_param_map()` はそのメソッドだった。0.14.0 で公開型へ移り、対応表は関数 `mlp_pytorch_param_map(&mlp, input_dim, hidden_dims, output_dim)` になった
- Source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.14.0/crates/facade/examples/reference_models.rs（0.14.0, 取得日 2026-11-14）
