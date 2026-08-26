---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/main/crates/facade/examples/getting_started.rs
---

# Getting Started

`fandhe_ai::compat` の `array` と `Sequential` だけで最小のニューラルネットワーク推論を行う。

```rust
use fandhe_ai::compat::{Sequential, array};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // numpy `np.array` 慣習でテンソルを組み立てる（2 行 4 列のバッチ入力）。
    let input = array(vec![
        vec![0.1_f32, 0.2, 0.3, 0.4],
        vec![0.5_f32, 0.6, 0.7, 0.8],
    ])?;

    // Keras `Sequential` 慣習でレイヤーを積み上げる（対象は Linear・
    // ReLU/Sigmoid/Tanh の 4 種限定）。
    let model = Sequential::new()
        .add_linear(4, 8, /* seed = */ 42)?
        .add_relu()
        .add_linear(8, 2, /* seed = */ 43)?;

    // 推論の入口。内部で `fandhe_ai::tape()`（既定 CPU・`CpuBackendOps`・
    // 融合有効）を構築し forward するだけの 1 ステップ呼び出し。
    let output = model.predict(&input)?;

    println!("output shape: {:?}", output.shape());
    Ok(())
}
```

実行: `cargo run -p fandhe-ai --example getting_started`

## Notes

- サポート対象の公開 API 面は `fandhe-ai` crate（facade）全体。`fandhe_ai::compat`（`array` / `Sequential`）はその簡易入口の一つで、`tape()` / `tape_for()` / `Tape` / `Var` / `Tensor` も同じ公開面に含まれる。内部クレート（tensor-core / autodiff / backend-*）の直接利用は非サポート
- `Sequential::add_linear` は `in_features == 0` を拒否するため `Result` を返す（`?` で連鎖する）
- `Sequential::predict` は内部で `fandhe_ai::tape()` を構築して forward するだけの薄い入口
- 本番コードでは `unwrap()` / `expect()` を避け、`main` は `Result` を返し `?` で伝播する
