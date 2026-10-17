---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/nn/trait.Module.html
---

# nn::Module / TapeRef / nn::summary

facade 利用者が `Var` 演算を組み合わせた独自層を定義するための trait `nn::Module`（required は `forward` の 1 件、defaulted は 14 件）と、`forward` の第 1 引数に取る借用ハンドル `TapeRef`、層構造を文字列化する `nn::summary`。

## Signature / Usage

```rust
use fandhe_ai::nn::Module;
use fandhe_ai::{AutodiffError, ShapeError, TapeRef, Tensor, Var};

struct Scale {
    a: Tensor<f32>,
}

impl Module for Scale {
    fn forward<'t>(&self, tape: TapeRef<'t>, input: &Var<'t>) -> Result<Var<'t>, AutodiffError> {
        let a = tape.var(&self.a);
        input.mul(&a)
    }
    fn named_parameters(&self) -> Vec<(String, &Tensor<f32>)> {
        vec![("a".into(), &self.a)]
    }
    fn set_parameter(&mut self, name: &str, value: Tensor<f32>) -> Result<(), AutodiffError> {
        if name != "a" {
            return Err(AutodiffError::InvalidArgument(format!("unknown {name}")));
        }
        if value.shape() != self.a.shape() {
            return Err(AutodiffError::Shape(ShapeError::ShapeMismatch {
                lhs: value.shape().to_vec(),
                rhs: self.a.shape().to_vec(),
            }));
        }
        self.a = value;
        Ok(())
    }
}

// TapeRef は &Tape から作る
let tape = fandhe_ai::tape();
let tref = TapeRef::from(&tape);
```

## Options / Props

`nn::Module` のメソッド（required は `forward` のみ。以下はすべて原本の doc comment に基づく）:

| Name | Signature | Description |
| --- | --- | --- |
| `forward` | `fn forward<'t>(&self, tape: TapeRef<'t>, input: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | required。このステップの `tape` 上で 1 回分の forward を計算する。パラメータは `tape.var(&tensor)` で葉ノード登録してから使う |
| `named_parameters` | `fn named_parameters(&self) -> Vec<(String, &Tensor<f32>)>` | 学習可能パラメータの「名前, 参照」列（登録順、weight → bias）。既定は空 |
| `set_parameter` | `fn set_parameter(&mut self, name: &str, _value: Tensor<f32>) -> Result<(), AutodiffError>` | `named_parameters` が返す名前のパラメータを書き戻す（shape 保存置換のみ）。既定は常に `Err`。`named_parameters` を override する層は本メソッドも対で override する |
| `state_dict` | `fn state_dict(&self) -> HashMap<String, Tensor<f32>>` | `named_parameters` のキー付きビュー（各値は `clone`）。順序契約なし |
| `load_state_dict` | `fn load_state_dict(&mut self, state: HashMap<String, Tensor<f32>>) -> Result<(), AutodiffError>` | `state_dict` の逆（strict）。パス 1 でキー集合・shape の完全一致を検証、パス 2 でキー昇順に `set_parameter`。失敗時は逆順ロールバック（完全な原子性は保証しない） |
| `set_training` | `fn set_training(&mut self, _training: bool)` | 学習／評価モード切替。既定は no-op |
| `training` | `fn training(&self) -> bool` | 現在のモード。既定は `true` |
| `set_requires_grad` | `fn set_requires_grad(&mut self, _requires_grad: bool) -> Result<(), AutodiffError>` | 層単位の凍結（PyTorch `module.requires_grad_(bool)` 相当）。既定は fail-closed: パラメータ 0 件なら `Ok(())`、1 件以上なら `InvalidArgument` |
| `freeze` | `fn freeze(&mut self) -> Result<(), AutodiffError>` | `set_requires_grad(false)` の別名 |
| `requires_grad` | `fn requires_grad(&self) -> bool` | 現在追跡対象か。既定は `true`。`set_requires_grad` と対で override する |
| `children` | `fn children(&self) -> Vec<(String, &dyn Module)>` | 直接の子 `Module` の「名前, 参照」列（登録順）。名前は `named_parameters` の接頭辞と一致させる。既定は空 |
| `children_mut` | `fn children_mut(&mut self) -> Vec<(String, &mut dyn Module)>` | `children` の可変版（同じ順・同じ名前）。凍結失敗時の葉単位ロールバック用。子を持つ複合層は `children` と対で実装する。既定は空 |
| `named_modules` | `fn named_modules(&self) -> Vec<(String, &dyn Module)>` | 子孫を深さ優先・登録順で列挙。ルート自身は含めない。パスは `"{parent}.{child}"`。循環は打ち切り、ZST を除く共有子は最初の経路のみ |
| `parameter_count` | `fn parameter_count(&self) -> usize` | 学習可能パラメータの総要素数（`saturating_add`） |
| `type_name` | `fn type_name(&self) -> &'static str` | `std::any::type_name::<Self>()`。表示用途に限る |

