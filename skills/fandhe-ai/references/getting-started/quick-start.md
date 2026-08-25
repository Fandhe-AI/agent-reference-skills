# クイックスタート

`compat::array`（numpy `np.array` 慣習のテンソル生成）と `compat::Sequential`（Keras `Sequential` 慣習のレイヤー積み上げ）を使うと、数行でモデルを組み立てて推論できる。

## Signature / Usage

```rust
use fandhe_ai::compat::{Sequential, array};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let input = array(vec![
        vec![0.1_f32, 0.2, 0.3, 0.4],
        vec![0.5_f32, 0.6, 0.7, 0.8],
    ])?;

    let model = Sequential::new()
        .add_linear(4, 8, /* seed = */ 42)?
        .add_relu()
        .add_linear(8, 2, /* seed = */ 43)?;

    let output = model.predict(&input)?;

    println!("output shape: {:?}", output.shape());
    Ok(())
}
```

## Notes

- `add_linear(in_features, out_features, seed)` の `seed` は決定的な重み初期化のために指定する
- CPU/CUDA/Metal のデバイス選択や `tape_for(Device)` によるバックエンド切替は guides カテゴリを参照

## Related

- [overview.md](./overview.md)
- [installation.md](./installation.md)
- [crate-layout.md](./crate-layout.md)
