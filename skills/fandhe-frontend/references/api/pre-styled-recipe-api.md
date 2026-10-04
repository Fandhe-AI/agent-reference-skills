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

pub enum Size { Xs, Sm, Md, Lg, Xl }                                  // Xs / Xl はイシュー #1678 で追加（Default 非実装）
pub enum Shape { Pill, Circle }                                       // axis "shape"（イシュー #3117）。Default 非実装
pub enum ColorPalette { Accent, Info, Success, Warning, Danger, Neutral } // Neutral はイシュー #1678 で追加。Default は Accent
pub enum Breakpoint { Sm, Md, Lg, Xl }                                // @media (min-width) 640 / 768 / 1024 / 1280 px
pub enum ContainerBreakpoint { Sm, Md, Lg, Xl }                       // @container 用
pub fn palette_declarations(p: ColorPalette) -> Vec<Declaration>;
pub fn palette_scale_declarations(p: ColorPalette) -> Vec<Declaration>;

pub struct SlotRecipe { /* ... */ }
impl SlotRecipe {
    pub const fn new(scope: &'static str, slots: &'static [&'static str]) -> Self;
    pub fn base(self, slot: &'static str, declarations: Vec<Declaration>) -> Self;
    pub fn variant<V: VariantValue>(self, v: V, slot: &'static str, declarations: Vec<Declaration>) -> Self;
    pub fn default_variant<V: VariantValue>(self, v: V) -> Self;
    pub fn compound_variant(self, conditions: Vec<VariantCondition>, slot: &'static str, declarations: Vec<Declaration>) -> Self;
    // 0.241.0 のソースで確認（以下はいずれも builder、self を消費して Self を返す）
    pub fn size_variants(self, slot: &'static str, sizes: &[(Size, Vec<Declaration>)]) -> Self;
    pub fn state(self, slot: &'static str, condition: StateCondition, declarations: Vec<Declaration>) -> Self;
    pub fn pseudo_element(self, slot: &'static str, pseudo: PseudoElement, declarations: Vec<Declaration>) -> Self;
    pub fn starting_style(self, slot: &'static str, declarations: Vec<Declaration>) -> Self;
    pub fn breakpoint(self, slot: &'static str, bp: Breakpoint, declarations: Vec<Declaration>) -> Self;
    pub fn container_slot(self, slot: &'static str) -> Self;
    pub fn container(self, slot: &'static str, cb: ContainerBreakpoint, declarations: Vec<Declaration>) -> Self;
    pub fn container_variant<V: VariantValue>(self, v: V, slot: &'static str, cb: ContainerBreakpoint, declarations: Vec<Declaration>) -> Self;
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
| `size_variants(slot, sizes)` | fn | `(Size, Vec<Declaration>)` の列をまとめて `variant` 登録するショートカット |
| `state(slot, condition, declarations)` | fn | `StateCondition` 付きの宣言を登録。`StateCondition` は `Attr(name)` / `AttrEq(name, value)` / `FocusVisible` / `FocusWithin` / `NthChildEven` / `LastChild` / `AttrFirstChild` / `AttrLastChild` / `AttrEqAll` / `AttrAll` / `Hover` / `HoverExcept` / `HoverExceptAttr` / `HoverExceptAttrEq`。生のセレクタ文字列を受け取る経路は無く、`name` / `value` は `is_valid_identifier` で検証される |
| `pseudo_element(slot, pseudo, declarations)` | fn | `PseudoElement`（`Before` / `After`）の宣言を登録 |
| `starting_style(slot, declarations)` | fn | `@starting-style` の宣言を登録 |
| `breakpoint(slot, bp, declarations)` | fn | `@media (min-width: ...)` ブロックの宣言を登録（mobile-first、小さい段から出力） |
| `container_slot` / `container` / `container_variant` | fn | `@container` 用の slot 指定と `ContainerBreakpoint` 条件付き宣言の登録（イシュー #2199） |

## セレクタ・クラス命名規則

| 種別 | セレクタ | 詳細度 |
| --- | --- | --- |
| base | `[data-scope="<scope>"][data-part="<slot>"]` | 0,2,0 |
| variant | `[data-scope="<scope>"][data-part="<slot>"].fd-<scope>--<axis>-<value>` | 0,3,0 |
| compound variant | `[data-scope="<scope>"][data-part="<slot>"].fd-<scope>--<a1>-<v1>.fd-<scope>--<a2>-<v2>...` | 条件2個以上で 0,4,0（条件1個は CSS カスケード後勝ちで保証） |

クラス名形式は `fd-{scope}--{axis}-{value}`。

## Notes

- 本ページのシグネチャは `fandhe-frontend-pre-styled-ui` 0.241.0 の `recipe.rs` / `css.rs` ソースで突合済み。公式設計書の凍結 API（`new` / `base` / `variant` / `default_variant` / `compound_variant` / `css` / `variant_class(es)`）はそのまま維持され、上記の builder 群（`state` / `pseudo_element` / `breakpoint` / `container*` 等）が追加されている。さらにモーション・スクロール連動系の builder（`stagger_delay` / `content_height_transition` / `presence_transition` / `scroll_reveal` / `parallax` / `sticky_progress` など）と、`MotionDuration` / `FocusRingColor` / `FocusRingOffset` / `ParallaxSpeed` などの補助 enum、`focus_ring_declarations` / `disabled_declarations` / `hover_surface_declarations` / `transition_declarations` の宣言ヘルパも recipe.rs に存在するが、本ページでは個別に展開しない
- マクロ DSL は採用しない（REQ-5）
- 同一 slot・同一 axis/value への複数登録は「後に登録された規則が後に出力」される
- `compound_variant` の `conditions` が空、同一 axis 重複、または未登録の axis/value を含む場合は除外される
- 出力順序は固定: base → variants → compound variants
- 決定性のため `Vec` のみ使用し `HashMap`/`HashSet` は非採用。byte 一致検証は `recipe_determinism.rs` で固定
- fail-closed 検証: 識別子は `[a-z][a-z0-9-]*` に一致しない場合スキップ。`</style>` 突破防止のため値に `<` や制御文字を拒否する

## Related

- [fandhe-frontend-pre-styled-ui API](./pre-styled-ui-api.md)
