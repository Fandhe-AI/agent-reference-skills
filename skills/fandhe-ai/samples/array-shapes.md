---
source: https://raw.githubusercontent.com/Fandhe-AI/rust-ai-library/main/crates/facade/examples/array_shapes.rs
---

# Array Shapes

`fandhe_ai::compat::array` に 1 次元・2 次元の `Vec` を渡し、それぞれの shape を確認する。

```rust
use fandhe_ai::compat::array;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 1-D: `Vec<f32>` → shape [n]
    let v = array(vec![1.0_f32, 2.0, 3.0])?;
    println!("1-D shape: {:?}", v.shape());

    // 2-D: `Vec<Vec<f32>>` → 行優先で平坦化し shape [rows, cols]
    let m = array(vec![vec![1.0_f32, 2.0], vec![3.0_f32, 4.0]])?;
    println!("2-D shape: {:?}", m.shape());

    Ok(())
}
```

実行: `cargo run -p fandhe-ai --example array_shapes`

## Notes

- `compat::array` は numpy `np.array` 慣習でテンソルを組み立てる薄いラッパーで、shape 検査は `fandhe_ai_tensor_core::Tensor::new` へ委譲される
- 2-D 入力（`Vec<Vec<f32>>`）は行優先（row-major）で平坦化される
