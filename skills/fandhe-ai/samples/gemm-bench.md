# GEMM Bench

`Var::matmul`（GEMM）の実行時間を `std::time::Instant` で簡易計測し、GFLOP/s を算出する。

```rust
use fandhe_ai::Tensor;
use std::time::Instant;

const N: usize = 256;

fn build_matmul_inputs() -> Result<(Tensor<f32>, Tensor<f32>), Box<dyn std::error::Error>> {
    let a = Tensor::new(vec![0.01_f32; N * N], &[N, N])?;
    let b = Tensor::new(vec![0.02_f32; N * N], &[N, N])?;
    Ok((a, b))
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let (a_data, b_data) = build_matmul_inputs()?;

    // ウォームアップ 1 回（アロケータ・キャッシュの初回コストを計測対象
    // から除く）。
    {
        let tape = fandhe_ai::tape();
        let a = tape.var(&a_data);
        let b = tape.var(&b_data);
        let _ = a.matmul(&b)?;
    }

    let mut durations = Vec::with_capacity(5);
    for _ in 0..5 {
        // 計測ごとに新しい Tape を構築する（前回計測の計算グラフを
        // 引き継いで累積させないため）。
        let tape = fandhe_ai::tape();
        let a = tape.var(&a_data);
        let b = tape.var(&b_data);

        let start = Instant::now();
        let _ = a.matmul(&b)?;
        durations.push(start.elapsed());
    }

    durations.sort();
    let median = durations[durations.len() / 2];

    let flops = 2.0 * (N as f64).powi(3);
    let gflops = flops / median.as_secs_f64() / 1e9;

    println!("N={N} median={median:?} GFLOP/s={gflops:.3}");
    println!(
        "本格計測（性能下限判定・回帰検出）は criterion ベースの bench-harness の領分です \
         (docs/performance-targets.md)。"
    );

    Ok(())
}
```

実行: `cargo run --release -p fandhe-ai --example gemm_bench`（`--release` 必須。debug ビルドは最適化なしの実行速度を測るだけで GEMM 性能デモとしては無意味）

## Notes

- 計測規約はウォームアップ 1 回の後 5 回計測し中央値を採用する
- 本例は `std::time::Instant` による簡易計測のデモであり、性能下限判定・回帰検出を目的とした本格計測は `criterion` を使う `bench-harness` クレートの領分
- CUDA / Metal 上での GEMM カーネル自体の最適化手法・チューニングは `nvidia-cuda` / `apple-silicon` スキルの領分。本サンプルは `Device` 抽象を通じた利用側の計測コードのみを扱う
