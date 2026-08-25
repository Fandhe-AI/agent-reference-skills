---
source: https://docs.rs/fandhe-ai/0.3.0/fandhe_ai/compat/fn.array.html
---

# compat::array

NumPy の `np.array` 慣習に従ってテンソルを構築する関数。ネストされた `Vec`/配列から形状を自動推論し、`Tensor::new` に委譲する薄い互換レイヤー。

## Signature / Usage

```rust
pub fn array<A: ArrayData>(data: A) -> Result<Tensor<f32>, AutodiffError>
```

```rust
use fandhe_ai::compat::array;

// 1-D
let v = array(vec![1.0_f32, 2.0, 3.0])?;
println!("1-D shape: {:?}", v.shape()); // [3]

// 2-D
let m = array(vec![vec![1.0_f32, 2.0], vec![3.0_f32, 4.0]])?;
println!("2-D shape: {:?}", m.shape()); // [2, 2]
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `data` | `A: ArrayData` | 1-D（`Vec<f32>`, `&[f32]`, `[f32; N]`）または 2-D（`Vec<Vec<f32>>`, `[[f32; N]; M]`）の入力。ネスト構造から形状を推論する |
| `ArrayData` | トレイト | `array()` が受け付ける入力を表す変換トレイト。numpy のネストしたリスト/配列から形状を推論する挙動をエミュレートする |

## Notes

- 行不揃いの 2-D 入力（jagged array）は計算前に検証され拒否される
- ニューラルネットのバッチ入力生成にも使われる（例: `array(vec![vec![0.1, 0.2, 0.3, 0.4], vec![0.5, 0.6, 0.7, 0.8]])`）

## Related

- `Tensor`
- compat::Sequential
