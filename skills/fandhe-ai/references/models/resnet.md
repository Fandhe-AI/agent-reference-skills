---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/models/struct.ResNet.html
---

# ResNet / ResNetBlock

CIFAR 版 ResNet（`depth = 6n + 2`・BasicBlock・option B shortcut）。residual 加算があるため `compat::Sequential` 単体では表現できず、複数の `Sequential`（stem / blocks / head）を持つラッパーとして構成される。`ResNetBlock` は `ResNet::blocks` から観察するだけの型で、公開コンストラクタを持たない。

## Signature / Usage

`ResNet` の推論（BatchNorm を汚さないよう eval にする）:

```rust
use fandhe_ai::models::ResNet;
use fandhe_ai::Tensor;

// ResNet（depth=8 は 6n+2 の最小構成）。BatchNorm を汚さないよう eval にして推論する。
let mut resnet = ResNet::new(8, 2, 10, 0).unwrap();
resnet.set_training(false);
assert!(!resnet.training());
assert_eq!(resnet.num_blocks(), 3);
assert!(!resnet.blocks()[0].has_projection_shortcut());
let x = Tensor::<f32>::new(vec![0.1; 3 * 8 * 8], &[1, 3, 8, 8]).unwrap();
assert_eq!(resnet.predict(&x).unwrap().shape(), &[1, 10]);
```

```rust
impl ResNet {
    pub fn new(depth: usize, width: usize, num_classes: usize, seed: u64) -> Result<Self, AutodiffError>;
    pub fn forward<'t>(&self, tape: &'t Tape, x: &Var<'t>) -> Result<Var<'t>, AutodiffError>;
    pub fn predict(&self, x: &Tensor<f32>) -> Result<Tensor<f32>, AutodiffError>;
    pub fn named_parameters(&self) -> Vec<(String, &Tensor<f32>)>;
    pub fn set_training(&mut self, training: bool);
    pub fn training(&self) -> bool;
    pub fn train_step(&mut self, x: &Tensor<f32>, y: &Tensor<i32>, opt: &mut Adam)
        -> Result<f32, AutodiffError>;
    pub fn depth(&self) -> usize;
    pub fn width(&self) -> usize;
    pub fn num_classes(&self) -> usize;
    pub fn num_blocks(&self) -> usize;
    pub fn blocks(&self) -> &[ResNetBlock];
}

impl ResNetBlock {
    pub fn has_projection_shortcut(&self) -> bool;
}
```

## Options / Props

| 項目 | 内容 |
|------|------|
| `depth` | `6n + 2`（`n >= 1`。8, 14, 20, ...） |
| `width` | stage1 の出力チャネル数。stage2 / 3 はそれぞれ `2 * width` / `4 * width` |
| `num_classes` | 分類クラス数 |
| `seed` | 各層の初期化基準値（層ごとに `wrapping_add` でずらす） |
| `train_step(x, y, opt)` | tape 構築 → forward → cross entropy → backward → `Adam` 適用 → パラメータ書き戻しを 1 回行い、損失値を返す。冒頭で train モードへ切り替える。`x` は `[N, 3, H, W]`、`y` は `[N]` のクラス index（`0..num_classes`） |
| `named_parameters` | 階層名付き（`stem.`・`layer.{i}.main.` / `layer.{i}.shortcut.`・`head.` 接頭辞。`i` は全 block を通した 0 起点連番） |

## Notes

- 構成（He et al. 2016 §4.2。CIFAR 版 `6n+2`）: stem = `Conv2d(3, w, 3, pad=1)` → BN → ReLU、stage1 = BasicBlock(w → w) x n、stage2 = BasicBlock(w → 2w, stride 2) + BasicBlock(2w → 2w) x (n-1)、stage3 = BasicBlock(2w → 4w, stride 2) + BasicBlock(4w → 4w) x (n-1)、head = AdaptiveAvgPool2d(1, 1) → Flatten → `Linear(4w, num_classes)`
- ブロックの main 経路は `conv3x3(stride) → BN → ReLU → conv3x3 → BN`、shortcut は stride が 1 でない、またはチャネル数が変わるときだけ `conv1x1(stride) → BN`（option B。それ以外は identity）。出力は `relu(main + shortcut)`
- `ResNet::new` は `width` / `num_classes` が 0、`depth` が `6n+2`（`n >= 1`）でない、またはチャネル数の乗算が `usize` を超える場合に `AutodiffError::InvalidArgument` を返す
- 構築直後は train モード。推論前に `set_training(false)` を呼ぶこと（呼ばないと BatchNorm の running stats が更新される）。`predict` はモードを切り替えない
- 入力は `[N, 3, H, W]` のみ。それ以外の shape は `forward` / `train_step` が `AutodiffError::InvalidArgument` を返す
- 保存・読み込み経路を持たず（`compat::save_model` / `load_model` の対象外）、`nn::Module` も実装しない
- `train_step` が使う損失（mean cross-entropy）などのヘルパー（`train_support`）は非公開で、公開面に出るのはここに挙げたメソッドだけ。`Reduction` は再エクスポートされていないため、損失は `Var::gather` で正解クラスの log-probability を選ぶ方式で計算される
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/models/struct.ResNet.html （0.14.0, 取得日 2026-11-14。シグネチャは `src/models/resnet.rs` / `train_support.rs` を一次ソースとして確認）

## Related

- [mlp-lenet.md](./mlp-lenet.md)
- [transformer-classifier.md](./transformer-classifier.md)
