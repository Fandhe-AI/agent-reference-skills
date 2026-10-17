---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/nn/struct.Sequential.html
---

# nn::Sequential / ModuleList / ModuleDict

facade の `nn::Module` 実装を保持するコンテナ 3 種。`ModuleList`（forward を持たない保持器）、`Sequential`（層順に適用）、`ModuleDict`（キー付き保持器）。

## Signature / Usage

```rust
use fandhe_ai::nn::{summary, Module, ModuleDict, ModuleList, Sequential};

// 利用者定義の Module `Scale` を層順に適用する
let seq = Sequential::new().add(Scale::new()).add(Scale::new());
let tape = fandhe_ai::tape();
// let y = seq.forward(fandhe_ai::TapeRef::from(&tape), &x)?;

let mut list = ModuleList::new();
list.push(Box::new(Scale::new()));

let mut dict = ModuleDict::new();
dict.insert("scale", Box::new(Scale::new()))?;

println!("{}", summary(&seq));
```

## Options / Props

`ModuleList`:

| Name | Signature | Description |
| --- | --- | --- |
| `new` | `pub fn new() -> Self` | 空の `ModuleList`（`Default` も実装） |
| `push` | `pub fn push(&mut self, module: Box<dyn Module>)` | 末尾へ追加（子のモードは同期しない） |
| `len` / `is_empty` | `pub fn len(&self) -> usize` / `pub fn is_empty(&self) -> bool` | 子の数 / 空か |
| `get` | `pub fn get(&self, index: usize) -> Option<&dyn Module>` | 範囲外は `None`（panic しない） |
| `get_mut` | `pub fn get_mut(&mut self, index: usize) -> Option<&mut (dyn Module + 'static)>` | `get` の可変版 |
| `iter` / `iter_mut` | `pub fn iter(&self) -> impl Iterator<Item = &Box<dyn Module>>` | 層順の走査 |
| `FromIterator` | `impl FromIterator<Box<dyn Module>> for ModuleList` | イテレータから構築 |

`Sequential`:

| Name | Signature | Description |
| --- | --- | --- |
| `new` | `pub fn new() -> Self` | 空の `Sequential`（空は恒等写像。`Default` も実装） |
| `push` | `pub fn push(&mut self, module: Box<dyn Module>)` | 末尾へ追加（子のモードは同期しない） |
| `add` | `pub fn add<M: Module + 'static>(mut self, module: M) -> Self` | 所有権消費のビルダー形式の追加 |
| `len` / `is_empty` | `pub fn len(&self) -> usize` / `pub fn is_empty(&self) -> bool` | 層数 / 空か |
| `layers` | `pub fn layers(&self) -> &[Box<dyn Module>]` | 層列のスライス参照 |
| `layers_mut` | `pub fn layers_mut(&mut self) -> &mut [Box<dyn Module>]` | `layers` の可変版 |
| `From<ModuleList>` | `impl From<ModuleList> for Sequential` | `ModuleList` から変換 |

`ModuleDict`:

| Name | Signature | Description |
| --- | --- | --- |
| `new` | `pub fn new() -> Self` | 空の `ModuleDict`（`Default` も実装） |
| `from_pairs` | `pub fn from_pairs(pairs: Vec<(String, Box<dyn Module>)>) -> Result<Self, AutodiffError>` | `(key, module)` 列から構築（挿入順を保持）。不正キーは `Err` |
| `insert` | `pub fn insert(&mut self, key: impl Into<String>, module: Box<dyn Module>) -> Result<Option<Box<dyn Module>>, AutodiffError>` | 同名キーは置換して旧値を返す（位置は保つ）。空キー・`'.'` 含みは `Err` |
| `remove` | `pub fn remove(&mut self, key: &str) -> Option<Box<dyn Module>>` | 削除して返す |
| `get` / `get_mut` | `pub fn get(&self, key: &str) -> Option<&dyn Module>` | キーで参照 |
| `contains_key` | `pub fn contains_key(&self, key: &str) -> bool` | キーの有無 |
| `keys` | `pub fn keys(&self) -> impl Iterator<Item = &str>` | キー列（挿入順） |
| `iter` / `iter_mut` | `pub fn iter(&self) -> impl Iterator<Item = (&str, &dyn Module)>` | `(key, module)` の走査（挿入順） |
| `len` / `is_empty` | `pub fn len(&self) -> usize` / `pub fn is_empty(&self) -> bool` | 子の数 / 空か |

## Notes

- `ModuleList` / `ModuleDict` の `forward` は常に `AutodiffError::InvalidArgument`（保持器であり callable ではない）。`Sequential::forward` は子を層順に適用する。Linear → ReLU 融合は行わない（子が不透明な facade `Module` のため）
- パラメータ名は `ModuleList` / `Sequential` が `"{index}.{name}"`、`ModuleDict` が `"{key}.{name}"`。`set_parameter` は区切りなし・index 非数値・範囲外・未知キーをすべて `InvalidArgument`（fail-closed、panic しない）
- `set_training` は全子へ伝播する。`set_requires_grad` は全子へ伝播し、失敗時は適用済みの子と失敗した子を逆順に呼び出し前の値へ戻す（復元失敗は集約して `Err` に含める）。`requires_grad` はパラメータを持つ子のどれかが `true` なら `true`（該当する子がなければ `true`）
- `ModuleDict` は列挙順が「登録順」契約のため内部は `Vec<(String, Box<dyn Module>)>`（検索は O(n)）
- `nn::Sequential` と `compat::Sequential`（Keras 風の `add_linear` / `add_relu` 等のビルダー）は別の型。本ページの `Sequential` は `nn::Module` 実装を `add` / `push` で積むコンテナで、`add_linear` 等は持たない。`compat::Sequential` 側は `compat-sequential.md` を参照
- `Linear` や活性化などの組み込み層は `nn::` 直下からは到達できない（`compat::Sequential::add_*` 経由）

## Related

- [module.md](./module.md)
- [forward-hooks.md](./forward-hooks.md)
- [compat-sequential.md](../api/compat-sequential.md)