`TapeRef<'t>`（`#[derive(Clone, Copy)]`）:

| Name | Signature | Description |
| --- | --- | --- |
| `var` | `fn var(&self, tensor: &Tensor<f32>) -> Var<'t>` | `Tape::var` と同じ（葉ノード登録） |
| `var_from` | `fn var_from<T: CastElement>(&self, tensor: &Tensor<T>) -> Result<Var<'t>, AutodiffError>` | `Tape::var_from` と同じ（dtype 変換つき葉ノード登録） |
| `var_no_grad` | `fn var_no_grad(&self, tensor: &Tensor<f32>) -> Var<'t>` | `Tape::var_no_grad` と同じ（`requires_grad == false` の葉ノード登録） |
| `From<&'t Tape>` | `TapeRef::from(&tape)` | crate 外の唯一の構築入口 |

`nn::summary`:

| Name | Signature | Description |
| --- | --- | --- |
| `summary` | `pub fn summary(module: &dyn Module) -> String` | PyTorch `print(model)` 相当の構造文字列。子を持つノードは `"{Type}(\n"` … `"{indent}) [params: N]\n"`、葉は `"{indent}({name}): {Type} [params: N]\n"`。末尾に `Submodules: {n}` と `Total parameters: {n}` を付ける。shape 推定・`extra_repr` は対象外 |

## Notes

- `set_parameter` は shape 保存置換のみを受け付ける（`Module::set_parameter` の doc comment の契約。`EmbeddingBag` の実装も同じ）。shape の異なるテンソルを渡すと `AutodiffError::Shape(ShapeError::ShapeMismatch { lhs, rhs })` で拒否される。Signature 例の shape 検査はこの契約に合わせたもの
- open trait（sealed ではない）で `dyn Module` が成り立つ。後方互換規則: defaulted メソッドの追加は非破壊、required メソッドの追加は破壊的変更
- 生の `Tape`・`BackendOps`・内部層型（`as_*`・`forward_host`・`is_pooling` 等）は載せない。`TapeRef` の公開メソッドは `var` / `var_from` / `var_no_grad` の 3 件のみで `backward` 等は委譲しない
- 凍結を実装する層は `requires_grad: bool` を自層に保持し、`forward` 内で `if self.requires_grad { tape.var(&p) } else { tape.var_no_grad(&p) }` のように切り替える。反映は次の `forward` から。`set_training` とは独立の軸（BatchNorm 系の統計は凍結後も training のまま更新される）
- `children` と `children_mut` は `set_requires_grad` の間、同じ子を返し続けること。契約違反の検出範囲（件数・名前・型・アドレス・サイズ）は原本 `children_mut` の doc の (a)〜(d) を参照
- `summary` の型名は `std::any::type_name` 由来で安定が保証されない。表示用途に限る
- facade `nn::Module` は autodiff 側 `Module` とは別 trait（`forward` の第 1 引数が `TapeRef`）。組み込み層（`Linear` 等）は `nn::` 直下からは到達できず、`compat::Sequential::add_*` 経由で使う。独自層は `compat::Sequential::add_module` で積める
- `compat::Sequential`（Keras 風ビルダー）と `nn::Sequential`（本 trait の実装コンテナ）は別物。`containers.md` を参照

## Related

- [containers.md](./containers.md)
- [forward-hooks.md](./forward-hooks.md)
- [compat-sequential.md](../api/compat-sequential.md)
- [tape.md](../api/tape.md)
