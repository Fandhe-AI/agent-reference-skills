# pre-styled-ui slot recipe API

`fandhe-frontend-pre-styled-ui` に実装された slot recipe 相当の variant API。複数 anatomy パーツ（slot）を横断する variant（size / variant / colorPalette 相当）を型安全な Rust API（enum ベース）で定義し、クラス名と静的 CSS を決定的に生成する。

## Signature / Usage

```rust
pub struct Declaration { /* property, value: &'static str */ }
pub const fn decl(property: &'static str, value: &'static str) -> Declaration;

pub trait VariantValue: Copy {
    fn axis(self) -> &'static str;
    fn value(self) -> &'static str;
}

pub enum Size { Sm, Md, Lg }
pub enum ColorPalette { Accent, Info, Success, Warning, Danger }
pub fn palette_declarations(p: ColorPalette) -> Vec<Declaration>;

pub struct SlotRecipe { /* ... */ }
impl SlotRecipe {
    pub const fn new(scope: &'static str, slots: &'static [&'static str]) -> Self;
    pub fn base(self, slot: &'static str, declarations: Vec<Declaration>) -> Self;
    pub fn variant<V: VariantValue>(self, v: V, slot: &'static str, declarations: Vec<Declaration>) -> Self;
    pub fn default_variant<V: VariantValue>(self, v: V) -> Self;
    pub fn compound_variant(self, conditions: Vec<VariantCondition>, slot: &'static str, declarations: Vec<Declaration>) -> Self;
    pub fn css(&self) -> String;
    pub fn variant_class<V: VariantValue>(&self, v: V) -> String;
    pub fn variant_classes(&self, selection: &[(&str, &str)]) -> String;
}

pub struct VariantCondition { /* axis, value: &'static str */ }
pub fn when<V: VariantValue>(v: V) -> VariantCondition;
```

```rust
recipe.compound_variant(
    vec![when(Size::Sm), when(ColorPalette::Accent)],
    "trigger",
    vec![decl("font-weight", "bold")],
)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `SlotRecipe::new(scope, slots)` | fn | recipe を初期化。`scope` は `Anatomy::new(scope)` と同じ値を渡す契約 |
| `base` | fn | 指定 slot の基本宣言を登録 |
| `variant` | fn | 指定 variant 値・slot の宣言を登録 |
| `default_variant` | fn | 既定 variant を登録 |
| `compound_variant` | fn | 複数条件（axis/value）を満たす場合のみ適用される宣言を登録 |
| `css` | fn | 静的 CSS を出力 |
| `variant_class` / `variant_classes` | fn | variant 値からクラス名を生成 |

## セレクタ・クラス命名規則

| 種別 | セレクタ | 詳細度 |
| --- | --- | --- |
| base | `[data-scope="<scope>"][data-part="<slot>"]` | 0,2,0 |
| variant | `[data-scope="<scope>"][data-part="<slot>"].fd-<scope>--<axis>-<value>` | 0,3,0 |
| compound variant | `[data-scope="<scope>"][data-part="<slot>"].fd-<scope>--<a1>-<v1>.fd-<scope>--<a2>-<v2>...` | 条件2個以上で 0,4,0（条件1個は CSS カスケード後勝ちで保証） |

クラス名形式は `fd-{scope}--{axis}-{value}`。

## Notes

- マクロ DSL は採用しない（REQ-5）
- 同一 slot・同一 axis/value への複数登録は「後に登録された規則が後に出力」される
- `compound_variant` の `conditions` が空、同一 axis 重複、または未登録の axis/value を含む場合は除外される
- 出力順序は固定: base → variants → compound variants
- 決定性のため `Vec` のみ使用し `HashMap`/`HashSet` は非採用。byte 一致検証は `recipe_determinism.rs` で固定
- fail-closed 検証: 識別子は `[a-z][a-z0-9-]*` に一致しない場合スキップ。`</style>` 突破防止のため値に `<` や制御文字を拒否する

## Related

- [fandhe-frontend-pre-styled-ui API](./pre-styled-ui-api.md)
