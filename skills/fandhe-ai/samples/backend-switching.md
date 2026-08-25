---
source: https://raw.githubusercontent.com/Fandhe-AI/rust-ai-library/main/crates/facade/examples/backend_switching.rs
---

# Backend Switching

`fandhe_ai::tape_for(Device)` でバックエンドを明示指定し、失敗時は CPU にフォールバックする。

```rust
use fandhe_ai::{Device, tape_for};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let tape = match tape_for(Device::Cuda(0)) {
        Ok(tape) => {
            println!("connected to Device::Cuda(0)");
            tape
        }
        Err(err) => {
            // driver 不在・範囲外 ordinal 等は fail-fast で `BackendError`
            // が返る（`panic!`/`unwrap()` しない）。ここでは CPU へ
            // フォールバックして example の実行を継続する。
            println!("Device::Cuda(0) unavailable ({err}); falling back to Device::Cpu");
            tape_for(Device::Cpu)?
        }
    };

    let input = tape.var(&fandhe_ai::Tensor::new(
        vec![1.0_f32, 2.0, 3.0, 4.0],
        &[1, 4],
    )?);
    let loss = input.sum(None)?;
    let grads = tape.backward(&loss)?;
    let input_grad = grads
        .get(&input)?
        .ok_or("input has no gradient after backward")?;

    println!("input grad shape: {:?}", input_grad.shape());
    Ok(())
}
```

実行: `cargo run -p fandhe-ai --example backend_switching`

## Notes

- バックエンド切替は feature フラグなしの cfg ベース。`Device::Cuda(_)` / `Device::Metal` は実行時にドライバ・デバイスの存在検証を行い、不在なら `BackendError` を返す fail-fast 設計
- `fandhe_ai::tape_for` 自体は自動デバイス選択を行わない（利用側が失敗時のフォールバック方針を決める）
- CUDA / Metal のカーネル実装・最適化そのものは `nvidia-cuda` / `apple-silicon` スキルの領分。本スキルは `Device` 抽象を通じた選択・フォールバックの利用側コードのみを扱う
